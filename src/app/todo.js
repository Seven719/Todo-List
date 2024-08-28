import generateId from "./id";

export default class Todo {
    constructor (title, description, dueDate, priority) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = false;
        this._id = generateId();
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
        this.saveToLocalStorage()
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
        this.saveToLocalStorage()
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = value;
        this.saveToLocalStorage()
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
        this.saveToLocalStorage()
    }

    get completed() {
        return this._completed;
    }

    set completed(value) {
        this._completed = value;
        this.saveToLocalStorage()
    }

    saveToLocalStorage() {
        const projectsSaved = JSON.parse(localStorage.getItem('projectList')) || [];
        const indexProject = projectsSaved.findIndex(project =>
            project._todos.some(todo => todo._id === this._id)
        );

        if (indexProject !== -1) {
            const indexTodo = projectsSaved[indexProject]._todos.findIndex(todo => todo._id === this._id);

            if (indexTodo !== -1) {
                projectsSaved[indexProject]._todos[indexTodo] = {
                    ...projectsSaved[indexProject]._todos[indexTodo],
                    ...this
                };
            } else {
                projectsSaved[indexProject]._todos.push(this);
            }
        } else {
            projectsSaved.push({_todos: [this] });
        }

        localStorage.setItem('projectList', JSON.stringify(projectsSaved));
    }
}
