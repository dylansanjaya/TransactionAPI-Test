import app from "./app.js";
import { env } from "./config/env.js";
import serverless from "serverless-http";

export const handler = serverless(app);
export default app;

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});