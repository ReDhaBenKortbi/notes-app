import { createServer } from "http";
import { app } from "./app";

const server = createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("Server is running on %d", port);
});
