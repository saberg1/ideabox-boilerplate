//query selectors
var formInformation = document.querySelector("#inputForm");
var ideaBoxGrid = document.querySelector("#ideaBoxGrid");
var renderIdeaBox = document.querySelector("#ideaBoxGrid");
var saveButton = document.querySelector('#saveButton');
var searchBarInput = document.querySelector("#searchBarInput");
var starredIdeaButton = document.querySelector("#showStarredButton");
var textInput = document.querySelector("#textInput");
var textIconValidation = document.querySelector('.text-icon-validation');
var textInputValidation = document.querySelector('.text-validation');
var titleInput = document.querySelector("#titleInput");
var titleIconValidation = document.querySelector('.title-icon-validation');
var titleInputValidation = document.querySelector('.title-validation');

// Event Listeners
window.addEventListener("load", loadWindow);
formInformation.addEventListener("submit", saveNewIdea);
ideaBoxGrid.addEventListener("click", switchStarImage);
ideaBoxGrid.addEventListener("click", deleteIdeaBox);
ideaBoxGrid.addEventListener("click", renderCommentInProgressMessage);
searchBarInput.addEventListener("input", searchIdeaList);
starredIdeaButton.addEventListener("click", renderFavoriteIdeasToPage);
textInput.addEventListener("input", enableSaveButton);
titleInput.addEventListener("input", enableSaveButton);
titleInput.addEventListener("input", renderTitleValidation);
textInput.addEventListener("input", renderTextValidation);

// global variable
var ideaList = [];

// functions below
function loadWindow(event) {
  event.preventDefault();
  createNewIdeaInstance();
  newIdea.getFromLocalStorage();
  generateIdeaBoxGrid(ideaList);
  disableSaveButton();
}

function saveNewIdea(event) {
  event.preventDefault();
  createNewIdeaInstance();
  renderAllIdeasToPage();
  clearTitleTextInput();
  disableSaveButton();
  newIdea.saveToLocalStorage();
  starredIdeaButton.innerText = "Show Starred Ideas";
}

function createNewIdeaInstance() {
  newIdea = new Idea(titleInput.value, textInput.value, "./assets/star.svg", "./assets/comment.svg", "Comment");
  addNewIdeaToIdeaList(newIdea);
}

function addNewIdeaToIdeaList(newIdea) {   
  newIdea.updateIdeaList(newIdea);
}

function renderAllIdeasToPage() {
  renderIdeaBox.innerHTML = "";
  generateIdeaBoxGrid(ideaList);
}

function generateIdeaBoxGrid(list) {
  var createList = "";
  renderIdeaBox.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
    createList +=
      `
        <article class="idea-boxes" id="${list[i].id}">
          <div class="idea-box-header">
            <img class="star-icon idea-box-icons" src="${list[i].urlStar}" alt="${list[i].altStar}"/>
            <img class="delete-icon idea-box-icons" src="./assets/delete.svg" alt="mall x to delete box"/>
          </div>
          <div class="comment-information">
            <p class="comment-title">${list[i].title}</p>
            <p class="comment-text">${list[i].text}</p>
          </div>
          <div class="comment-footer">
            <img class="comment-icon idea-box-icons" src="${list[i].errorIconURL}" alt="${list[i].altErrorIcon}"/>
            <p class="comment-class">${list[i].commentText}</p>
          </div>
        </article>
      `
    }
    renderIdeaBox.innerHTML = createList;
}

function renderFavoriteIdeasToPage() { 
  if (starredIdeaButton.innerText === "Show All Ideas") {
    renderAllIdeasFromFavoriteButton();
  } else {
      newIdea.generateFavoriteIdeaList();
  }
}

function renderAllIdeasFromFavoriteButton() {
  renderAllIdeasToPage();
  starredIdeaButton.innerText = "Show Starred Ideas";
}

function renderFavoriteIdeaList(list) {
  if(list.length) {
    generateIdeaBoxGrid(list);
  } else {
      renderNoFavoriteIdeasMessage();
  }
  starredIdeaButton.innerText = "Show All Ideas";
}

function renderNoFavoriteIdeasMessage() {
  starredIdeaButton.innerText = "Show All Ideas";
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
  updateStar(event);
  renderStar(event);
  updateShowAllButtonStarClick(event)
}

function updateStar(event) {
  if (event.target.classList.contains("star-icon")) {
    newIdea.updateIsStar(event.target.closest("article").id);
  }
}

function renderStar(event) {
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

function updateShowAllButtonStarClick(event) {
  for (i = 0; i < ideaList.length; i++) {
    if (ideaList[i].isStar === true && event.target.classList.contains("star-icon")
        && starredIdeaButton.innerText === "Show All Ideas") {
      starredIdeaButton.innerText = "Show Starred Ideas";
    }
  }
}

function disableSaveButton() {
  saveButton.disabled = true;
}

function enableSaveButton() {
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
  if (searchBarInput.value.trim().length === 0) {
    dontSearchIdeaListIsEmpty();
  } else {
      searchIdeaListNotEmpty();
  }
}

function dontSearchIdeaListIsEmpty() {
  if (searchBarInput.value.trim().length === 0) {
    generateIdeaBoxGrid(ideaList);
    starredIdeaButton.innerText = "Show Starred Ideas";
  }
}

function searchIdeaListNotEmpty() {
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

function renderCommentInProgressMessage(event) {
  updateComment(event);
  renderComment(event);
}

function updateComment(event) {
  if (event.target.classList.contains("comment-icon")) {
    newIdea.updateIsComment(event.target.closest("article").id);
  }
}

function renderComment(event) {
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

function renderTitleValidation() {
  if (titleInput.value.trim().length === 0) {
    show(titleInputValidation);
    show(titleIconValidation);
    disableSaveButton();
  } else {
      hide(titleInputValidation);
      hide(titleIconValidation);
  }
}

function renderTextValidation() {
  if (textInput.value.trim().length === 0) {
    show(textInputValidation);
    show(textIconValidation);
    disableSaveButton();
  } else {
      hide(textInputValidation);
      hide(textIconValidation);
  }
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}
