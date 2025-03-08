import app from "./app";
import { DB_URI, NODE_ENV, PORT } from "./config/env";
import migrate from "./config/migrations";
import database from "./database";

database.connect()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    // run migrations asynchonously
    migrate();
  });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\nExpress server listening on port ${PORT}, in ${NODE_ENV} mode`);
  // eslint-disable-next-line no-console
  console.log(`Server: http://localhost:${PORT}/api/`);
  // eslint-disable-next-line no-console
  console.log(`Database: ${DB_URI}\n`);
});

export default app;
