require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');


const DATABASE_URL = "mongodb://localhost/users"

const PORT = "3000"

//Rutas
const usersRouter = require("./routes/users");
const deckRouter = require("./routes/deck");
const questionRouter = require("./routes/question");

//Conexión a MongoDB
mongoose.connect(DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true  }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));


app.use(cors())
app.use(express.json());
app.use("/users", usersRouter);
app.use("/deck", deckRouter);
app.use("/question", questionRouter);

app.listen(PORT, () => console.log(`server has started at port ${PORT}`));

// app.listen(80, '0.0.0.0');