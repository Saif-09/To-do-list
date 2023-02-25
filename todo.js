//first of all we will create different functions for different tasks to be performed in app

let tasks = []; //this empty task array will store all the tasks data in this array
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');


function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="${task.id}" ${task.done? 'checked' : ' '} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="th.jpeg" class="delete" data-id="${task.id}" />`;
    tasksList.append(li);
}

function renderList() { 
    tasksList.innerHTML ='';


    for(let i=0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;
    saveTasksToLocalStorage();

} //this function will be used for rendering all the tasks

function saveTasksToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage(){
    const tasksFromLocalStorage  = localStorage.getItem('tasks');
    if(tasksFromLocalStorage){
        tasks = JSON.parse(tasksFromLocalStorage);
        renderList();
    }
}
function toggleTask(taskId) {
    const index = tasks.findIndex(function(task){
        return task.id === taskId;
    });
    if(index !== -1){
        const task = tasks[index];
        task.done = !task.done;
        renderList();
        showNotification("Task completed");
        return;
    }
    showNotification("Task not found");
 } //this function will be used for marking a task as completed, also this function takes task object as argument because when it will recv it then it can mark it as complete

function deleteTask(taskId) {
    const newTasks = tasks.filter(function(task){
        return (task.id!==taskId);
    });
    tasks = newTasks;
    renderList();
    showNotification('Tasks has been successfully deleted');
    saveTasksToLocalStorage();
 } //this function takes an taskId argument and delete the task that user want to delete

function addTask(task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added succesfully');
        saveTasksToLocalStorage();
        return;
    }
        showNotification('Something went wrong');
    
 } //this function will add tasks to the list or append new tasks

function showNotification(text) {
    alert(text);
 } // this function will show various notifications when adding a task or removing a task, or it can notify when someting is typed wrong or some error occurs or a success message

function handleInputKeypress(e){
    if(e.key==='Enter'){
        const text = e.target.value;

        if(!text){
            showNotification('Tasks text cannot be empty');
            return;
        }
        const task = {
            text: text,
            id: Date.now().toString(),
            done: false
        }
        e.target.value ="";
        addTask(task);
    }
 } //this function will handle the values that we are typing in the text box 

 function handleClickEvent(e) {
    const target = e.target;
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
    }else if (target.className==='custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
 }
 function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;
    document.body.append(notification);
    setTimeout(function(){
        notification.remove();
    }, 1800);
}
 function initializeApp(){
    getTasksFromLocalStorage();
addTaskInput.addEventListener('keyup', handleInputKeypress); //keyup is an event in JavaScript that is triggered when a key on the keyboard is released after being pressed down. In the given code, someFunction will be executed when the user releases a key on the keyboard while typing in the someId input field
document.addEventListener('click', handleClickEvent);//click is an event in JS that is triggered when someone clicks any where the event is linked with click.
 }
 initializeApp();

