// when a user submit to-do list, it will save in the localstroage
// its going to be in the "list" format
// add / delete to-do list 

const toDoForm= document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

let toDos = [];
// const and let are both variables; however, the only difference is that let can be changed. 

const TODOS_KEY = "todos";

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
    const deleteLi = event.target.parentElement; 
    toDos = toDos.filter(todo => todo.id !== parseInt(deleteLi.id));
    saveToDos();
    deleteLi.remove();
}

function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;

    const span = document.createElement("span");
    span.innerText = newTodo.text; 
    //make element called span and write text in span 
    const button = document.createElement("button");
    button.innerText = "x";

    button.addEventListener("click",deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){ //paint, save and delete 
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text:newTodo,
        id: Date.now(), 
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit); 

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos); 
    toDos = parsedToDos; 
    parsedToDos.forEach(paintToDo);

}
