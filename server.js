const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")
app.set("views", "views")

// Access Route
const studentRouter = require('./route/studentRouter');
app.use(studentRouter);

const dbDriver = "mongodb+srv://abhishek:rKbKhmexljtap0Rh@cluster0.jwma6.mongodb.net/dbStudent"


const port = process.env.PORT || 8001

mongoose.connect(dbDriver, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((result) => {
    app.listen(port, () => {
        console.log(`Server Is Connected!!!`);
        console.log(`DB Is Connected`);
    })
}).catch((error) => {
    console.log(`Something Went Wrong!!!`);
})