const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let checkedTaskCounter = 0;
let dogImage = null;

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");

      if (e.target.classList.contains("checked")) {
        checkedTaskCounter++;
      } else {
        checkedTaskCounter--;
      }

      if (checkedTaskCounter % 5 === 0) {
        showDogImage();
      } else {
        removeDogImage();
      }
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function showDogImage() {
  if (!dogImage) {
    dogImage = document.createElement("img");
    dogImage.id = "dog-image";
    dogImage.src = "/images/dog.jpeg";
    document.body.appendChild(dogImage);
  }
}

function removeDogImage() {
  if (dogImage) {
    document.body.removeChild(dogImage);
    dogImage = null;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    removeDogImage();
  }
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
