require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const { SERVER_PORT } = process.env;
const { seed } = require("./seed");

const { newIdea, updateIdea, deleteIdea, getIdeas } = require("./controller");

app.use(express.json());
app.use(cors());

app.post("/seed", seed);

app.get("/api/getIdeas", getIdeas);
app.post("/api/newIdea", newIdea);
app.put("/api/updateIdea/:id", updateIdea);
app.delete("/api/deleteIdea/:id", deleteIdea);

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`));
