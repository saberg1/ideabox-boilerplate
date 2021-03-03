## Title: IdeaBox

A [Front-End Project] by: [Steven Berg](https://github.com/saberg1)
                          [Steve Calla](https://github.com/stevecalla)
                          [Beth Meeker](https://github.com/Meekb)

* Project Manager: [Hannah Hudson](https://github.com/hannahhch)

## Index

=======
## Title: Self Care Center

A [Front-End Project] by [Steve Calla](https://github.com/stevecalla)

* Project Manager: [Hannah Hudson](https://github.com/hannahhch)

## Index

1. [Overview](#overview)
2. [Functionality](#functionality)
3. [Iterations](#iterations)
4. [Technologies](#technologies)
5. [Contributors](#contributors)
6. [Resources](#resources)

## Overview

IdeaBox is a website that allows users to document and store all of their ideas in one place. Each idea is titled by the user and placed into localStorage to reload anytime they revisit from their machine. Ideas can be favorited, filtered, and searched making it much easier to recall that one really random idea from last Thursday.

## Website Preview - Basic Functionality

<img src="https://media.giphy.com/media/epFOPwS01PDepSVZNF/giphy.gif" width="100%" height="500"/>

## Website Preview - Responsive View

<img src="https://media.giphy.com/media/cT2SW5d23PDwQS2MQM/giphy.gif" height="500"/>

## Main Page View

<img width="1436" alt="Screen Shot 2021-03-02 at 4 20 59 PM" src="https://user-images.githubusercontent.com/76264735/109728580-c1ee2f80-7b73-11eb-9ced-daf0acc3ddfa.png">

## Functionality

* Desktop Layout:
    * Forms for Title and Body.
    * Some mobile responsiveness.

* Architecture:
    * Data Model and DOM are separate entities.
    * idea.js contains the Idea class and methods, main.js file that contains the DOM related JavaScript.

* Adding Ideas:
    * Ideas added with Title and Body input forms, then clicking the Save button.
    * New idea cards are populated into the idea list grid below the forms.
    * Input fields are cleared when the Save button is clicked.
    * If the Title or Body fields are blank, the Save button is inactive.
    * No page reload when new ideas are created.

* Favoriting & Deleting Ideas:
    * The delete button on an idea card will be permanently remove the idea from view.
    * Favorite an idea by clicking the white star on the idea card - the star will turn red.
    * Un-favorite an idea by clicking the red star on the idea card - the star will turn back to white.

* Local Storage & Filtering:
    * When an idea is saved, the instance of the Idea class is saved into localStorage.
    * Favorite ideas will remain in the favorited state - red star.
    * Show Starred Ideas button will display only the favorited ideas, without a page refresh.
    * The button will now say Show All Ideas. When clicked, all ideas are displayed.
    * Search and filter through the idea cards using the Search Ideas search bar.

* Future Enhancements:
    * Idea card comments.
    * Enhanced validation for input forms.
    * Enhance Under Construction message to disappear after few moments.
    * More robust media query for screen responsiveness.

* Known Issues/Bugs:
    * None at this time.

## Technologies

1. HTML
2. CSS
3. JavaScript
4. GitHub (website hosting and source code management)

## Contributors

* Creators: [Steven Berg](https://github.com/saberg1)
            [Steve Calla](https://github.com/stevecalla)
            [Beth Meeker](https://github.com/Meekb)

* Project Manager: [Hannah Hudson](https://github.com/hannahhch)

## Resources
* Project Description: https://frontend.turing.io/projects/module-1/ideabox-group.html
* GitHub Repo: https://github.com/saberg1/ideabox-boilerplate.git
* GitHub Hosted URL: https://saberg1.github.io/ideabox-boilerplate/

