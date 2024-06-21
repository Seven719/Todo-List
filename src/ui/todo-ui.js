export let createTodo = (todoItem) => {
    let todo = document.createElement("div");
    let checkbox = document.createElement("input");
    let label = document.createElement("label");

    todo.classList.add("task");
    checkbox.type = "checkbox";
    label.textContent = todoItem.title;

    todo.append(checkbox, label);

    return todo;
}
