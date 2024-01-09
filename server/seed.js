require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(CONNECTION_STRING);

module.exports = {
  seed: (req, res) => {
    sequelize
      .query(
        `
          drop table if exists ideas;

          create table ideas (
              id serial primary key, 
              description varchar(255)
          );

          insert into ideas (description)
          values 
          ('take over the world'),
          ('open bank account'),
          ('buy apple'),
          ('buy delta'),
          ('open smoke shop'),
          ('open consignment store for resellers'),
          ('trademark brand'),
          ('get restaurant llc'),
          ('do a collab'),
          ('take a cruise'),
          ('build treehouse'),
          ('visit a castle'),
          ('see an opera'),
          ('explore a cave'),
          ('skydive'),
          ('cord the one in charge');

          `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};
