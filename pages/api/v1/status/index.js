import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;
  const databaseVersion = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersion.rows[0].server_version;
  const cocnetionResults = await database.query("SHOW max_connections;");
  const maxConections = cocnetionResults.rows[0].max_connections;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue = parseInt(
    databaseOpenedConnectionsResult.rows[0].count,
  );
  response.status(200).json({
    update_At: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(maxConections),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
