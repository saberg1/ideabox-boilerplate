//query qelectors
var titleInput = document.querySelector("#titleInput");
var textInput = document.querySelector("#textInput");
var formInformation = document.querySelector("#inputForm");
var renderIdeaBox = document.querySelector("#ideaBoxGrid");
var saveButton = document.querySelector('#saveButton');
var ideaBoxGrid = document.querySelector("#ideaBoxGrid");
var starredIdeaButton = document.querySelector("#showStarredButton");
var searchBarInput = document.querySelector("#searchBarInput");


// Event Listeners
window.addEventListener("load", loadWindow);
formInformation.addEventListener("submit", saveNewIdea);
titleInput.addEventListener("input", enableSaveButton);
titleInput.addEventListener("invalid", inputValidation);
textInput.addEventListener("input", enableSaveButton);
starredIdeaButton.addEventListener("click", renderFavoriteIdeasToPage);
ideaBoxGrid.addEventListener("click", switchStarImage);
ideaBoxGrid.addEventListener("click", deleteIdeaBox);
searchBarInput.addEventListener("input", searchIdeaList);

// global variables
var newIdea; //no global variables except an array for ideas?

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

function renderFavoriteIdeasToPage() {
  renderIdeaBox.innerHTML = "";
  //1) renderAllIdeasFromFavoriteButton()
  //2) generateFavoriteIdeaList()
  //3) renderFavoriteIdeaList()
  //4) renderNoFavoriteIdeasMessage()

  //1)
  if (starredIdeaButton.innerText === "Show All Ideas") {
    starredIdeaButton.innerText = "Show Starred Ideas";
    // generateIdeaBoxGrid(ideaList);                    // replace w/ renderAllIdeasToPage()
    renderAllIdeasToPage();
    return;
  }   
  
  //2)
  var favoriteIdeaList = [];
  for (var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].isStar === true) {
      favoriteIdeaList.push(ideaList[i]);
    }
  }

  //3)
  if(favoriteIdeaList.length !== 0) {
    generateIdeaBoxGrid(favoriteIdeaList);
    starredIdeaButton.innerText = "Show All Ideas";
  } else {                                    //#4
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


ideaBoxGrid.addEventListener("click", renderCommentInProgrressMessage);

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
