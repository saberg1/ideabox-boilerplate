class Idea {
  constructor(title, input, star) {
    this.id = Date.now();
    this.title = title;
    this.text = input;
    this.isStar = star || false;
 }
  saveToStorage() {
        //to be complated later
  }

  deleteFromStorage() {
    // to be updated later
  }

  updateIdea() {
    // update title/body/star state
    //reasign this.star to true
    // ideaList.unshift(newIdea)
    // ideaList.unshift(newIdea);
  }

  updateIsStar(index){
    if (this.isStar){
      this.isStar = false
    } else {
        this.isStar = true
    }
  }
}