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
titleInput.addEventListener('invalid', inputValidation);
textInput.addEventListener("input", enableSaveButton);
starredIdeaButton.addEventListener("click", renderFavoriteIdeasToPage);
ideaBoxGrid.addEventListener("click", switchStarImage);
ideaBoxGrid.addEventListener("click", deleteIdeaBox);
searchBarInput.addEventListener("input", searchIdeaList);

// global variables
var newIdea; //no global variables except an array for ideas???

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
}

function createNewIdeaInstance() {
  newIdea = new Idea(titleInput.value, textInput.value, "./assets/star.svg");
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
  var favoriteIdeaList = [];
  if (starredIdeaButton.innerText === "Show All Ideas") {
    starredIdeaButton.innerText = "Show Starred Ideas";
    generateIdeaBoxGrid(ideaList);                    // replace w/ renderAllIdeasToPage()
    return;
  }                                                   //else call the function renderFavoriteIdeasToPage...
  for (var i = 0; i < ideaList.length; i++) {         //move to a new function called renderFavoriteIdeasToPage
    if (ideaList[i].isStar === true ) {
      favoriteIdeaList.push(ideaList[i]);
      starredIdeaButton.innerText = "Show All Ideas";
    }
  }
  generateIdeaBoxGrid(favoriteIdeaList);
}

function generateIdeaBoxGrid(array) {                   //change out the parameter name; "array is bad practice"
  var createList = "";
  renderIdeaBox.innerHTML = "";
  for (var i = 0; i < array.length; i++) {
  createList +=
    `
      <article class="idea-boxes" id="${array[i].id}">
        <div class="idea-box-header">
          <img class="star-icon idea-box-icons" src="${array[i].url}" alt="${array[i].alt}"/>
          <img class="delete-icon idea-box-icons" src="./assets/delete.svg" alt="icon small x to delete box"//>
        </div>
        <div class="comment-information">
          <p class="comment-title">${array[i].title}</p>
          <p class="comment-text">${array[i].text}</p>
        </div>
        <div class="comment-footer">
          <img class="comment-icon idea-box-icons" src="./assets/comment.svg" alt="icon create comment button"//>
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
  }                                                     //put in another function?

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
}

function inputValidation() {
  if (titleInput.value.trim().length === 0) {
    console.log('e');
    console.log(titleInput.value.trim().length);
    titleInput.setCustomValidity("Please enter a title. Try again!");
  }
}
