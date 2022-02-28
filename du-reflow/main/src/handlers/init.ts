import { Connection } from "mysql2";
import { Sdk } from "../../graphql/generated";
import {createColumn, getTablesWithoutColumn} from "../sqlFunction/modifSchemaFn";

export interface shapeAndCondAndMaterialTypeIds {
  shapeId: string | undefined | null, 
  condId: string | undefined | null, 
  material_typeId: string | undefined | null
}

export interface ResultInit {
  unitQuantityId: string;
  organizationWaoId: string;
  agentRelationShipRoleCreatedBy: string;
  shapeId: string,
  condId: string,
  material_typeId: string
}

const createColumnsCreatedAtAndUpdatedAtAndGraphQLId = async (connection: Connection) => {
    const tablesWithoutCreatedAt = await getTablesWithoutColumn(connection, "created_at");
    const tablesWithoutUpdatedAt = await getTablesWithoutColumn(connection, "updated_at");
    const tablesWithoutGraphQLId = await getTablesWithoutColumn(connection, "graphql_id");
    const tablesWithoutLastTransfer = await getTablesWithoutColumn(connection, "last_transfer");
    for (const table of tablesWithoutCreatedAt){
      createColumn(connection, table, "created_at" )
    }
    for (const table of tablesWithoutUpdatedAt){
      createColumn(connection, table, "updated_at" )
    }
    for (const table of tablesWithoutGraphQLId){
      createColumn(connection, table, "graphql_id")
    }
    for (const table of tablesWithoutLastTransfer){
      createColumn(connection, table, "last_transfer")
    }
}

const createUnitQuantity = async (sdk: Sdk): Promise<string | undefined> => {
    const resultUnits = await sdk.getUnits();
    const unitList = resultUnits.units || [];
    const label = "quantité";
  
    for(const unit of unitList) {
        if(unit.label == label) return unit.id;
    }
    
    const unit = await sdk.createUnit({label})
    return unit.createUnit?.unit?.id;
}

const createOrganizationWao = async (sdk: Sdk): Promise<string | undefined> => {
  const resultsOrganizations = await sdk.getOrganizations();
  const organizationList = resultsOrganizations.organizations || [];
  const name = "Wao";

  for(const organization of organizationList){
    if(organization.name == name) return organization.id;
  }
  
  const spatialThing = await sdk.createST({name});
  const primaryLocation = spatialThing.createSpatialThing?.spatialThing?.id
  if(primaryLocation) {
    const organization = await sdk.createOrganization({name, primaryLocation});
    return organization.createOrganization?.agent.id;
  }
}

const createAgentRelationshipRoleCreatedBy = async (sdk: Sdk): Promise<string | undefined> => {
  const resultsAgentRelationshipRoles = await sdk.getAgentRelationshipRoles();
  const agentRelationshipRoleList = resultsAgentRelationshipRoles.agentRelationshipRoles || [];
  const roleLabel = "created by";
  
  for(const agentRelationshipRole of agentRelationshipRoleList) {
    if(agentRelationshipRole.roleLabel == roleLabel) return agentRelationshipRole.id;
  }
  
  const agentRelationshipRole = await sdk.createAgentRelationshipRole({roleLabel})
  return agentRelationshipRole.createAgentRelationshipRole?.agentRelationshipRole?.id;
}  

const createShapeAndCondAndMaterialTypeParentCategories = async (sdk: Sdk): Promise<shapeAndCondAndMaterialTypeIds> => {

  const result:shapeAndCondAndMaterialTypeIds = {shapeId: undefined, condId: undefined, material_typeId: undefined};

  const categoryResult = await sdk.getCategories();
  const categoryList = categoryResult.categories.edges;

  for (const category of categoryList){
    if(category.name == "shape") result.shapeId = category.id;
    else if(category.name == "cond") result.condId = category.id;
    else if(category.name == "material type") result.material_typeId = category.id;
  }

  if(result.shapeId === undefined) {
    const shapeCreated = await sdk.createCategory({name: "shape"});
    result.shapeId = shapeCreated.createCategory?.id;
  }

  if(result.condId === undefined) {
    const condCreated = await sdk.createCategory({name: "cond"});
    result.condId = condCreated.createCategory?.id;
  }

  if(result.material_typeId === undefined) {
    const material_typeCreated = await sdk.createCategory({name: "material_type"});
    result.material_typeId = material_typeCreated.createCategory?.id;
  }
  
  return result;
}

export const init = async (connection: Connection, sdk: Sdk): Promise<ResultInit | string > => {
    await createColumnsCreatedAtAndUpdatedAtAndGraphQLId(connection);
    const unitQuantityId = await createUnitQuantity(sdk);
    if(unitQuantityId === undefined) return "Error : unit 'quantité' doesn't exist.";
    const organizationWaoId = await createOrganizationWao(sdk);
    if(organizationWaoId === undefined) return "Error : organization 'Wao' doesn't exist.";
    const agentRelationShipRoleCreatedBy = await createAgentRelationshipRoleCreatedBy(sdk);
    if(agentRelationShipRoleCreatedBy === undefined) return "Error : agentRelationShipRole 'created by' doesn't exist.";
    const shapeAndCondAndMaterialTypeParentCategoryIds = await createShapeAndCondAndMaterialTypeParentCategories(sdk);
    if(!(typeof shapeAndCondAndMaterialTypeParentCategoryIds.condId === "string")) return "Error : category 'cond' doesn't exist.";
    if(!(typeof shapeAndCondAndMaterialTypeParentCategoryIds.shapeId === "string")) return "Error : category 'shape' doesn't exist.";
    if(!(typeof shapeAndCondAndMaterialTypeParentCategoryIds.material_typeId === "string")) return "Error : category 'material type' doesn't exist.";
    return {
      unitQuantityId, 
      organizationWaoId,
      agentRelationShipRoleCreatedBy, 
      shapeId: shapeAndCondAndMaterialTypeParentCategoryIds.shapeId, 
      condId: shapeAndCondAndMaterialTypeParentCategoryIds.condId,
      material_typeId: shapeAndCondAndMaterialTypeParentCategoryIds.material_typeId
    }
}