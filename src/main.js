//query selectors
var formInformation = document.querySelector("#inputForm");
var ideaBoxGrid = document.querySelector("#ideaBoxGrid");
var renderIdeaBox = document.querySelector("#ideaBoxGrid");
var saveButton = document.querySelector('#saveButton');
var searchBarInput = document.querySelector("#searchBarInput");
var starredIdeaButton = document.querySelector("#showStarredButton");
var textInput = document.querySelector("#textInput");
var titleInput = document.querySelector("#titleInput");

// Event Listeners
window.addEventListener("load", loadWindow);
formInformation.addEventListener("submit", saveNewIdea);
ideaBoxGrid.addEventListener("click", switchStarImage);
ideaBoxGrid.addEventListener("click", deleteIdeaBox);
ideaBoxGrid.addEventListener("click", renderCommentInProgrressMessage);
searchBarInput.addEventListener("input", searchIdeaList);
starredIdeaButton.addEventListener("click", renderFavoriteIdeasToPage);
textInput.addEventListener("input", enableSaveButton);
titleInput.addEventListener("input", enableSaveButton);
titleInput.addEventListener("invalid", inputValidation);

// global variables
var newIdea; //no global variables except an array for ideas?
// var ideaList;

// functions below
function loadWindow(event) {
  event.preventDefault();
  disableSaveButton();
  newIdea = new Idea();
  newIdea.getFromLocalStorage();
  generateIdeaBoxGrid(ideaList);
}

function saveNewIdea(event) {
  event.preventDefault();
  createNewIdeaInstance();
  addNewIdeaToIdeaList();
  renderAllIdeasToPage();
  clearTitleTextInput();
  disableSaveButton();
  newIdea.saveToLocalStorage();
  starredIdeaButton.innerText = "Show Starred Ideas";
}

function createNewIdeaInstance() {
  newIdea = new Idea(titleInput.value, textInput.value, "./assets/star.svg", "./assets/comment.svg", "Comment");
}

function addNewIdeaToIdeaList() {                       //move to Idea class as updateIdeaList
  ideaList.unshift(newIdea);
}

function renderAllIdeasToPage() {
  renderIdeaBox.innerHTML = "";
  generateIdeaBoxGrid(ideaList);
}

function generateIdeaBoxGrid(array) {                   //change out the parameter name; "array is bad practice"
  var createList = "";
  renderIdeaBox.innerHTML = "";
  for (var i = 0; i < array.length; i++) {
  createList +=
    `
      <article class="idea-boxes" id="${array[i].id}">
        <div class="idea-box-header">
          <img class="star-icon idea-box-icons" src="${array[i].urlStar}" alt="${array[i].altStar}"/>
          <img class="delete-icon idea-box-icons" src="./assets/delete.svg" alt="mall x to delete box"/>
        </div>
        <div class="comment-information">
          <p class="comment-title">${array[i].title}</p>
          <p class="comment-text">${array[i].text}</p>
        </div>
        <div class="comment-footer">
          <img class="comment-icon idea-box-icons" src="${array[i].errorIconURL}" alt="${array[i].altErrorIcon}"/>
          <p class="comment-class">${array[i].commentText}</p>
        </div>
      </article>
    `
  }
  renderIdeaBox.innerHTML = createList;
}

function renderFavoriteIdeasToPage() {  //modified
  if (starredIdeaButton.innerText === "Show All Ideas") {
    renderAllIdeasFromFavoriteButton();
  } else {
      newIdea.generateFavoriteIdeaList();
  }
}

function renderAllIdeasFromFavoriteButton() { //modified
  renderIdeaBox.innerHTML = "";
  generateIdeaBoxGrid(ideaList);
  starredIdeaButton.innerText = "Show Starred Ideas";
}

function renderFavoriteIdeaList(list) { //modified
  if(list.length !== 0) {
    generateIdeaBoxGrid(list);
  } else {
      renderNoFavoriteIdeasMessage();
  }
  starredIdeaButton.innerText = "Show All Ideas";
}

function renderNoFavoriteIdeasMessage() { //modified
  starredIdeaButton.innerText = "Show All Ideas"
  renderIdeaBox.innerHTML =
  `
    <article class="idea-boxes">
      <div class="idea-box-header">
      </div>
      <div class="comment-information">
        <p class="comment-text">There are no favorite ideas!</p>
      </div>
      <div class="comment-footer">
      </div>
    </article>
  `
}

function deleteIdeaBox(event) {
  newIdea.spliceIdeaBox(event);
  renderAllIdeasToPage();
  newIdea.saveToLocalStorage();
}

function switchStarImage(event) {
  if (event.target.classList.contains("star-icon")) {
    newIdea.updateIdea(event.target.closest("article").id);
  }                                                     //put in another function?
  for (i = 0; i < ideaList.length; i++) {
    if (ideaList[i].isStar === true && event.target.classList.contains("star-icon")) {
      event.target.src = ideaList[i].urlStar;
    } else if (event.target.classList.contains("star-icon")) {
        event.target.src = ideaList[i].urlStar;
    }
  }
  renderAllIdeasToPage();
  newIdea.saveToLocalStorage();
}

function disableSaveButton() {
  saveButton.disabled = true;
}

function enableSaveButton(event) {
  event.preventDefault();
  var monitorTitleInput = titleInput.value;
  var monitorTextBoxInput = textInput.value;
  if (monitorTitleInput.length !== 0 && monitorTextBoxInput.length !== 0) {
    saveButton.disabled = false;
  }
  if (monitorTitleInput.length === 0 || monitorTextBoxInput.length === 0) {
    saveButton.disabled = true;
  }
}

function clearTitleTextInput() {
  titleInput.value = "";
  textInput.value = "";
}

function searchIdeaList() {
  if (searchBarInput.value.trim().length === 0) { //.trim() recognizes empty spaces as 0 no matter how many
    generateIdeaBoxGrid(ideaList);
    starredIdeaButton.innerText = "Show Starred Ideas";
    return;                                       //can we break into two functions?
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
  generateIdeaBoxGrid(filteredIdeaList);
  starredIdeaButton.innerText = "Show Starred Ideas";
}

function inputValidation() {
  console.log('a')
  if (titleInput.value.trim().length === 0) {
  //   console.log('e');
  //   console.log(titleInput.value.trim().length);
    titleInput.setCustomValidity("Please enter a title. Try again!");
  }
}

function renderCommentInProgrressMessage(event) {
  if (event.target.classList.contains("comment-icon")) {
    newIdea.updateComment(event.target.closest("article").id);
  }                                                     //put in another function?
  for (i = 0; i < ideaList.length; i++) {
    if (ideaList[i].isComment === true && event.target.classList.contains("comment-icon")) {
      event.target.src = ideaList[i].errorIconURL;
    } else if (event.target.classList.contains("comment-icon")) {
        event.target.src = ideaList[i].errorIconURL;
    }
  }
  renderAllIdeasToPage();
  newIdea.saveToLocalStorage();
}
