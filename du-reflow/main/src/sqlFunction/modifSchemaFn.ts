import {Connection} from "mysql2";

export type ColumnAlterable = "created_at" | "updated_at" | "graphql_id" | "last_transfer";
export type TableAlterable = "stocks" | "warehouses" | "materials" | "users";

export function getTablesWithoutColumn (connection : Connection, column: ColumnAlterable) : Promise<TableAlterable[]> {
    return new Promise ((resolve, reject) => {
      // simple query
      connection.query(
        /*sql*/`
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE NAME != "users" AND TABLE_NAME NOT IN (
            SELECT TABLE_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE COLUMN_NAME = `+ column +`
        )
        `,
        function(err, results, fields) {
          if (err) {
            reject(err)
            return
          }
          const finalRes: TableAlterable[] = []
          if (Array.isArray(results)) {
            for (const r of results) {
                if (!Array.isArray(r) && "RowDataPacket" === r.constructor.name) {
                  finalRes.push(r['TABLE_NAME'])
                } else {
                  console.warn(`Unexpected result: ${JSON.stringify(r)}`)
                }
            }
          }
          resolve(finalRes)
        }
      );
    })
  }

  export function createColumn (connection : Connection, table_name:TableAlterable, column: ColumnAlterable) : Promise<any> {
    return new Promise ((resolve, reject) => {
      // simple query
      connection.query(
        /*sql*/`
        ALTER TABLE ` + table_name +` 
        ADD COLUMN ` + column + 
        (column=="graphql_id" ? 
        ` VARCHAR(30)` : 
        column=="last_transfer" ? 
        ` DATETIME` :
        ` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP`) + 
        (column=="updated_at" ? ` ON UPDATE CURRENT_TIMESTAMP` : ``),
        function(err, results, fields) {
          if (err) {
            reject(err)
            return
          }
          resolve({fields})
        }
      );
    })
  }