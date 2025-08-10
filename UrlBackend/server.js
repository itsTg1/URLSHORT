const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect=require('./config/dbConnect')
const urlRoutes=require('./routes/url')
const { redirectUrl } = require("./controller/urlController");
require("dotenv").config();

const app = express();
const corsOption={
    origin:"https://url-shortner-mauve-five.vercel.app",
    methods:['POST','GET'],
    credentials:true
}
app.use(cors(corsOption));
app.use(express.json());
dbConnect();
app.use("/api/url",urlRoutes);

app.get("/:shortId", redirectUrl);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
