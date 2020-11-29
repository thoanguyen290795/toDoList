//Import lớp đối tượng 
import { ToDo } from './todo.js';
import { ToDoList } from './todoList.js';
let toDoList = new ToDoList();
let completeList = new ToDoList();
// hàm rút gọn lấy  ID 
function getID(id) {
    return document.getElementById(id);
}
//lấy dữ liệu value 

//hàm thêm todo 
const addToDo = () => {
    let txtToDo = getID("newTask").value;
    let ulToDo = getID("todo");
    if (txtToDo !== "") {
        let td = new ToDo(txtToDo, "todo");
        toDoList.addToDo(td);
    }
    //gọi hàm 
    showToDoList(ulToDo);
    getID("newTask").value = "";
}
getID("addItem").addEventListener("click", () => {
    addToDo();
});
//hàm hiện thị todo 
//khai báo hàm 
const showToDoList = (ulToDo) => {
    ulToDo.innerHTML = toDoList.renderToDo();
}
const showCompleteList = (ulCompleted) => {
    ulCompleted.innerHTML = completeList.renderToDo();
}
//hàm delete todo 
const deleteTodo = (e) => {
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getID("todo");
    let ulCompleted = getID("completed");
    if (status == "todo") {
        toDoList.removeToDo(tdIndex);
        showToDoList(ulToDo);
    } else if (status == "completed") {
        completeList.removeToDo(tdIndex);
        showToDoList(ulCompleted);
    } else {
        alert("Cannot delete todo item !");
    }

}
window.deleteTodo = deleteTodo;

const completeToDo = (e) => {
    let tdIndex = e.currentTarget.getAttribute("data-index");
    let status = e.currentTarget.getAttribute("data-status");
    let ulToDo = getID("todo");
    let ulCompleted = getID("completed");
    if (status == "todo") {
        let completedItem = toDoList.tdList.slice(tdIndex, tdIndex + 1);
        let objToDo = new ToDo(completedItem[0].textTodo, "completed");
        moveToDo(toDoList, completeList, objToDo, tdIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
    } else if (status == "completed") {
        let undoItem = completeList.tdList.slice(tdIndex, tdIndex + 1);
        let objToDo = new ToDo(undoItem[0].textTodo, "todo");
        moveToDo(completeList, toDoList, objToDo, tdIndex);
        showToDoList(ulToDo);
        showCompleteList(ulCompleted);
    } else {
        alert("Cannot move todo item !");
    }
}
window.completeToDo = completeToDo;

const moveToDo = (depart, arrival, obj, tdIndex) => {
    //Remove todo from depart
    depart.removeToDo(tdIndex);
    //Add todo completed to arrival    
    arrival.addToDo(obj);
}
const sortASC = () => {
    let ulToDo = getID("todo");
    toDoList.sortToDoList(false);
    showToDoList(ulToDo);
}
window.sortASC = sortASC;

const sortDES = () => {
    let ulToDo = getID("todo");
    toDoList.sortToDoList(true);
    showToDoList(ulToDo);
}

window.sortDES = sortDES;


