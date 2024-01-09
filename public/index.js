const textArea = document.getElementById("idea");
const characterCounter = document.getElementById("character-counter");
const typedCharacters = document.getElementById("typed-characters");
const maxCharacters = 255;
const createIdea = document.getElementById("create-idea");
const form = document.querySelector("#idea-form");
const ideaContainer = document.getElementById("idea-container");
const sticky = document.getElementsByClassName("sticky");

const colors = [
  "#F5F6F8",
  "#FFF9B1",
  "#daf7a1",
  "#ffc000",
  "#C9DF56",
  "#FF9D48",
  "#b6d7a8",
  "#ff0000",
  "#77ccc7",
  "#eca2c4",
  "#6ED8FA",
  "#FFCEE0",
  "#b1d3f6",
  "#b485bc",
  "#8ca0ff",
  "#000000",
];

let currentColorIndex = 0;

const deleteIdea = (id) => {
  axios
    .delete(`http://localhost:4000/api/deleteIdea/${id}`)
    .then((res) => {
      const stickyNote = document.querySelector(`.sticky[data-id="${id}"]`);
      if (stickyNote) {
        stickyNote.remove(id);
      }
    })
    .catch((error) => {
      console.error("Error deleting idea:", error);
    });
};

const updateIdea = (id, ideaP, characterCount) => {
  const parentNode = ideaP.parentNode;

  if (!parentNode) {
    console.error("Parent node of ideaP does not exist.");
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = ideaP.textContent;

  const updateButton = document.createElement("button");
  updateButton.textContent = "Update";

  const handleUpdate = () => {
    const updatedValue = textarea.value;
    const updatedIdeaP = document.createElement("p");
    updatedIdeaP.textContent = updatedValue;

    if (parentNode) {
      parentNode.replaceChild(updatedIdeaP, textarea);

      let updatedIdea = {
        description: updatedValue,
      };

      axios
        .put(`http://localhost:4000/api/updateIdea/${id}`, updatedIdea)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.error("Error updating idea:", error);
        });

      resetEditState();
    }
  };

  const resetEditState = () => {
    // Remove the "Update" button
    if (updateButton.parentNode) {
      updateButton.parentNode.removeChild(updateButton);
    }

    // Remove the textarea
    if (parentNode.contains(textarea)) {
      parentNode.removeChild(textarea);
    }

    // Remove event listeners
    updateButton.removeEventListener("click", handleUpdate);
    textarea.removeEventListener("blur", handleBlur);

    // Reset the editing flag
    ideaP.isEditing = false;
  };

  const handleBlur = () => {
    handleUpdate();
  };

  const updateCharacterCount = () => {
    const typedCharactersLength = textarea.value.length;
    characterCount.textContent = `${typedCharactersLength} / 255`;
  };

  updateButton.addEventListener("click", handleUpdate);
  textarea.addEventListener("blur", handleBlur);
  textarea.addEventListener("input", updateCharacterCount);

  parentNode.replaceChild(textarea, ideaP);
  parentNode.appendChild(updateButton);

  // Set focus to the textarea for editing
  textarea.focus();

  const stickyNote = parentNode;
  const backgroundColor = stickyNote.style.backgroundColor.toLowerCase();

  if (backgroundColor === "#ff0000" || backgroundColor === "rgb(255, 0, 0)") {
    characterCount.style.color = "#ffff00";
  } else {
    // Reset the color to default if not red
    characterCount.style.color = "";
  }
};

const createdIdea = (idea, index) => {
  const stickyNote = document.createElement("div");
  const ideaP = document.createElement("p");
  const innerDiv = document.createElement("div");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  const characterCount = document.createElement("span");
  stickyNote.dataset.id = idea.id;

  ideaP.textContent = idea.description;
  characterCount.textContent = `${idea.description.length}/255`;
  deleteButton.textContent = "X";
  editButton.textContent = "edit";

  stickyNote.appendChild(ideaP);
  stickyNote.appendChild(characterCount); // Add this line
  stickyNote.appendChild(innerDiv);

  innerDiv.appendChild(deleteButton);
  innerDiv.appendChild(editButton);

  innerDiv.appendChild(characterCount);

  ideaContainer.appendChild(stickyNote);

  const stickyNoteColor = colors[currentColorIndex];
  if (stickyNoteColor === "#ff0000") {
    characterCount.style.color = "#ffff00";
  }

  editButton.addEventListener("click", () =>
    updateIdea(idea.id, ideaP, characterCount)
  );
  ideaP.classList.add("idea-paragraph");
  editButton.classList.add("edit-button");
  innerDiv.classList.add("action-div");
  stickyNote.classList.add("sticky");
  stickyNote.style.backgroundColor = colors[currentColorIndex];

  if (colors[currentColorIndex] === "#000000") {
    ideaP.style.color = "white";
  }

  currentColorIndex = (currentColorIndex + 1) % colors.length;

  typedCharacters.textContent = 0;

  deleteButton.addEventListener("click", () => deleteIdea(idea.id));
};

axios.get("http://localhost:4000/api/getIdeas").then((res) => {
  // ideaContainer.innerHTML = "";
  console.log(res.data);
  res.data.forEach(createdIdea);
});

const handleSubmit = (e) => {
  e.preventDefault();
  const newIdea = {
    description: idea.value,
  };
  axios.post("http://localhost:4000/api/newIdea", newIdea).then((res) => {
    // ideaContainer.innerHTML = "";
    console.log(res.data);
    res.data.forEach(createdIdea);
    form.style.display = "none";
    textArea.value = "";
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
    form.style.display = "flex";
  } else {
    form.style.display = "none";
  }
});

form.addEventListener("submit", handleSubmit);
