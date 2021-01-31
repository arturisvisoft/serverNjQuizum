require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');


//Rutas
const usersRouter = require("./routes/users");
const deckRouter = require("./routes/deck");
const questionRouter = require("./routes/question");

//Conexión a MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true  }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));


app.use(cors())
app.use(express.json());
app.use("/users", usersRouter);
app.use("/deck", deckRouter);
app.use("/question", questionRouter);

app.listen(process.env.PORT, () => console.log(`server has started at port ${process.env.PORT}`));