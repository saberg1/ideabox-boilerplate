//query qelectors
var title = document.querySelector(".title-box");
var inputText = document.querySelector(".text-box");
var formInformation = document.querySelector("form");
var renderIdeaBox = document.querySelector("#populatedIdea");
var saveButton = document.querySelector('#saveButton');
// var starredIdeaButton = document.querySelector(".show-starred")
var starredIdeaButton = document.querySelector("#showStarredButton")

// Event Listeners
window.addEventListener("load", loadWindow);
formInformation.addEventListener("submit", submitNewIdea);
title.addEventListener("input", enableButton);
inputText.addEventListener("input", enableButton);
starredIdeaButton.addEventListener("click", starredIdeaPage); 

// global variables
var newIdea;
var parsedObject;

// functions below

function starredIdeaPage () {
  var createList = "";
  renderIdeaBox.innerHTML = "";

  if (starredIdeaButton.innerText === "Show All Ideas") {
    renderIdea()
    starredIdeaButton.innerText = "Show Starred Ideas"
    return 
  } 



  for (var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].isStar === true ) {
      createList += 
      `
        <div class="idea-boxes">
          <div class="idea-box-header">
            <img class="star-icon icon" id="${ideaList[i].id}" src="${ideaList[i].url}"/>
            <img class="delete-icon icon" id="${ideaList[i].id}" src="./assets/delete.svg"/>
          </div>
          <div class="comment-information">
            <p class="comment-title">${ideaList[i].title}</p>
            <p class="comment-text">${ideaList[i].text}</p>
          </div>
          <div class="comment-footer">
            <img class="comment-icon icon" src="./assets/comment.svg"/>
            <p class="comment-class">Comment</p>
          </div>
        </div>
      `
    }
    renderIdeaBox.innerHTML = createList;
    starredIdeaButton.innerText = "Show All Ideas"
  }
}

//change innertext on strredIdeaButton
// function buttonNameChange() {
//   starredIdeaButton.innerText = "Show All Ideas"
// }


function loadWindow(event) {
  event.preventDefault();
  disableButton();
  newIdea = new Idea();
  newIdea.getFromStorage();
  if(parsedObject !== null) {
    for (var i = 0; i < parsedObject.length; i++) {
      ideaList.push(parsedObject[i])
    }
  } 
  renderIdea();
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

function renderIdea() {
    var createList = "";
    renderIdeaBox.innerHTML = "";
    for (var i = 0; i < ideaList.length; i++) { //starIcon${i}
    createList += 
      `
        <div class="idea-boxes">
          <div class="idea-box-header">
            <img class="star-icon icon" id="${ideaList[i].id}" src="${ideaList[i].url}"/>
            <img class="delete-icon icon" id="${ideaList[i].id}" src="./assets/delete.svg"/>
          </div>
          <div class="comment-information">
            <p class="comment-title">${ideaList[i].title}</p>
            <p class="comment-text">${ideaList[i].text}</p>
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


var ideaBoxClass = document.querySelector(".idea-box-class");
ideaBoxClass.addEventListener('click', favoritedStar);
ideaBoxClass.addEventListener('click', deleteIdeaBox);

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