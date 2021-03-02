class Idea {
  constructor(title, input, urlStar, errorIconURL, commentText) {
    this.id = Date.now();
    this.title = title;
    this.text = input;
    this.isStar = false;
    this.urlStar = urlStar;
    this.altStar = "small white star";
    this.isComment = false;
    this.errorIconURL = errorIconURL;
    this.altErrorIcon = "comment icon"
    this.commentText = commentText;
  }
  
  updateIdeaList(newIdea) {   
    if (titleInput.value !== "" && textInput.value !== "") {
      ideaList.unshift(newIdea);
    }
  }

  generateFavoriteIdeaList() {
    var favoriteIdeaList = [];
    for (var i = 0; i < ideaList.length; i++) {
      if (ideaList[i].isStar === true) {
        favoriteIdeaList.push(ideaList[i]);
      }
    }
    renderFavoriteIdeaList(favoriteIdeaList)
  }

  updateIsStar(id) {
    console.log(ideaList)
    for (var i = 0; i < ideaList.length; i++) {
      if (ideaList[i].id === parseInt(id) && ideaList[i].isStar) {
       ideaList[i].isStar = false;
       ideaList[i].urlStar = "./assets/star.svg";
       ideaList[i].altStar = "small white star";
      } else if (ideaList[i].id === parseInt(id) && !ideaList[i].isStar) {
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

  updateIsComment(id) {
    for (var i = 0; i < ideaList.length; i++) {
      if (ideaList[i].id === parseInt(id) && ideaList[i].isComment) {
        ideaList[i].isComment = false;
        ideaList[i].errorIconURL = "./assets/comment.svg";
        ideaList[i].commentText = "Comment"
        ideaList[i].altErrorIcon = "comment icon";
      } else if (ideaList[i].id === parseInt(id) && !ideaList[i].isComment) {
        ideaList[i].isComment = true;
        ideaList[i].errorIconURL = "./assets/traffic sign-1.1s-200px.svg";
        ideaList[i].commentText = "Under construction"
        ideaList[i].altErrorIcon = "error icon functionality coming soon";
      }
    }
  }

  saveToLocalStorage() {
    if(ideaList.length === 0) {
      this.deleteFromLocalStorage();
    } else {
        var storedIdeaList = ideaList;
        var stringifiedIdeaList = JSON.stringify(storedIdeaList);
        localStorage.setItem("storedIdeaList", stringifiedIdeaList);
    }
  }

  getFromLocalStorage() {
    var parsedIdeaList;
    var retrievedIdeaList = localStorage.getItem("storedIdeaList");
    parsedIdeaList = JSON.parse(retrievedIdeaList);
    this.renderParsedList(parsedIdeaList);
  }

  renderParsedList(renderParsedIdeaList) {
    if(renderParsedIdeaList !== null) {
      for (var i = 0; i < renderParsedIdeaList.length; i++) {
        ideaList.push(renderParsedIdeaList[i]);
      }
    }
  }

  deleteFromLocalStorage() {
    localStorage.clear()
  }

}
