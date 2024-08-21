import Todo from "../app/todo";
import Trash from "../images/trash.svg"

const form = document.querySelector("form");
const closeModal = document.getElementById("modal-close");
const modal = document.querySelector("dialog");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("button-add-task")

let project;

const displayTodo = (todoItem) => {
    const todo = document.createElement("button");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const deleteBtn = document.createElement("img");
    const taskDetails = document.createElement("div");
    const taskActions = document.createElement("div");

    taskDetails.classList.add("task-details");
    taskActions.classList.add("task-actions");

    checkbox.type = "checkbox";
    label.textContent = todoItem.title;
    taskDetails.append(checkbox, label);

    deleteBtn.src = Trash
    taskActions.append(deleteBtn);

    todo.classList.add("task");
    todo.append(taskDetails, taskActions);

    deleteBtn.addEventListener('click', () => deleteTodo(todo, todoItem))

    return todo;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = getValueById("title");
    const description = getValueById("description");
    const dueDate = getValueById("due-date");
    const priority = getValueById("priority");
    const notes = getValueById("notes");

    let todo = new Todo(
        title,
        description,
        dueDate,
        priority,
        notes,
    )

    project.addTodo(todo);
    updateTodos();

    modal.close();
    form.reset();
})

closeModal.addEventListener("click", (event) => {
    event.preventDefault();
    modal.close();
})

const addTodoListener = () => {
    addTaskBtn.addEventListener("click", () => {
        modal.showModal();
        modal.classList.add('show-modal');
    })
}

const deleteTodo = (todo, todoItem) => {
    project.deleteTodo(todoItem);
    taskList.removeChild(todo);
}

const updateTodos = () => {
    taskList.innerHTML = "";

    project.todoList.forEach(todo => {
        taskList.append(displayTodo(todo));
    })
}

export const displayTodos = (currentProject) => {
    project = currentProject;

    taskList.innerHTML = "";
    addTodoListener();
}

function getValueById(id) {
    return document.getElementById(id).value;
}
