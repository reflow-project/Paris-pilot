import {
  CreateStMutationVariables,
  CreateWarehouseMutationVariables,
  getSdk,
} from "../../graphql/generated";
import { GraphQLClient } from "graphql-request";


const client = new GraphQLClient("http://13.37.236.248/api/graphql");
const sdk = getSdk(client);

const createST = async (paramST: CreateStMutationVariables): Promise<string> => {
  const idST = (await sdk.createST(paramST)).createSpatialThing?.spatialThing?.id;
  if(idST) return idST;
  else throw new Error("createST failed : this mutation on SpatialThing doesn't worked") 
}

const createOrganization = async (name: string, primaryLocation:string): Promise<string> => {
  const idOrg = (await sdk.createWarehouse({name, primaryLocation})).createOrganization?.agent.id;
  if(idOrg) return idOrg;
  else throw new Error("createOrganization failed : this mutation on Organization doesn't worked") 
}

export const createOrganizationAndST = async (
  paramST: CreateStMutationVariables,
  nameWareHouse: string
): Promise<string> => {
  const primaryLocation = await createST(paramST);
  if (primaryLocation) {
    const organization = createOrganization(nameWareHouse,primaryLocation);
    return organization;
  }else{
    throw new Error("createOrganizationAndST failed : this mutation on Organization and SpatialThing doesn't worked")
  }
};
