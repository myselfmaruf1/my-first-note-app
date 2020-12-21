// creating variables
let textElement;
let typedNote;
let listen;
let savedNotes;
let d;
let savedTime;
//Show saved notes
showNotes();
// get element of save button
listen = document.getElementById('savebutton');
console.log(listen);
// adding js event to save button
listen.addEventListener('click', function (e) {
    textElement = document.getElementById('floatingTextarea');
    typedNote = textElement.value; // store the text
    let noteStorage = localStorage.getItem('notes'); // get values of "notes" key
    if (noteStorage == null) {
        savedNotes = [];  // if null then create an array
    }
    else {
        savedNotes = JSON.parse(noteStorage); // string to array
    }
    // condtion for not to save empty note
    if (typedNote === "") {
        alert("Blank note can not be saved");
        return;
    }
    else {
        savedNotes.push(typedNote);
    }

    let timeStorage = localStorage.getItem('times');
    d = new Date();
    let t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    if (timeStorage == null) {
        savedTime = [];
    }
    else {
        savedTime = JSON.parse(timeStorage);
    }
    savedTime.push(t);
    timeStorage = JSON.stringify(savedTime);
    localStorage.setItem('times', timeStorage);
    // adasdaa
    noteStorage = JSON.stringify(savedNotes);
    localStorage.setItem('notes', noteStorage);
    textElement = "";
    showNotes();
    console.log(typedNote);
});
// function for viewing the notes
function showNotes() {
    let noteStorage = localStorage.getItem('notes'); // get values of "notes" key
    let timeStorage = localStorage.getItem('times');
    if (noteStorage == null) {
        savedNotes = [];  // if null then create an array
    }
    else {
        savedNotes = JSON.parse(noteStorage); // string to array
    }
    if (timeStorage == null) {
        savedTime = [];
    }
    else {
        savedTime = JSON.parse(timeStorage);
    }
    let position = document.getElementById('noteview');
    let htmlComponent = "";
    savedNotes.forEach(function (element, index) {
        htmlComponent += `<div class="notecard border border-success bg-light mx-2 my-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.slice(0,12)}...</h5>
          <h6 style="user-select:none">${savedTime[index]}</h6>
          <p class="card-text">${element}</p>
          <a id="${index}" onclick="deleteNote(this.id)" class="btn btn-outline-danger">Delete</a>
        </div>
      </div>`
    })
    if (savedNotes.length == 0) {
        position.innerHTML = `<div class="display-5 text-center" style="user-select:none;">Nothing Saved</div>`;
    }
    else {
        position.innerHTML = htmlComponent;  // add htmlComponents
    }
}
// Delete note
function deleteNote(index) {
    let noteStorage = localStorage.getItem('notes'); // get values of "notes" key
    let timeStorage = localStorage.getItem('times');
    if (noteStorage == null) {
        savedNotes = [];  // if null then create an array
    }
    else {
        savedNotes = JSON.parse(noteStorage); // string to array
    }
    if (timeStorage == null) {
        savedTime = [];
    }
    else {
        savedTime = JSON.parse(timeStorage);
    }
    savedTime.splice(index, 1);  // delete time from array
    timeStorage = JSON.stringify(savedTime);
    localStorage.setItem('times', timeStorage);
    console.log("deleted");
    savedNotes.splice(index, 1); // delete note from array
    noteStorage = JSON.stringify(savedNotes);
    localStorage.setItem('notes', noteStorage);
    showNotes();
}
// search keywords
let searchElement = document.getElementById('searchbox');
searchElement.addEventListener('input', function (e) {
    let searchText = searchElement.value;
    cardsElement = document.getElementsByClassName("notecard");
    Array.from(cardsElement).forEach(function(element){
        cardText = element.getElementsByTagName('p')[0].innerText;
        if(cardText.includes(searchText)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
});