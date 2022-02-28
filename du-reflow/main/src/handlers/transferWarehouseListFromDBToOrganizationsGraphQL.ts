import { Connection } from "mysql2";
import { CreateOrganizationMutationVariables, CreateStMutationVariables, Sdk } from "../../graphql/generated";
import { getWarehouse, updateWarehouseGraphQLId, Warehouse } from "../sqlFunction/warehouseFn";
import { BindMapNumber } from "./transferStockListFromDBToEconomicEventsGraphQL";

const createST = async (sdk: Sdk, paramST: CreateStMutationVariables): Promise<string | undefined> => {
  const sT = (await sdk.createST(paramST));
  const idST = sT.createSpatialThing?.spatialThing?.id;
  return idST;
}

const createOrganization = async (sdk: Sdk, paramOrg:CreateOrganizationMutationVariables): Promise<string | undefined> => {
  const org = (await sdk.createOrganization(paramOrg));
  const idOrg = org.createOrganization?.agent.id;
  return idOrg;
}

export const createOrganizationAndST = async (
  sdk: Sdk,
  connection: Connection,
  paramST: CreateStMutationVariables,
  nameWareHouse: string,
  organizationWao: string,
  agentRelationshipRoleCreatedby: string,
  warehouse_id?: number,
): Promise<{createdId: string} | string> => {

  const primaryLocation = await createST(sdk, paramST);

  if (typeof primaryLocation === 'undefined') return "id primary location created not found.";

  const organizationId = await createOrganization(sdk, {name:nameWareHouse,primaryLocation});

  if(typeof organizationId === 'string') {
    await sdk.createAgentRelationship({object: organizationWao, relationship: agentRelationshipRoleCreatedby, subject: organizationId});
    if(typeof warehouse_id === "number") await updateWarehouseGraphQLId(connection, warehouse_id, organizationId );
    return {createdId:organizationId};
  }
  return "id organization created not found.";
};

/* 
Get all warehouses from DB and create Organizations and SpatialThings in GraphQL.
Returns both a dictionary of warehouse_id to OrganizationId and a list of warehouse_id to their errors (if any)
**/
export const transferWarehouseListFromDBToOrganizationsGraphQL = async (
  sdk: Sdk, 
  connection: Connection, 
  organizationWao: string,
  agentRelationshipRoleCreatedby: string
  ): Promise<{ 
    bindMapWareHousesIdAndOrganizationId:BindMapNumber, 
    listWarhouseNotCreated:string[] 
  }> => {
  const warehouseList: Warehouse[] = await getWarehouse(connection);

  const bindMapWareHousesIdAndOrganizationId: BindMapNumber = {};

  const listWarhouseNotCreated: string[] = [];
  
  for(const warehouse of warehouseList) {
    if(warehouse.name == undefined){
      listWarhouseNotCreated.push("Error : warehouse (id : "+ warehouse.warehouse_id +") not created because warehouse's name is missing.");
      continue;
    } 

    const paramST: CreateStMutationVariables = {mappableAddress: warehouse.city + ", " + warehouse.country, name: warehouse.name}
    const returnCreationOrg = await createOrganizationAndST(sdk, connection, paramST, warehouse.name, organizationWao, agentRelationshipRoleCreatedby, warehouse.warehouse_id);
    if(typeof returnCreationOrg === "string") listWarhouseNotCreated.push("Error : warehouse (id : "+ warehouse.warehouse_id +") not created because " + returnCreationOrg);
    else bindMapWareHousesIdAndOrganizationId[warehouse.warehouse_id] = returnCreationOrg.createdId;
  }
  return {bindMapWareHousesIdAndOrganizationId,listWarhouseNotCreated};
}
