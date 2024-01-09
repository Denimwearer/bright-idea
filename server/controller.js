require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(CONNECTION_STRING);

// let ideas = [];
// let globalId = 1;

module.exports = {
  newIdea: (req, res) => {
    // let newIdea = req.body;
    // newIdea.id = globalId;
    // globalId++;
    // ideas.push(newIdea);
    // res.status(200).send(ideas);
    const { description } = req.body;
    sequelize
      .query(
        `
        INSERT INTO ideas (description)
        VALUES (
          '${description}'
        )
        RETURNING *;
        `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  updateIdea: (req, res) => {
    // let indexValue = ideas.findIndex((idea) => (idea.id = req.body.id));
    // ideas.splice(indexValue, 1, req.body);
    // res.status(200).send(ideas);

    let { description } = req.body;
    sequelize
      .query(
        `
        UPDATE ideas
        SET description = '${description}'
        WHERE id = ${req.params.id};
        `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  deleteIdea: (req, res) => {
    sequelize
      .query(
        `
        DELETE 
        FROM ideas
        WHERE id = ${req.params.id};
        `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
  getIdeas: (req, res) => {
    sequelize
      .query(
        `
        SELECT * 
        FROM ideas
        ORDER BY id;
        `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((err) => console.log(err));
  },
};
