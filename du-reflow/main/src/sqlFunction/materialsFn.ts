import { Connection, ResultSetHeader, RowDataPacket } from "mysql2";

export type Material_Type = "metal" | "wood" | "plastic";

export interface Material {
  material_id: number;
  material_type?: Material_Type;
  name?: string;
  description?: string;
}

export interface MaterialIdRessourceSpecificationId {
  material_id: number;
  graphql_id?: string;
}

export function getMaterial(connection: Connection): Promise<Material[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT material_id, material_type, name, description
      FROM materials
      WHERE materials.last_transfer IS NULL OR materials.last_transfer < materials.updated_at  
      `,
      function (err, results, fields) {
        if (err) {
          reject(err);
          return;
        }
        const finalRes: Material[] = [];
        if (Array.isArray(results)) {
          for (const r of results) {
            if (!Array.isArray(r) && "RowDataPacket" === r.constructor.name) {
              const w = {
                material_id: r["material_id"],
                material_type: r["material_type"],
                name: r["name"],
                description: r["description"],
              };
              finalRes.push(w);
            } else {
              console.warn(`Unexpected result: ${JSON.stringify(r)}`);
            }
          }
        }

        resolve(finalRes);
      }
    );
  });
}

export function getBindListMaterialsIdAndResourcesSpecificationId(connection: Connection): Promise<MaterialIdRessourceSpecificationId[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT material_id, graphql_id
      FROM materials
      `,
      function (err, results, fields) {
        if (err) {
          reject(err);
          return;
        }
        const finalRes: MaterialIdRessourceSpecificationId[] = [];
        if (Array.isArray(results)) {
          for (const r of results) {
            if (!Array.isArray(r) && "RowDataPacket" === r.constructor.name) {
              const w = {
                material_id: r["material_id"],
                graphql_id: r["graphql_id"],
              };
              finalRes.push(w);
            } else {
              console.warn(`Unexpected result: ${JSON.stringify(r)}`);
            }
          }
        }

        resolve(finalRes);
      }
    );
  });
}

export function getMaterialTypeList(connection: Connection): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT DISTINCT material_type
      FROM materials
      `,
      function (err, results, fields) {
        if (err) {
          reject(err);
          return;
        }
        const finalRes: string[] = [];
        if (Array.isArray(results)) {
          for (const r of results) {
            if (!Array.isArray(r) && "RowDataPacket" === r.constructor.name) {
              finalRes.push(r["material_type"]);
            } else {
              console.warn(`Unexpected result: ${JSON.stringify(r)}`);
            }
          }
        }
        resolve(finalRes);
      }
    );
  });
}

export function updateMaterialGraphQLId(connection: Connection, material_id: number, graphql_id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      UPDATE materials 
      SET last_transfer = CURRENT_TIMESTAMP, graphql_id = ` + graphql_id + `
      WHERE material_id = ` + material_id + `
      `,
      function(err, results, fields) {
        if (err) {
          reject(err)
          return
        }
        resolve({fields})
      }
    );
  });
}