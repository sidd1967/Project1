const express = require("express");
const session = require("express-session");
var cookieParser = require("cookie-parser");
const cors = require("cors");
const { uuid } = require("uuidv4");
const bodyParser = require("body-parser");
const envs = require("./configurations");
const db = require("./database");
const MongoDBStore = require("connect-mongodb-session")(session);
const user = require("./routes/user.route");
const article = require("./routes/article.route");
const profile = require("./routes/profile.route");
var morgan = require("morgan");
var app = express();
const swaggerUi = require("swagger-ui-express");
var specs = require("./swagger");
const config = require("./handlers/config");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const dBstore = new MongoDBStore({
  uri: envs.MONGO_URL,
  collection: "sessions",
});

app.use(cors());
app.use(cors({ credentials: true, origin: envs.CORS_URL }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    key: config.secret,
    secret: envs.NODE_ENV,
    // genid: (req) => {
    //   return envs.NODE_ENV + uuid();
    // },
    store: dBstore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
    //unset: "destroy",
    //name: "session cookie name",
  })
);

app.use("/users", user);
app.use("/articles", article);
app.use("/profile", profile);

var listener = app.listen(envs.PORT, function () {
  console.log("Listening on port " + listener.address().port);
});
