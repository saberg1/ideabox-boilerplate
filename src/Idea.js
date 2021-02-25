class Idea {
  constructor(title, input, url) {
    this.id = Date.now();
    this.title = title;
    this.text = input;
    this.url = url;
    this.isStar = false;
 }
  saveToStorage() {
        //to be complated later
  }

  deleteFromStorage() {
    // to be updated later
  }

  updateIdea(id) {
    for (var i = 0; i < ideaList.length; i++) {
      if (ideaList[i].id === parseInt(id) && ideaList[i].isStar === true) {
        ideaList[i].isStar = false;
        ideaList[i].url = "./assets/star.svg";
      } else if (ideaList[i].id === parseInt(id) && ideaList[i].isStar === false) {
          ideaList[i].isStar = true;
          ideaList[i].url = "./assets/star-active.svg";
      }
    }
  }

}
