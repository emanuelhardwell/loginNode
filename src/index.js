/* npm run dev    ---> para correr el proyecto,
    anteriormente ya se configuro el archivo package.json
*/

const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan");

const app = express();

//initialization
require("./database");

// setting
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

app.set("port", process.env.PORT || 3000);

// middleware ..... logs de Morgan
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// import Routes
app.use("/", require("./routes/rutas"));

//Start of Server
app.listen(app.get("port"), () =>
  console.log("Servidor iniciado ...", app.get("port"))
);
