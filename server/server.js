const express = require("express");
const cors = require("cors");

const { newIdea } = require("./controller");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/newIdea", newIdea);

app.listen(4000, () => console.log("Listening on port 4000"));
