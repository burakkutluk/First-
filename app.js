import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import { checkUser } from "./middlewares/authMiddlewares.js";

dotenv.config();

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

//routes
app.get("*", checkUser)
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
