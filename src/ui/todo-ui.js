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

    const todoMain = document.createElement("div");

    const title = document.createElement("input");
    const checkbox = createCheckbox(todoItem, title);
    const details = document.createElement("div");

    const priority = createPriorityDropdown(todoItem, "high", "medium", "low");
    const description = createDescription(todoItem);

    const date = document.createElement("input");
    const deleteBtn = document.createElement("img");

    const todoLeft= document.createElement("div");
    const todoRight = document.createElement("div");

    todoMain.classList.add("todo-main");

    details.classList.add("todo-details");
    details.append(priority, description);

    todoLeft.classList.add("todo-left");
    todoRight.classList.add("todo-right");



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
    todoMain.append(todoLeft, todoRight);
    todo.append(todoMain);


    title.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            title.blur();
        }
    });

    title.addEventListener('input', () => {
        todoItem.title = title.value;
    });

    date.addEventListener('input', () => {
        todoItem.dueDate = date.value;
    });

    description.addEventListener('input', () => {
        todoItem.description = description.value;
    });

    todo.addEventListener('click', () => {
        if (todo.contains(details)) {
            todo.removeChild(details);
        } else {
            todo.appendChild(details);
        }
    });

    removeOverlappingEventListener(checkbox, title, date, deleteBtn, priority, description);
    deleteBtn.addEventListener('click', () => deleteTodo(todo, todoItem, project))

    return todo;
}

const deleteTodo = (todo, todoItem, project) => {
    project.deleteTodo(todoItem);
    todoList.removeChild(todo);
}

const removeOverlappingEventListener = (...elements) => {
    elements.forEach(element => {
        element.addEventListener('click', (event) => {
            event.stopPropagation();
        })
    });
}

const createPriorityDropdown = (todoItem, ...values) => {
    const priority = document.createElement("select");
    priority.name = "Priority";

    values.forEach(element => {
        let temp = document.createElement("option");

        temp.value = element;

        if (todoItem.priority == temp.value) {
            temp.selected = true;
        }

        temp.textContent = element.charAt(0).toUpperCase() + element.slice(1);
        priority.appendChild(temp);

        temp.addEventListener('click', () => {
            todoItem.priority = temp.value;
        });
    });

    priority.style.width = "10%";

    return priority;
}

const createDescription = (todoItem) => {
    const description = document.createElement("textarea");

    if (todoItem.description == undefined) {
        description.value = "";
    } else {
        description.value = todoItem.description;
    }

    description.placeholder = "Description...";

    description.style.resize = "vertical";
    description.style.minHeight = "80px";

    return description;
}

const createCheckbox = (todoItem, title) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.checked = todoItem.completed;
    if (checkbox.checked == true){
        title.style.textDecoration = "line-through";
    } else {
        title.style.textDecoration = "none";
    }

    checkbox.addEventListener('click', () => {
        if (checkbox.checked == true){
            title.style.textDecoration = "line-through";
        } else {
            title.style.textDecoration = "none";
        }
        todoItem.completed = checkbox.checked;
    })

    return checkbox
}
