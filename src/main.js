//query qelectors
var title = document.querySelector(".title-box");
var inputText = document.querySelector(".text-box");
var formInformation = document.querySelector("form");
var renderIdeaBox = document.querySelector("#populatedIdea");
var saveButton = document.querySelector('#saveButton');
var ideaBoxClass = document.querySelector(".idea-box-class");
var starredIdeaButton = document.querySelector("#showStarredButton")

// Event Listeners
window.addEventListener("load", loadWindow);
formInformation.addEventListener("submit", submitNewIdea);
title.addEventListener("input", enableButton);
inputText.addEventListener("input", enableButton);
starredIdeaButton.addEventListener("click", starredIdeaPage);
ideaBoxClass.addEventListener('click', favoritedStar);
ideaBoxClass.addEventListener('click', deleteIdeaBox);

// global variables
var newIdea;

// functions below
function showAllIdeas() {
  starredIdeaButton.innerText = "Show All Ideas"
}

function showStarredIdeas() {
  starredIdeaButton.innerText = "Show Starred Ideas"
}

function loadWindow(event) {
  event.preventDefault();
  disableButton();
  newIdea = new Idea();
  newIdea.getFromStorage();
  // if(parsedObject !== null) {
  //   for (var i = 0; i < parsedObject.length; i++) {
  //     ideaList.push(parsedObject[i])
  //   }
  // }
  ideasRendered(ideaList);
}

function submitNewIdea(event) {
  event.preventDefault();
  createIdeaList();
  updateIdeaList();
  renderIdea();
  clearTextBoxes();
  disableButton();
  newIdea.saveToStorage();
}

function createIdeaList() {
  newIdea = new Idea(title.value, inputText.value, "./assets/star.svg");
}

function updateIdeaList() {
  ideaList.unshift(newIdea);
}

function ideasRendered(array) {
  var createList = "";
  renderIdeaBox.innerHTML = "";
  for (var i = 0; i < array.length; i++) { //starIcon${i}
  createList +=
    `
      <div class="idea-boxes">
        <div class="idea-box-header">
          <img class="star-icon icon" id="${array[i].id}" src="${array[i].url}"/>
          <img class="delete-icon icon" id="${array[i].id}" src="./assets/delete.svg"/>
        </div>
        <div class="comment-information">
          <p class="comment-title">${array[i].title}</p>
          <p class="comment-text">${array[i].text}</p>
        </div>
        <div class="comment-footer">
          <img class="comment-icon icon" src="./assets/comment.svg"/>
          <p class="comment-class">Comment</p>
        </div>
      </div>
    `
  }
  renderIdeaBox.innerHTML = createList;
}

function starredIdeaPage() {
  renderIdeaBox.innerHTML = "";
  var starredList = [];
  if (starredIdeaButton.innerText === "Show All Ideas") {
    starredIdeaButton.innerText = "Show Starred Ideas";
    ideasRendered(ideaList);
    return
  }
  for (var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].isStar === true ) {
      starredList.push(ideaList[i]);
      starredIdeaButton.innerText = "Show All Ideas";
    }
  }
  ideasRendered(starredList);
}

function renderIdea() {
    renderIdeaBox.innerHTML = "";
    ideasRendered(ideaList)
}

function deleteIdeaBox(event) {
  if (event.target.classList.contains('delete-icon')) {
    for (var i = 0; i < ideaList.length; i++) {
      if (ideaList[i].id === parseInt(event.target.id)) {
        ideaList.splice(i, 1);
      }
    }
  }
// change on refactor to have delete function inside Idea class
  renderIdea();
  newIdea.saveToStorage(); //ADD
}

function favoritedStar(event) {
  if (event.target.classList.contains('star-icon')) {
    newIdea.updateIdea(event.target.id)
  }

  for (i = 0; i < ideaList.length; i++) {
    if (ideaList[i].isStar === true && event.target.classList.contains('star-icon')) {
      event.target.src = ideaList[i].url;
    } else if (event.target.classList.contains('star-icon')) {
        console.log('b=', ideaList[i].isStar)
        event.target.src = ideaList[i].url;
    }
  }
  renderIdea()
}

function disableButton() {
  saveButton.disabled = true;
}

function enableButton(event) {
  event.preventDefault();
  var monitorTitleInput = title.value;
  var monitorTextBoxInput = inputText.value;
  if (monitorTitleInput.length !== 0 && monitorTextBoxInput.length !== 0) {
    saveButton.disabled = false;
  }
  if (monitorTitleInput.length === 0 || monitorTextBoxInput.length === 0) {
    saveButton.disabled = true;
  }
}

function clearTextBoxes() {
  title.value = "";
  inputText.value = "";
}

var searchBarInput = document.querySelector("#searchBarInput");
searchBarInput.addEventListener("input", searchIdeaList);

function searchIdeaList() {
  console.log("1", searchBarInput.value);
  console.log("2", searchBarInput.value.length);
  console.log("3", searchBarInput.value.trim().length);
  if (searchBarInput.value.trim().length === 0) { //.trim() recognizes empty spaces as 0 no matter how many
    ideasRendered(ideaList);
    return;
  }
  var createList = "";
  renderIdeaBox.innerHTML = "";
  var filteredIdeaList = [];
  for (var i = 0; i < ideaList.length; i++) {
    if (searchBarInput !== " "
        && (ideaList[i].title.includes(searchBarInput.value)
        || ideaList[i].text.includes(searchBarInput.value))) {
          filteredIdeaList.push(ideaList[i]);
        }
      }
  ideasRendered(filteredIdeaList);
}
