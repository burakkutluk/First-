import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddlewares.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import methodOverride from "method-override";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//connection db
conn();

const app = express();
const port = 3000;

// ejs template engine
app.set("view engine", "ejs");

//static files middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//routes
app.use("*", checkUser);
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/users", userRoute);

// app.get('/', (req, res) => {
//     res.render('index')
// })

// app.get('/about', (req, res) => {
//     res.render('about')
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
