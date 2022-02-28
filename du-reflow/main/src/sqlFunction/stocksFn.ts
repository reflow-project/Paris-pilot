import { Connection, ResultSetHeader, RowDataPacket } from "mysql2";
import { Material } from "./materialsFn";
type AutoAcq = "manuel" | "semi auto" | "auto";
export type Condition = "perfect" | "verygood" | "good" | "bad" | "verybad";
export type Shape = "rectangle" | "circular" | "polygon";
type Float = number;
type Int = number;

export interface Stock {
  stock_id: Int;
  added_by?: string /*length 30*/;
  quantity?: Int;
  auto_acq?: AutoAcq;
  x_size?: Float;
  y_size?: Float;
  z_size?: Float;
  x_tolerance?: Float;
  y_tolerance?: Float;
  z_tolerance?: Float;
  warehouse_id?: Int;
  material_id?: Int;
  material?: Material;
  cond?: Condition;
  shape?: Shape;
  comment?: string;
  image_filename?: string;
}

export interface StockIdAndGraphQLId {
  stock_id: number;
  graphql_id?: string;
}

export function getStocks(connection: Connection): Promise<Stock[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT
        stock_id,
        added_by,
        quantity,
        auto_acq,
        x_size,
        y_size,
        z_size,
        x_tolerance,
        y_tolerance,
        z_tolerance,
        warehouse_id,
        material_id,
        materials.material_type,
        materials.name,
        materials.description,
        cond,
        shape,
        comment,
        image_filename
      FROM stocks
      JOIN materials ON stocks.material_id = materials.material_id
      WHERE stocks.last_transfer IS NULL OR stocks.last_transfer < stocks.updated_at
      `,
      function (err, results, fields) {
        if (err) {
          reject(err);
          return;
        }
        const finalRes: Stock[] = [];
        if (Array.isArray(results)) {
          for (const r of results) {
            if (!Array.isArray(r) && "RowDataPacket" === r.constructor.name) {
              const w = {
                stock_id: r["stock_id"],
                added_by: r["added_by"],
                quantity: r["quantity"],
                auto_acq: r["auto_acq"],
                x_size: r["x_size"],
                y_size: r["y_size"],
                z_size: r["z_size"],
                x_tolerance: r["x_tolerance"],
                y_tolerance: r["y_tolerance"],
                z_tolerance: r["z_tolerance"],
                warehouse_id: r["warehouse_id"],
                material_id: r["material_id"],
                material: {
                  material_id: r["material_id"],
                  material_type: r["material_type"],
                  name: r["name"],
                  description: r["description"],
                },
                cond: r["cond"],
                shape: r["shape"],
                comment: r["comment"],
                image_filename: r["image_filename"],
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

export function getBindListStocksIdAndEconomicEventsId(connection: Connection): Promise<StockIdAndGraphQLId[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT stock_id, graphql_id
      FROM stocks
      `,
      function (err, results, fields) {
        if (err) {
          reject(err);
          return;
        }
        const finalRes: StockIdAndGraphQLId[] = [];
        if (Array.isArray(results)) {
          for (const r of results) {
            if (!Array.isArray(r) && "RowDataPacket" === r.constructor.name) {
              const w = {
                stock_id: r["stock_id"],
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

export function getShapeList(connection: Connection): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT DISTINCT shape
      FROM stocks
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
              finalRes.push(r["shape"]);
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

export function getCondList(connection: Connection): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      SELECT DISTINCT cond
      FROM stocks
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
              finalRes.push(r["cond"]);
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

export function updateStockGraphQLId(connection: Connection, stock_id: number, graphql_id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // simple query
    connection.query(
      /*sql*/ `
      UPDATE stocks 
      SET last_transfer = CURRENT_TIMESTAMP, graphql_id = ` + graphql_id + `
      WHERE stock_id = ` + stock_id + `
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
