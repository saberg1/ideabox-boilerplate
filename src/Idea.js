class Idea {
  constructor(title, input, url) {
    this.id = Date.now();
    this.title = title;
    this.text = input;
    this.url = url;
    this.isStar = false;
 }

  saveToStorage() {
    if(ideaList.length === 0) {
      this.deleteFromStorage(); 
    } else {
        var objectToStore = ideaList;
        var stringifiedObject = JSON.stringify(objectToStore);
        localStorage.setItem('somethingComplicated', stringifiedObject);
    }
  } 

  getFromStorage() {
    var retrievedObject = localStorage.getItem("somethingComplicated");
    parsedObject = JSON.parse(retreievedObject);
  }

  deleteFromStorage() {
    localStorage.clear()
  }

  updateIdea(id) {
    console.log(ideaList)
    for (var i = 0; i < ideaList.length; i++) {
      if (ideaList[i].id === parseInt(id) && ideaList[i].isStar === true) {
       ideaList[i].isStar = false;
       ideaList[i].url = "./assets/star.svg";
      } else if (ideaList[i].id === parseInt(id) && ideaList[i].isStar === false){
          ideaList[i].isStar = true;
          ideaList[i].url = "./assets/star-active.svg";
      }
    }
  }
}