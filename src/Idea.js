class Idea {
  constructor(title, input, url) {
    this.id = Date.now();
    this.title = title;
    this.text = input;
    this.isStar = false;
    this.url = url;
    this.alt = "icon small white star";

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
       ideaList[i].url = "./assets/star.svg";
       ideaList[i].alt = "icon small white star";
      } else if (ideaList[i].id === parseInt(id) && ideaList[i].isStar === false){
          ideaList[i].isStar = true;
          ideaList[i].url = "./assets/star-active.svg";
          ideaList[i].alt = "icon small red star";
      }
    }
  }

  spliceIdeaBox(event) {
      for (var i = 0; i < ideaList.length; i++) {
        if (event.target.classList.contains("delete-icon") &&
        (ideaList[i].id === parseInt(event.target.closest("article").id))) {
          ideaList.splice(i, 1);
      }
    }
  }
  
}
