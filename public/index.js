const textArea = document.getElementById("idea");
const characterCounter = document.getElementById("character-counter");
const typedCharacters = document.getElementById("typed-characters");
const maxCharacters = 50;
const createIdea = document.getElementById("create-idea");
const form = document.querySelector("form");

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
