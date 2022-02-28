import { Sdk } from "../../graphql/generated";
import { BindMapString } from "./transferStockListFromDBToEconomicEventsGraphQL";



export const transferEnumListFromDBToCategoriesGraphQL = async (sdk: Sdk, enumList: string[], parentCategory: string): Promise<void> => {

    const categoryList = await getAllCategories(sdk);
  
    for( const enumItem of enumList) {
      if(typeof categoryList[enumItem] === "string") continue;
      await sdk.createCategory({name: enumItem, parentCategory });
    }   

}

export const getAllCategories = async (sdk: Sdk): Promise<BindMapString> => {
    const categoriesGraphQL = await sdk.getCategories();
    
    const bindMapNameAndIdCategoriesGraphQL: BindMapString = {};
  
    for(const categories of categoriesGraphQL.categories.edges){
      if(typeof categories.id === 'string' && typeof categories.name === 'string') bindMapNameAndIdCategoriesGraphQL[categories.name] = categories.id ;
    }
    return bindMapNameAndIdCategoriesGraphQL;
}