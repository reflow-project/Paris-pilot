import { Connection, ResultSetHeader, RowDataPacket } from "mysql2";

export interface Warehouse {
  warehouse_id: string;
  name: string;
  zip_code: string;
  city: string;
  country: string;
  phone_nb: string;
  email: string;
}

export function getWarehouse(connection: Connection): Promise<Warehouse[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT warehouse_id, name, zip_code, city, country,
      phone_nb, email
      FROM warehouses
      -- WHERE warehouses.
      `,
      function (err, results, fields) {
        if (err) {
          reject(err);
          return;
        }
        const finalRes: Warehouse[] = [];
        if (Array.isArray(results)) {
          for (const r of results) {
            if (!Array.isArray(r) && "RowDataPacket" == r.constructor.name) {
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
