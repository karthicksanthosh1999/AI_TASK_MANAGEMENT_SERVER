import "dotenv/config";
import { App } from "./app";
import { initialSocket } from "./utils/socket_server";
import { createServer } from "http";

const PORT = Number(process.env.PORT) || 5000;

const application = new App();

const server = createServer(application.app);

initialSocket(server);

application.app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`,
  );
});