import { Connection } from "mysql2";
import { CreateResourceSpecificationMutationVariables, Sdk } from "../../graphql/generated";
import { getMaterial, getMaterialTypeList, Material, updateMaterialGraphQLId } from "../sqlFunction/materialsFn";
import { BindMapNumber } from "./transferStockListFromDBToEconomicEventsGraphQL";
import { getAllCategories, transferEnumListFromDBToCategoriesGraphQL } from "./categoryFn";

/* 
Creates a RessourceSpecification in GraphQL.
Returns the Id of the RessourceSpecification created.
**/
const createResourceSpecification = async (sdk: Sdk, paramRs:CreateResourceSpecificationMutationVariables): Promise<string | undefined> => {
    const res = (await sdk.createResourceSpecification(paramRs));
    const idRes = res.createResourceSpecification?.resourceSpecification?.id;
    return idRes;
}
  
  /* 
  Gets all materials from DB and create ResourceSpecifications and Categories in GraphQL.
  Returns both a dictionary of material_id to ResourceSpecificationsId and a list of material_id to their errors (if any)
  **/
export const transferMaterialListFromDBToResourcesSpecifictionGraphQL = async (
  sdk: Sdk, 
  connection: Connection,
  material_typeId: string
  ): Promise<{ 
    bindMapMaterialsIdAndResourcesSpecificationId:BindMapNumber, 
    listMaterialNotCreated: string[]
  }> =>{

    const materialTypeList: string[] = await getMaterialTypeList(connection);
    await transferEnumListFromDBToCategoriesGraphQL(sdk, materialTypeList, material_typeId);

    const materialList: Material[] = await getMaterial(connection);
  
    const bindMapMaterialsIdAndResourcesSpecificationId: BindMapNumber = {};
    
    const bindMapNameAndIdCategoriesGraphQL = await getAllCategories(sdk);
  
    const listMaterialNotCreated: string[] = [];
    
    for(const material of materialList){
      if(material.name == undefined){
        listMaterialNotCreated.push("Error : material (id : " + material.material_id + ") not created because material's name is missing.");
        continue;
      }
  
      const paramRS: CreateResourceSpecificationMutationVariables = {name:material.name};
      
      if(material.material_type && bindMapNameAndIdCategoriesGraphQL[material.material_type]){
        bindMapNameAndIdCategoriesGraphQL[material.material_type] 
        paramRS.category = bindMapNameAndIdCategoriesGraphQL[material.material_type];
      }
      
      const resourceSpecId = await createResourceSpecification(sdk, paramRS);
  
      if (typeof resourceSpecId === 'string') {
        bindMapMaterialsIdAndResourcesSpecificationId[material.material_id] = resourceSpecId;
        await updateMaterialGraphQLId(connection, material.material_id, resourceSpecId);
      }
      else listMaterialNotCreated.push("Error : material (id : " + material.material_id + ") not created because id material created not found."); 
    }
  return {bindMapMaterialsIdAndResourcesSpecificationId,listMaterialNotCreated};
}