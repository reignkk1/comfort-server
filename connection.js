import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "svc.sel4.cloudtype.app",
  port: "30000",
  user: "root",
  password: "root",
  database: "comfort",
});
