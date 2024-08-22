import Todo from "../app/todo";
import Trash from "../images/trash.svg"

const todoList = document.getElementById("todo-list");
let activeProject;

export const displayTodos = (project) => {
    activeProject = project;
    updateTodoPage(project);
    addTodoListener();
};

const updateTodoPage = (project) => {
    todoList.innerHTML = "";

    project.todoList.forEach(todo => {
        todoList.append(createTodoDOM(todo, project));
    });
}

const addTodoListener = () => {
    const addTodoBtn = document.getElementById("button-add-todo");

    if (addTodoBtn) {
        addTodoBtn.removeEventListener("click", handleAddTodo);
        addTodoBtn.addEventListener("click", handleAddTodo);
    }
};

function handleAddTodo() {
    let tmpTodo = new Todo();
    activeProject.addTodo(tmpTodo);
    updateTodoPage(activeProject);
}

const createTodoDOM = (todoItem, project) => {
    const todo = document.createElement("button");
    const checkbox = document.createElement("input");
    const title = document.createElement("input");

    const date = document.createElement("input");
    const deleteBtn = document.createElement("img");

    const todoLeft= document.createElement("div");
    const todoRight = document.createElement("div");

    todoLeft.classList.add("todo-left");
    todoRight.classList.add("todo-right");

    checkbox.type = "checkbox";

    title.placeholder = "Enter something...";
    if (todoItem.title == undefined) {
        title.value = "";
    } else {
        title.value = todoItem.title;
    }

    todoLeft.append(checkbox, title);

    date.type = "date";
    date.id = "due-date";
    date.value = todoItem.dueDate || "";

    deleteBtn.src = Trash;
    todoRight.append(date, deleteBtn);

    todo.classList.add("todo");
    todo.append(todoLeft, todoRight);

    checkbox.addEventListener('click', () => {
        if (checkbox.checked == true){
            title.style.textDecoration = "line-through";
        } else {
            title.style.textDecoration = "none";
        }
    })

    title.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            todoItem.title = title.value;
            title.blur();
        }
    });

    date.addEventListener('input', () => {
        todoItem.dueDate = date.value;
    });

    deleteBtn.addEventListener('click', () => deleteTodo(todo, todoItem, project))

    return todo;
}

const deleteTodo = (todo, todoItem, project) => {
    project.deleteTodo(todoItem);
    todoList.removeChild(todo);
}
