const express = require('express');

require("dotenv").config();
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const conn = require("./src/db/conn");
const app = express();

const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());

const useRouter = require("./src/router/user.router")
app.use('/auth', useRouter);
const courseRouter = require("./src/router/course.router");
app.use('/course',courseRouter)
const contactRouter = require("./src/router/contact.router");
app.use("/contact",contactRouter);
const teacherRouter = require("./src/router/teacher.router");
app.use("/salestalent",teacherRouter);
const reviewRouter = require("./src/router/review.router");
app.use("/review",reviewRouter);

app.listen(port,()=>{
    console.log("server is connected..!!!",port)
})