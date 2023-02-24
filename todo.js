//first of all we will create different functions for different tasks to be performed in app

let tasks = []; //this empty task array will store all the tasks data in this array
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="${task.id}" ${task.done? 'checked' : ' '} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <img src="bin.svg" class="delete" data-id="${task.id}" />`;
    tasksList.append(li);
}

function renderList(task) { 
    tasksList.innerHTML ='';


    for(let i=0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML = tasks.length;

} //this function will be used for rendering all the tasks

function toggleTask(taskId) {
    const task = tasks.filter(function(task){
        return task.id===taskId;
    });
    if(task.length>0){
        const currentTask = tasks[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification("Tasks completed");
        return;
    }
    showNotification("Task not completed");
 } //this function will be used for marking a task as completed, also this function takes task object as argument because when it will recv it then it can mark it as complete

function deleteTask(taskId) {
    const newTasks = tasks.filter(function(task){
        return (task.id!==taskId);
    });
    tasks = newTasks;
    renderList();
    showNotification('Tasks has been successfully deleted');
 } //this function takes an taskId argument and delete the task that user want to delete

function addTask(task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added succesfully');
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

addTaskInput.addEventListener('keyup', handleInputKeypress); //keyup is an event in JavaScript that is triggered when a key on the keyboard is released after being pressed down. In the given code, someFunction will be executed when the user releases a key on the keyboard while typing in the someId input field


