import fastify from "fastify";
import request from "./hooks/request";
import infura from "./modules/infura";
import waifuData from "./modules/waifuData";
import opensea from "./routes/opensea";
import waifus from "./routes/waifus";
import {IWaifusionInstance} from './types/Fastify';
import { debug } from "./util/logger";

const app: IWaifusionInstance = fastify();

// Register plugins
app.register(infura);
app.register(waifuData);

// Register hooks
app.register(request);

// Register plugins
app.register(waifus, { prefix: "/v1/waifus" });
app.register(opensea, { prefix: "/v1/opensea" });

app.listen(process.env.PORT || 8080, "0.0.0.0", (err) => {
  if (err) {
    return console.log(err);
  }

  debug("api", "Running")
});