import { createConnection, connections } from "mongoose";
import {
  BlogSchema,
  DesignSchema,
  PortfolioSchema,
  ProjectSchema,
  TagSchema,
  UserSchema,
} from "./Models";

const { MONGO_URI } = process.env;

export function connectionFactory() {
  try {
    const existingConn = connections[1];
    let conn;
    if (existingConn?.readyState) {
      conn = existingConn;
    } else {
      conn = createConnection(MONGO_URI, {
        maxPoolSize: 25,
        connectTimeoutMS: 5000,
      });
      conn.model("tag", TagSchema);
      conn.model("blog", BlogSchema);
      conn.model("project", ProjectSchema);
      conn.model("design", DesignSchema);
      conn.model("user", UserSchema);
      conn.model("portfolio", PortfolioSchema);
    }
    console.log("Connected to DB");
    return conn;
  } catch (error) {
    console.log("DB connection failed", error);
    process.exit(1);
  }
}
