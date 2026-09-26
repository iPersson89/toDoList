const listItems = [];

const inputList = document.querySelector("#inputList");
const addBtn = document.querySelector("#addBtn");
const toDoList = document.querySelector("#toDoList");
const completedList = document.querySelector(".completedList")
const numberCompleted = document.querySelector("#numberCompleted")
let completedToDo = 0;

// Funktion som lägger till items i toDoList
addBtn.addEventListener("click", function(){

let itemObject = {
text: inputList.value,
completed: false
};

listItems.push(itemObject);

let newListItem = document.createElement('li');
newListItem.textContent = inputList.value;
newListItem.classList.add("toDo-item");

// Skapar suoptunna och tabortfunktion
const trash = document.createElement("span");
trash.classList.add("trashBtn")
trash.innerHTML = "  &#128465";


//Tar bort items
trash.addEventListener("click", function(event) {
    const index = listItems.indexOf(itemObject);
    listItems.splice(index, 1);
    
//Räknar enbart neråt om en item markerad om completed tas bort
    if (itemObject.completed){
    completedToDo--;
    numberCompleted.textContent = `${completedToDo} completed`;
    }
    newListItem.remove();
});

newListItem.appendChild(trash);

toDoList.appendChild(newListItem);
inputList.value = "";

});

// Flyttar items ifrån toDolist till completedList vid klick
toDoList.addEventListener("click", function(event) {
    
    if (event.target.classList.contains("toDo-item")) {
        const clickedElement = event.target;
        //Letar redar på item i arrayn + startsWith används för att den ska hitta texten utan att störas av sopkorgen
        const item = listItems.find(i => clickedElement.textContent.startsWith(i.text) && !i.completed);
        //Ändar objectet status ifrån false till true
        if (item) {
            item.completed = true;
        }
    
        completedList.appendChild(clickedElement);
       
    
        //Räknar antal completed items
        completedToDo++;
        numberCompleted.textContent = `${completedToDo} completed`;
    }
});

// Som koden i todoList fast från completedList tillbaka till toDoList
completedList.addEventListener("click", function(event) {
    
   
    if (event.target.classList.contains("toDo-item")) {
        const clickedElement = event.target;
       
        const item = listItems.find(i => clickedElement.textContent.startsWith(i.text) && i.completed);
        if (item) {
            item.completed = false;
        }

        toDoList.appendChild(clickedElement);
        
        completedToDo--;
        numberCompleted.textContent = `${completedToDo} completed`;
        
    } 

}); 

