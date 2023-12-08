import { ConfigService } from "@nestjs/config";
import Web3 from "web3";
import * as dotenv from 'dotenv';
import { web3ConnectionOptions } from "./constant";

dotenv.config()

const configService = new ConfigService();

const HTTP_PROVIDER = new Web3.providers.HttpProvider(
  configService.get("HTTP_PROVIDER")
);

// const WSS_PROVIDER = new WebsocketProvider(//new Web3.providers.WebsocketProvider(
//     configService.get("WSS_PROVIDER"),
//     web3ConnectionOptions
//   );

const webScoketProvider = configService.get("WSS_PROVIDER");

const web3_wss = new Web3.providers.WebsocketProvider(
      webScoketProvider,
      web3ConnectionOptions
    );
  

const web3_http = new Web3(HTTP_PROVIDER);
// const web3_wss = new Web3(configService.get("WSS_PROVIDER"))

export { web3_http, web3_wss };
