const taskList = document.getElementById("task-list");

const createTodo = (todoItem) => {
    const todo = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");

    todo.classList.add("task");
    checkbox.type = "checkbox";
    label.textContent = todoItem.title;

    todo.append(checkbox, label);

    return todo;
}

export const displayTodos = (project) => {
    taskList.innerHTML = "";

    project.todoList.forEach(todo => {
        taskList.append(createTodo(todo));
    });
}
