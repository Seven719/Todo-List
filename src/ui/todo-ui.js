import Todo from "../app/todo";
import Trash from "../images/trash.svg"

const todoList = document.getElementById("todo-list");
const addTodoBtn = document.getElementById("button-add-todo")
let project;

const displayTodo = (todoItem) => {
    const todo = document.createElement("button");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");

    const date = document.createElement("input");
    const deleteBtn = document.createElement("img");

    const todoLeft= document.createElement("div");
    const todoRight = document.createElement("div");

    todoLeft.classList.add("todo-left");
    todoRight.classList.add("todo-right");

    checkbox.type = "checkbox";
    label.textContent = todoItem.title;
    label.contentEditable = true;
    todoLeft.append(checkbox, label);

    date.type = "date";
    date.id = "due-date";
    date.value = todoItem.dueDate || "";

    deleteBtn.src = Trash;
    todoRight.append(date, deleteBtn);

    todo.classList.add("todo");
    todo.append(todoLeft, todoRight);

    label.addEventListener('input', () => {
        todoItem.title = label.textContent;
    });

    date.addEventListener('input', () => {
        todoItem.dueDate = date.value;
    });

    deleteBtn.addEventListener('click', () => deleteTodo(todo, todoItem))

    return todo;
}

addTodoBtn.addEventListener("click", () => {
    let tmpTodo = new Todo();

    project.addTodo(tmpTodo);
    updateTodos(project);

    const todoLabel = todoList.querySelector(".todo:last-child label");
    if (todoLabel) {
        todoLabel.focus();
    }
})

const deleteTodo = (todo, todoItem) => {
    project.deleteTodo(todoItem);
    todoList.removeChild(todo);
}

const updateTodos = () => {
    todoList.innerHTML = "";

    project.todoList.forEach(todo => {
        todoList.append(displayTodo(todo));
    })
}

export const displayTodos = (currentProject) => {
    project = currentProject;
    todoList.innerHTML = "";
}
