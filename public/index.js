const textArea = document.getElementById("idea");
const characterCounter = document.getElementById("character-counter");
const typedCharacters = document.getElementById("typed-characters");
const maxCharacters = 50;
const createIdea = document.getElementById("create-idea");
const form = document.querySelector("#idea-form");
const ideaContainer = document.getElementById("idea-container");

const createdIdea = (idea, index) => {
  const stickyNote = document.createElement("div");
  const ideaP = document.createElement("p");
  const innerDiv = document.createElement("div");
  const deleteP = document.createElement("p");
  const update = document.createElement("p");

  ideaP.textContent = idea.description;
  deleteP.textContent = "X";
  update.textContent = "update";

  stickyNote.appendChild(ideaP);
  stickyNote.appendChild(innerDiv);

  innerDiv.appendChild(deleteP);
  innerDiv.appendChild(update);

  ideaContainer.appendChild(stickyNote);

  stickyNote.classList.add("sticky");
};

const handleSubmit = (e) => {
  e.preventDefault();
  const newIdea = {
    description: idea.value,
  };
  axios.post("http://localhost:4000/api/newIdea", newIdea).then((res) => {
    ideaContainer.innerHTML = "";
    console.log(res.data);
    res.data.forEach(createdIdea);
  });
};

textArea.addEventListener("keyup", (e) => {
  const typedCharactersLength = textArea.value.length;
  if (typedCharactersLength > maxCharacters) {
    return false;
  }

  typedCharacters.textContent = typedCharactersLength;
});

createIdea.addEventListener("click", () => {
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "inline";
  } else {
    form.style.display = "none";
  }
});

form.addEventListener("submit", handleSubmit);
