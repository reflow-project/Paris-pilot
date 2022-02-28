import { CreateEconomicEventMutationVariables, getSdk } from "../../graphql/generated";
import { GraphQLClient } from "graphql-request";
import { getStocks, Stock } from "../sqlFunction/stocksFn";
import { Connection } from "mysql2";
import { getWarehouse } from "../sqlFunction/warehouseFn";
import { createOrganizationAndST } from "./createOrganizationAndST";
import { Warehouse } from "aws-sdk/clients/quicksight";


const client = new GraphQLClient("http://13.37.236.248/api/graphql");
const sdk = getSdk(client);

const createOneEconomicEvent = async (stock: Stock, unit:string,connection: Connection) => {
  const paramEcoEvent: CreateEconomicEventMutationVariables = {agent: stock.added_by, unit};
  sdk.createEconomicEvent(paramEcoEvent);
};

export const createEconomicEvents = async (connection: Connection) => {
  const stock: Stock[] = await getStocks(connection);
  const warehouse: Warehouse[] = await getWarehouse(connection);

  warehouse.forEach((value) => {
    createOrganizationAndST()
  })
  
  const idUnit = (await sdk.createUnit()).createUnit?.unit?.id;
  if(idUnit){
    stock.forEach((value) => {
      createOneEconomicEvent(value, idUnit, connection);
    });
  }
};

