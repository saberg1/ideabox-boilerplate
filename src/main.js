//query qelectors
var titleInput = document.querySelector("#titleInput");
var textInput = document.querySelector("#textInput");
var formInformation = document.querySelector("#inputForm");
var renderIdeaBox = document.querySelector("#ideaBoxGrid");
var saveButton = document.querySelector('#saveButton');
var ideaBoxGrid = document.querySelector("#ideaBoxGrid");
var starredIdeaButton = document.querySelector("#showStarredButton");

// Event Listeners
window.addEventListener("load", loadWindow);
formInformation.addEventListener("submit", saveNewIdea);
titleInput.addEventListener("input", enableButton);
textInput.addEventListener("input", enableButton);
starredIdeaButton.addEventListener("click", renderFavoriteIdeasToPage);
ideaBoxGrid.addEventListener("click", switchStarImage);
ideaBoxGrid.addEventListener("click", deleteIdeaBox);

// global variables
var newIdea; //no global variables except an array for ideas???

// functions below
function loadWindow(event) {
  event.preventDefault();
  disableSaveButton();
  newIdea = new Idea();
  newIdea.getFromLocalStorage();
  // if(parsedObject !== null) {
  //   for (var i = 0; i < parsedObject.length; i++) {
  //     ideaList.push(parsedObject[i])
  //   }
  // }
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
}

function createNewIdeaInstance() {
  newIdea = new Idea(titleInput.value, textInput.value, "./assets/star.svg");
}

function addNewIdeaToIdeaList() { //move to Idea class
  ideaList.unshift(newIdea);
}

function renderAllIdeasToPage() {
  renderIdeaBox.innerHTML = "";
  generateIdeaBoxGrid(ideaList);
}

function renderFavoriteIdeasToPage() {
  renderIdeaBox.innerHTML = "";
  var favoriteIdeaList = [];
  if (starredIdeaButton.innerText === "Show All Ideas") {
    starredIdeaButton.innerText = "Show Starred Ideas";
    generateIdeaBoxGrid(ideaList);
    return
  }
  for (var i = 0; i < ideaList.length; i++) {
    if (ideaList[i].isStar === true ) {
      favoriteIdeaList.push(ideaList[i]);
      starredIdeaButton.innerText = "Show All Ideas";
    }
  }
  generateIdeaBoxGrid(favoriteIdeaList);
}

function generateIdeaBoxGrid(array) {
  var createList = "";
  renderIdeaBox.innerHTML = "";
  for (var i = 0; i < array.length; i++) {
  createList +=
    `
      <article class="idea-boxes" id="${array[i].id}">
        <div class="idea-box-header">
          <img class="star-icon idea-box-icons" src="${array[i].url}"/>
          <img class="delete-icon idea-box-icons" src="./assets/delete.svg"/>
        </div>
        <div class="comment-information">
          <p class="comment-title">${array[i].title}</p>
          <p class="comment-text">${array[i].text}</p>
        </div>
        <div class="comment-footer">
          <img class="comment-icon idea-box-icons" src="./assets/comment.svg"/>
          <p class="comment-class">Comment</p>
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
  }

  for (i = 0; i < ideaList.length; i++) {
    if (ideaList[i].isStar === true && event.target.classList.contains("star-icon")) {
      event.target.src = ideaList[i].url;
    } else if (event.target.classList.contains("star-icon")) {
        event.target.src = ideaList[i].url;
    }
  }
  renderAllIdeasToPage();
}

function disableSaveButton() {
  saveButton.disabled = true;
}

function enableButton(event) {
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

var searchBarInput = document.querySelector("#searchBarInput");
searchBarInput.addEventListener("input", searchIdeaList);

function searchIdeaList() {
  // console.log("1", searchBarInput.value);
  // console.log("2", searchBarInput.value.length);
  // console.log("3", searchBarInput.value.trim().length);

  if (searchBarInput.value.trim().length === 0) { //.trim() recognizes empty spaces as 0 no matter how many
    generateIdeaBoxGrid(ideaList);
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
  generateIdeaBoxGrid(filteredIdeaList);
}
