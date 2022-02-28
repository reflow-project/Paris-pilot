import { Connection, ResultSetHeader, RowDataPacket } from "mysql2";

export interface Warehouse {
  warehouse_id: number;
  name?: string;
  zip_code?: string;
  city?: string;
  country?: string;
  phone_nb?: string;
  email?: string;
}

export interface WarehouseIdAndGraphQLId {
  warehouse_id: number;
  graphql_id?: string;
}

export function getWarehouse(connection: Connection): Promise<Warehouse[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT warehouse_id, name, zip_code, city, country,
      phone_nb, email
      FROM warehouses
      WHERE warehouses.last_transfer IS NULL OR warehouses.last_transfer < warehouses.updated_at
      `,
      function (err, results, fields) {
        if (err) {
          reject(err);
          return;
        }
        const finalRes: Warehouse[] = [];
        if (Array.isArray(results)) {
          for (const r of results) {
            if (!Array.isArray(r) && "RowDataPacket" === r.constructor.name) {
              const w = {
                warehouse_id: r["warehouse_id"],
                name: r["name"],
                zip_code: r["zip_code"],
                city: r["city"],
                country: r["country"],
                phone_nb: r["phone_nb"],
                email: r["email"],
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

export function getBindListWarehousesIdAndOrganizationsId(connection: Connection): Promise<WarehouseIdAndGraphQLId[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT warehouse_id, graphql_id
      FROM warehouses
      `,
      function (err, results, fields) {
        if (err) {
          reject(err);
          return;
        }
        const finalRes: WarehouseIdAndGraphQLId[] = [];
        if (Array.isArray(results)) {
          for (const r of results) {
            if (!Array.isArray(r) && "RowDataPacket" === r.constructor.name) {
              const w = {
                warehouse_id: r["warehouse_id"],
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

export function updateWarehouseGraphQLId(connection: Connection, warehouse_id: number, graphql_id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      UPDATE warehouses 
      SET last_transfer = CURRENT_TIMESTAMP, graphql_id = ` + graphql_id + `
      WHERE warehouse_id = ` + warehouse_id + `
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
