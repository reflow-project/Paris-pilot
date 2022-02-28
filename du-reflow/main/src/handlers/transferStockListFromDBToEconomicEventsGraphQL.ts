import { CreateEconomicEventProduceMutationVariables, CreateEconomicEventTransferMutationVariables, Sdk } from "../../graphql/generated";
import { getCondList, getShapeList, getStocks, Stock, updateStockGraphQLId } from "../sqlFunction/stocksFn";
import { Connection } from "mysql2";
import { createOrganizationAndST } from "./transferWarehouseListFromDBToOrganizationsGraphQL";
import { getAllCategories, transferEnumListFromDBToCategoriesGraphQL } from "./categoryFn";
import { getBindListWarehousesIdAndOrganizationsId } from "../sqlFunction/warehouseFn";
import { getBindListMaterialsIdAndResourcesSpecificationId } from "../sqlFunction/materialsFn";

export type BindMapString = {[ x: string]: string; };
export type BindMapNumber = {[ x: number]: string; };
export interface ParamProduceAndTransferEcoEvent {
  organizationId: string
  added_byId: string
  unitId: string
  categories: string[]
  resourceSpec?: string
  quantity?: number
}


const getAllOrganizations = async (sdk: Sdk): Promise<BindMapString> => {
  
  const organizationsGraphQL = await sdk.getOrganizations();
  
  if(!organizationsGraphQL.organizations) return {};

  const bindNameAndIdOrganizationsGraphQL: BindMapString = {};
  
  for(const organizations of organizationsGraphQL.organizations){
    if(typeof organizations.id === 'string' && typeof organizations.name === 'string') bindNameAndIdOrganizationsGraphQL[organizations.name] = organizations.id;
  }
  return bindNameAndIdOrganizationsGraphQL;
}

const getBindMapWareHousesIdAndOrganizationsId = async (connection: Connection): Promise<BindMapNumber> => {
  const bindList = await getBindListWarehousesIdAndOrganizationsId(connection);
  const bindMap: BindMapString = {};
  for(const bind of bindList){
    if(typeof bind.graphql_id === "string"){
      bindMap[bind.warehouse_id] = bind.graphql_id;
    }
  }

  return bindMap;

}

const getBindMapMaterialsIdAndResourcesSpecificationId = async (connection: Connection): Promise<BindMapNumber> => {
  const bindList = await getBindListMaterialsIdAndResourcesSpecificationId(connection);
  const bindMap: BindMapString = {};
  
  for(const bind of bindList){
    if(typeof bind.graphql_id === "string"){
      bindMap[bind.material_id] = bind.graphql_id;
    }
  }

  return bindMap;

}

/* Not used yet, will be useful later 

const getBindMapStocksIdAndEconomicEventsId = async (connection: Connection): Promise<BindMapString> => {
  const bindList = await getBindListStocksIdAndEconomicEventsId(connection);
  const bindMap: BindMapString = {};
  for(const bind of bindList){
    if(typeof bind.graphql_id === "string"){
      bindMap[bind.stock_id] = bind.graphql_id;
    }
  }
  return bindMap;
}
 */

const getOrCreateOrganizationFromAddedBy = async (
  sdk: Sdk, 
  connection: Connection,
  added_by: string, 
  stock_id: number, 
  bindMap: BindMapString, 
  organizationWao: string, 
  agentRelationshipRoleCreatedBy: string
  ): Promise<{createdId: string} | string> => {

  if(typeof bindMap[added_by] === 'string') return {createdId: bindMap[added_by]};

  const organization = await createOrganizationAndST(sdk, connection, {name: added_by}, added_by, organizationWao, agentRelationshipRoleCreatedBy);

  if(typeof organization === "string")return  "Error : stock (id : "+ stock_id +") not created because " + organization;    
  else  return {createdId: organization.createdId};
  
}

const getParamEconomicEvent = async (
  sdk: Sdk, 
  connection: Connection,
  stock: Stock, 
  unitId: string,
  organizationWao: string, 
  agentRelationshipRoleCreatedBy: string,
  bindMapWareHousesIdAndOrganizationsId: BindMapNumber, 
  bindMapMaterialsIdAndResourcesSpecificationId: BindMapNumber,
): Promise<ParamProduceAndTransferEcoEvent | string> => {

  if(stock.added_by == undefined) return "Error : stock (id : " + stock.stock_id + ") not created because stock's added_by is missing." ;

  if(stock.warehouse_id == undefined) return "Error : stock (id : " + stock.stock_id + ") not created because stock's warehouse_id is missing.";

  if(bindMapWareHousesIdAndOrganizationsId[stock.warehouse_id] == undefined) return "Error : stock (id : " + stock.stock_id + ") not created, because warehouse (id : " + stock.warehouse_id + ") doesn't exist in Organizations in GraphQL";

  const bindNameAndIdOrganizationsGraphQL = await getAllOrganizations(sdk);

  const returnCreationOrganizationsFromAddedBy = await getOrCreateOrganizationFromAddedBy(
    sdk, connection, stock.added_by, stock.stock_id, bindNameAndIdOrganizationsGraphQL, organizationWao, agentRelationshipRoleCreatedBy
  ); 
  
  if(typeof returnCreationOrganizationsFromAddedBy === "string") return returnCreationOrganizationsFromAddedBy;

  const result: ParamProduceAndTransferEcoEvent = {
    added_byId: returnCreationOrganizationsFromAddedBy.createdId, 
    organizationId: bindMapWareHousesIdAndOrganizationsId[stock.warehouse_id], 
    unitId,
    categories: []
  };

  if(typeof stock.material_id === 'number' && typeof bindMapMaterialsIdAndResourcesSpecificationId[stock.material_id] === 'string'){
    result.resourceSpec = bindMapMaterialsIdAndResourcesSpecificationId[stock.material_id];
  }

  if(typeof stock.quantity === 'number') result.quantity = stock.quantity;

  const bindMapNameAndIdCategoriesGraphQL = await getAllCategories(sdk);

  const categoryList: string[] = [];

  if(stock.shape && bindMapNameAndIdCategoriesGraphQL[stock.shape]){
    categoryList.push(bindMapNameAndIdCategoriesGraphQL[stock.shape])
  }

  if(stock.cond && bindMapNameAndIdCategoriesGraphQL[stock.cond]){
    categoryList.push(bindMapNameAndIdCategoriesGraphQL[stock.cond])
  }
  
  result.categories = categoryList;

  return result;
}

const transferOneStockFromDBToEconomicEventGraphQL = async (
  sdk: Sdk, 
  connection: Connection,
  stock: Stock, 
  param: ParamProduceAndTransferEcoEvent
  ): Promise<{created_id: string} | string> => {

  const paramProduce: CreateEconomicEventProduceMutationVariables = {
    agent: param.added_byId,
    unit: param.unitId,
    quantity: param.quantity,
    resourceSpec: param.resourceSpec,
    categories: param.categories
  }
  const ecoEventProduce = await sdk.createEconomicEventProduce(paramProduce);
  const idEcoResource = ecoEventProduce.createEconomicEvent?.economicResource?.id;

  if (idEcoResource === undefined) return "Error : stock (id : " + stock.stock_id + ") not created because id economic's event (action: produce) not found." ;
  await updateStockGraphQLId(connection, stock.stock_id, idEcoResource);

  const paramTransfer: CreateEconomicEventTransferMutationVariables = {
    provider: param.added_byId, 
    receiver: param.organizationId,
    unit: param.unitId,
    quantity: param.quantity,
    resource: idEcoResource
  }

  await sdk.createEconomicEventTransfer(paramTransfer);

  return {
      created_id: idEcoResource 
  }
}

export const transferStockListFromDBToEconomicEventsGraphQL = async (
  sdk:Sdk ,
  connection: Connection, 
  unitId: string,
  organizationWao: string, 
  agentRelationshipRoleCreatedBy: string,
  shapeId: string,
  condId: string
  ): Promise<{
  bindMapStocksIdAndEconomicEventsId: BindMapNumber,
  listStockNotCreated: string[]
}> => {

  const shapeList: string[] = await getShapeList(connection);
  await transferEnumListFromDBToCategoriesGraphQL(sdk, shapeList, shapeId);
  const condList: string[] = await getCondList(connection);
  await transferEnumListFromDBToCategoriesGraphQL(sdk, condList, condId);

  const stockList: Stock[] = await getStocks(connection);

  const bindMapStocksIdAndEconomicEventsId: BindMapNumber = {};
  const listStockNotCreated: string[] = [];

  const bindMapWareHousesIdAndOrganizationsId = await getBindMapWareHousesIdAndOrganizationsId(connection);
  const bindMapMaterialsIdAndResourcesSpecificationId = await getBindMapMaterialsIdAndResourcesSpecificationId(connection);

  for(const stock of stockList) {

    const resultGetParamEconomicEvent = await getParamEconomicEvent(
      sdk, connection, stock, unitId, organizationWao, agentRelationshipRoleCreatedBy, bindMapWareHousesIdAndOrganizationsId, bindMapMaterialsIdAndResourcesSpecificationId
    );

    if (typeof resultGetParamEconomicEvent === "string") {
      listStockNotCreated.push(resultGetParamEconomicEvent)
      continue;
    }
    
    const resultTransfer = await transferOneStockFromDBToEconomicEventGraphQL(sdk, connection, stock, resultGetParamEconomicEvent);

    if(typeof resultTransfer === "string") listStockNotCreated.push(resultTransfer); 
    else bindMapStocksIdAndEconomicEventsId[stock.stock_id] = resultTransfer.created_id;
  }
  
  return {
    bindMapStocksIdAndEconomicEventsId, 
    listStockNotCreated
  };
  
};

