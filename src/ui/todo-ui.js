import Todo from "../app/todo";

const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("button-add-task")

const displayTodo = (todoItem) => {
    const todo = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");

    todo.classList.add("task");
    checkbox.type = "checkbox";
    label.textContent = todoItem.title;

    todo.append(checkbox, label);

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

const updateTodos = (project) => {
    taskList.innerHTML = "";
    project.todoList.forEach(todo => {
        taskList.append(displayTodo(todo));
    });
};

export const displayTodos = (project) => {
    taskList.innerHTML = "";
    addTodoListener(project);
}
