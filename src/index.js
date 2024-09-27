import { createServer } from "http";
import WebService from "./WebApp/index.js";
import config from "./config.js"

async function main() {
  const webService = new WebService(config.web).getApp()
  createServer(webService).listen(config.web.port, () => console.log("server running"))
}

main()
