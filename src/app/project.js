import generateId from "./id";

export class Project {
    constructor (title) {
        this._title = title;
        this._todos = [];
        this._id = generateId();
    }

    getTitle() {
        return this._title;
    }

    setTitle(title) {
        this._title = title;
    }

    getId() {
        return this._id;
    }

    getTodoList() {
        return this._todos;
    }

    setTodoList(newList) {
        this._todos = newList;
    }

    deleteTodo(deleteId) {
        this.setTodoList(this.getTodoList().filter(todo => todo.getId() !== deleteId));
    }

    addTodo(newTodo) {
        this.setTodoList([...this.getTodoList(), newTodo]);
    }
}

export class ProjectsManager {
    constructor () {
        this._projectList = [];
    }

    getProjectList() {
        return this._projectList;
    }

    setProjectList(newList) {
        this._projectList = newList;
    }

    deleteProject(deleteId) {
        this.setProjectList(this.getProjectList().filter(project => project.getId() !== deleteId));
    }

    addProject(newProject) {
        this.setProjectList([...this.getProjectList(), newProject]);
    }
}
