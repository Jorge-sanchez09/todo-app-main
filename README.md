# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)


## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![](./screenshot.png)

### Links

- Live Site URL: [Add live site URL here](https://kriosaber.github.io/todo-app-main/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- JavaScript

### What I learned

During this challenge I remembered things about JavaScript Local Storage and Drag and Drop APIs, on which the main functionality of this project depended. The tasks sorting using Drag and Drop ended up a little buggy. I could have used a JS library for this since I found a few when I was looking for suggestions, but I wanted to give vanilla code a try first and see what I can improve

```js for the sorting
todoListEl.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    const draggingItem = todoListEl.querySelector('.dragging');
    const tasksItems = Array.from(todoListEl.children).filter(task => task !== draggingItem);

    let nextSibling = tasksItems.find(sibling => e.clientY <= sibling.getBoundingClientRect().y);

    todoListEl.insertBefore(draggingItem, nextSibling);
});
```

### Continued development

I'd like to learn more details about how to manipulate the DOM using coordinates, because it was useful to make the sorting with methods like getBoundingClientRect()


### Useful resources

- [Draggable List in JavaScript](https://www.youtube.com/watch?v=9HUlUnM3UG8&t=669s) - At first I watched this video for the tasks sorting, but later I made some changes because it wasn't working well enough for me. However, it still serves as a good example of how to implement this functionality with minimal code

## Author

- Frontend Mentor - [@Kriosaber](https://www.frontendmentor.io/profile/Kriosaber)