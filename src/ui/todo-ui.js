import Todo from "../app/todo";
import Trash from "../images/trash.svg"

const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("button-add-task")

const displayTodo = (todoItem, project) => {
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

    deleteBtn.addEventListener('click', () => deleteTodo(todo, project, todoItem))

    return todo;
}

const addTodoListener = (project) => {
    addTaskBtn.addEventListener("click", () => {
        let tmpTodo = new Todo(
            "title",
            "description",
            "12/8/2024",
            "High",
            "These are my notes",
        );
        project.addTodo(tmpTodo);
        updateTodos(project);
    })
};

const deleteTodo = (todo, project, todoItem) => {
    project.deleteTodo(todoItem);
    taskList.removeChild(todo);
}

const updateTodos = (project) => {
    taskList.innerHTML = "";

    project.todoList.forEach(todo => {
        taskList.append(displayTodo(todo, project));
    });
};

export const displayTodos = (project) => {
    taskList.innerHTML = "";
    addTodoListener(project);
}
