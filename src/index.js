/* npm run dev    ---> para correr el proyecto,
    anteriormente ya se configuro el archivo package.json
*/

const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");

const app = express();

//initialization
require("./database");
require("./passport/local-auth");

// setting
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", engine);
app.set("view engine", "ejs");

app.set("port", process.env.PORT || 3000);

// middleware ..... logs de Morgan
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "mysecretsession",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// import Routes
app.use("/", require("./routes/rutas"));

//Start of Server
app.listen(app.get("port"), () =>
  console.log("Servidor iniciado ...", app.get("port"))
);
