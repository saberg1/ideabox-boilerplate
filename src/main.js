//query qelectors
var title = document.querySelector(".title-box");
var inputText = document.querySelector(".text-box");
var formInformation = document.querySelector("form");
var renderIdeaBox = document.querySelector("#populatedIdea");
var saveButton = document.querySelector('#saveButton');
var starIcon = document.querySelector("#starIcon")
var ideaBoxClass = document.querySelector(".idea-box-class")


// Event Listeners
formInformation.addEventListener("submit", submitNewIdea);
window.addEventListener("load", loadWindow);
title.addEventListener("input", enableButton);
inputText.addEventListener("input", enableButton);
ideaBoxClass.addEventListener('click', favoritedStar);


// go throught click one button, specific ID 
// only button we want to hcange source on/ that specific ID
// clicck another button have annother ID to target that button
//to chang that source. in function need to assign queryslector
//on the button i want. and run a functon when taht button is clicked
//every ID should be unique. 
//toggle


 


// global variables
var newIdea = [];

// functions below
function submitNewIdea(event) {
  event.preventDefault();
  createIdeaList();
  updateIdeaList();
  renderIdea();
  clearTextBoxes();
  disableButton();

  // formInputValidation();

  //single responsibility function...
};

function createIdeaList() {
  newIdea = new Idea(title.value, inputText.value);
};

function updateIdeaList() {
  ideaList.unshift(newIdea);
};

function renderIdea() {
    var createList = "";
    renderIdeaBox.innerHTML = "";

    for (var i = 0; i < ideaList.length; i++) {
    createList += `<div class="idea-boxes">
      <div class="idea-box-header">
        <img class="star-icon icon" id="starIcon${i}" src="./assets/star.svg"/>
        <img class="delete-icon icon" src="./assets/delete.svg"/>
      </div>
      <div class="comment-information">
        <p class="comment-title">${ideaList[i].title}</p>
        <p class="comment-text">${ideaList[i].text}</p>
      </div>
      <div class="comment-footer">
        <img class="comment-icon icon" src="./assets/comment.svg"/>
        <p class="comment-class">Comment</p>
      </div>
      </div>`
    };
    renderIdeaBox.innerHTML = createList;
};

function clearTextBoxes() {
  title.value = "";
  inputText.value = "";
};

function loadWindow(event) {
  event.preventDefault();
  disableButton();
  // disable button on load 
};

function disableButton() {
  saveButton.disabled = true;
};

function enableButton(event) {
  event.preventDefault();

  var monitorTitleInput = title.value;
  var monitorTextBoxInput = inputText.value;

  if (monitorTitleInput.length !== 0 && monitorTextBoxInput.length !== 0) {
    saveButton.disabled = false;
  }
  if (monitorTitleInput.length === 0 || monitorTextBoxInput.length === 0) {
    saveButton.disabled = true;
  };
};

//udpate data model - when star is clicked, update data model
// call the ideaClass.method determine if === false || true and toggle
// off that. data model updates based off status, if statement to 
// if star = true ... if star = false ... 


function favoritedStar(event) {
  var selectedStar = document.querySelector(`#${event.target.id}`)

  newIdea.updateIsStar(`#${event.target.id}`);
    console.log("1", `#${event.target.id}`)
  if (ideaList[0].isStar === true) {
    selectedStar.src = "./assets/star-active.svg"
    console.log("2", `#${event.target.id}`)
  } else {
    selectedStar.src = "./assets/star.svg"
  }

}

// function switchStarIcon() {
//   starIcon.src = "./assets/star-active.svg"
//   console.log("star shold be here")
// }

