import { Connection } from "mysql2";
import { Sdk } from "../../graphql/generated";
import { BindMapNumber, transferStockListFromDBToEconomicEventsGraphQL } from "./transferStockListFromDBToEconomicEventsGraphQL";
import { transferWarehouseListFromDBToOrganizationsGraphQL } from "./transferWarehouseListFromDBToOrganizationsGraphQL";
import { transferMaterialListFromDBToResourcesSpecifictionGraphQL } from "./transferMaterialListFromDBToResourcesSpecifictionGraphQL";
import { ResultInit } from "./init";

export interface ResultTransfer {
  errorList: string[],  
  bindMapWareHousesIdAndOrganizationId: BindMapNumber,
  bindMapMaterialsIdAndResourcesSpecificationId: BindMapNumber,
  bindMapStocksIdAndEconomicEventsId: BindMapNumber
}

export const transfer = async (connection: Connection, sdk:Sdk, resultInit: ResultInit): Promise<ResultTransfer> => {

    const resultTransferWarehouseListFromDBToGraphQL = await transferWarehouseListFromDBToOrganizationsGraphQL(
      sdk, 
      connection, 
      resultInit.organizationWaoId, 
      resultInit.agentRelationShipRoleCreatedBy
    );

    const resultTransferMaterialListFromDBToGraphQL = await transferMaterialListFromDBToResourcesSpecifictionGraphQL(
      sdk, 
      connection, 
      resultInit.material_typeId
    );

    const resultTransferStockListFromDBToGraphQL = await transferStockListFromDBToEconomicEventsGraphQL(
      sdk, 
      connection, 
      resultInit.unitQuantityId,
      resultInit.organizationWaoId,
      resultInit.agentRelationShipRoleCreatedBy,
      resultInit.shapeId,
      resultInit.condId
    );
    
    const errorList: string[] = 
      resultTransferWarehouseListFromDBToGraphQL.listWarhouseNotCreated.concat(
      resultTransferMaterialListFromDBToGraphQL.listMaterialNotCreated).concat(
      resultTransferStockListFromDBToGraphQL.listStockNotCreated);

    return {
      errorList, 
      bindMapWareHousesIdAndOrganizationId: resultTransferWarehouseListFromDBToGraphQL.bindMapWareHousesIdAndOrganizationId, 
      bindMapMaterialsIdAndResourcesSpecificationId: resultTransferMaterialListFromDBToGraphQL.bindMapMaterialsIdAndResourcesSpecificationId, 
      bindMapStocksIdAndEconomicEventsId: resultTransferStockListFromDBToGraphQL.bindMapStocksIdAndEconomicEventsId
    };
    
  };