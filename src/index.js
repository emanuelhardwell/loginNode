/* npm run dev    ---> para correr el proyecto,
    anteriormente ya se configuro el archivo package.json
*/

const express = require("express");

const app = express();

// setting
app.set("port", process.env.PORT || 3000);

//Start of Server
app.listen(app.get("port"), () =>
  console.log("Servidor iniciado ...", app.get("port"))
);
