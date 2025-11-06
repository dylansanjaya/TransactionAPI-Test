import app from "./src/app.js";
import serverless from "serverless-http";
import { env } from "./src/config/env.js";

const handler = serverless(app);
export default handler;

// Optional local dev
if (process.env.NODE_ENV !== "production") {
  app.listen(env.PORT || 3000, () => {
    console.log(`Server running at http://localhost:${env.PORT || 3000}`);
  });
}
