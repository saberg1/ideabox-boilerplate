class Idea {
  constructor(title, input, urlStar, errorIcon, commentText) {
    this.id = Date.now();
    this.title = title;
    this.text = input;
    this.isStar = false;
    this.urlStar = urlStar;
    this.altStar = "small white star";
    this.isComment = false;
    this.errorIcon = errorIcon;
    this.altErrorIcon = "comment icon"
    this.commentText = commentText;

 }

  saveToLocalStorage() {
    if(ideaList.length === 0) {
      this.deleteFromLocalStorage();
    } else {
        var objectToStore = ideaList;
        var stringifiedObject = JSON.stringify(objectToStore);
        localStorage.setItem("somethingComplicated", stringifiedObject);
    }
  }

  getFromLocalStorage() {
    var parsedObject;
    var retrievedObject = localStorage.getItem("somethingComplicated");
    parsedObject = JSON.parse(retrievedObject);
    this.renderParsedList(parsedObject);
  }

  renderParsedList(renderParsedObject) {
    if(renderParsedObject !== null) {
      for (var i = 0; i < renderParsedObject.length; i++) {
        ideaList.push(renderParsedObject[i]);
      }
    }
  }

  deleteFromLocalStorage() {
    localStorage.clear()
  }

  updateIdea(id) {
    console.log(ideaList)
    for (var i = 0; i < ideaList.length; i++) {
      if (ideaList[i].id === parseInt(id) && ideaList[i].isStar === true) {
       ideaList[i].isStar = false;
       ideaList[i].urlStar = "./assets/star.svg";
       ideaList[i].altStar = "small white star";
      } else if (ideaList[i].id === parseInt(id) && ideaList[i].isStar === false){
          ideaList[i].isStar = true;
          ideaList[i].urlStar = "./assets/star-active.svg";
          ideaList[i].altStar = "small red star";
      }
    }
    this.saveToLocalStorage;
  }

  spliceIdeaBox(event) {
      for (var i = 0; i < ideaList.length; i++) {
        if (event.target.classList.contains("delete-icon") &&
        (ideaList[i].id === parseInt(event.target.closest("article").id))) {
          ideaList.splice(i, 1);
      }
    }
  }

  updateComment(id) {
    console.log('5', ideaList)
    for (var i = 0; i < ideaList.length; i++) {
      if (ideaList[i].id === parseInt(id) && ideaList[i].isComment === true) {
        console.log('6')
        ideaList[i].isComment = false;
        ideaList[i].errorIcon = "./assets/comment.svg";
        ideaList[i].commentText = "Comment"
        ideaList[i].altErrorIcon = "comment icon";
      } else if (ideaList[i].id === parseInt(id) && ideaList[i].isComment === false){
        console.log('7')
        ideaList[i].isComment = true;
        ideaList[i].errorIcon = "./assets/error-icon.svg";
        ideaList[i].commentText = "Functionality coming soon"
        ideaList[i].altErrorIcon = "error icon functionality coming soon";
      }
    }
  }
  
}
