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
}

function handleAddTodo() {
    let tmpTodo = new Todo();
    activeProject.addTodo(tmpTodo);
    updateTodoPage(activeProject);
}

const createTodoDOM = (todoItem, project) => {
    const todo = document.createElement("button");

    const todoMain = document.createElement("div");
    const todoLeft= document.createElement("div");
    const todoRight = document.createElement("div");

    const priority = createPriorityDropdown(todoItem, "high", "medium", "low");
    const description = createDescription(todoItem);

    const title = createTitle(todoItem);
    const checkbox = createCheckbox(todoItem, title);
    const details = createDetails(priority, description);

    const dueDate = createDueDate(todoItem);
    const deleteBtn = createDeleteBtn(todo, todoItem, project);

    todo.classList.add("todo");
    todo.append(todoMain);

    todoMain.classList.add("todo-main");
    todoMain.append(todoLeft, todoRight);

    todoLeft.classList.add("todo-left");
    todoRight.classList.add("todo-right");
    todoLeft.append(checkbox, title);
    todoRight.append(dueDate, deleteBtn);

    toggleDetails(todo, details);
    removeOverlappingEventListener(checkbox, title, dueDate, deleteBtn, priority, description);

    manageTodoListeners(todoItem,
        checkbox,
        title,
        dueDate,
        deleteBtn,
        priority,
        description
    );

    return todo;
}

const createDeleteBtn = (todo, todoItem, project) => {
    const deleteBtn = document.createElement("img");

    deleteBtn.src = Trash;

    deleteBtn.addEventListener('click', () => deleteTodo(todo, todoItem, project))

    return deleteBtn;
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

        addListenersForProperties(todoItem, 'click', [temp, 'priority']);
    });

    return priority;
}

const createDescription = (todoItem) => {
    const description = document.createElement("textarea");

    description.value = "";
    if (todoItem.description != undefined) {
        description.value = todoItem.description;
    }
    description.placeholder = "Description...";

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

    return checkbox
}

const createTitle = (todoItem) => {
    const title = document.createElement("input");

    title.placeholder = "Enter something...";
    if (todoItem.title == undefined) {
        title.value = "";
    } else {
        title.value = todoItem.title;
    }

    return title
}

const createDueDate = (todoItem) => {
    const dueDate = document.createElement("input");

    dueDate.type = "date";
    dueDate.id = "due-date";
    dueDate.value = todoItem.dueDate || "";

    return dueDate;
}

const createDetails = (priority, description) => {
    const details = document.createElement("div");

    details.classList.add("todo-details");
    details.append(priority, description);

    return details;
}

const toggleDetails = (todo, details) => {
    todo.addEventListener('click', () => {
        if (todo.contains(details)) {
            todo.removeChild(details);
        } else {
            todo.appendChild(details);
        }
    });
}

const addListenersForProperties = (todoItem, eventType, ...entries) => {
    entries.forEach(([element, property]) => {
        element.addEventListener(eventType, () => {
            todoItem[property] = element.value;
        });
    });
}


const manageTodoListeners = (todoItem,
    checkbox,
    title,
    dueDate,
    deleteBtn,
    priority,
    description
) => {

    title.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            title.blur();
        }
    });

    checkbox.addEventListener('click', () => {
        if (checkbox.checked == true){
            title.style.textDecoration = "line-through";
        } else {
            title.style.textDecoration = "none";
        }
        todoItem.completed = checkbox.checked;
    })

    addListenersForProperties(
        todoItem,
        'input',
        [description, 'description'],
        [dueDate, 'dueDate'],
        [title, 'title'],
    );

    removeOverlappingEventListener(checkbox, title, dueDate, deleteBtn, priority, description);
}
