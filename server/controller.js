let ideas = [];
let globalId = 1;

module.exports = {
  newIdea: (req, res) => {
    let newIdea = req.body;
    newIdea.id = globalId;
    globalId++;
    ideas.push(newIdea);
    res.status(200).send(ideas);
  },
};
