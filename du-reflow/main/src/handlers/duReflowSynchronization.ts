import  { Handler, APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {GraphQLClient} from "graphql-request";
import { Connection, createConnection } from "mysql2";
import { Sdk , getSdk} from "../../graphql/generated";
import {init} from "./init";
import {transfer} from "./transfer"

type ProxyHandler = Handler<APIGatewayProxyEventV2, APIGatewayProxyResultV2>

export const duReflowSynchronizationHandler : ProxyHandler = async (event, context) => {
  // const name = "" // event.queryStringParameters?.name || "world";
  const client = new GraphQLClient("http://13.37.236.248/api/graphql");
  const sdk: Sdk = getSdk(client);
  const connection: Connection = createConnection(
    {
    host: 'localhost',
    user: 'root',
    database: 'test'} ) //default param 


  const resultInit = await init(connection, sdk);
  if(typeof resultInit === "string") return resultInit;
  const resultTransfer = await transfer(connection, sdk, resultInit);
  const name = ""
  return {
    "statusCode": 201,
    "body": JSON.stringify({
      message: `Hello testt tsqsdsqaaa ${name}`
    })
  };
};
