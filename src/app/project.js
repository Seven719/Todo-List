import { isToday, toDate, isThisWeek, subDays } from "date-fns";
import generateId from "./id";
import Todo from "./todo";

export class Project {
    constructor (title) {
        this._title = title;
        this._todos = [];
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

    get todoList() {
        return this._todos;
    }

    set todoList(value) {
        this._todos = value;
        this.saveToLocalStorage()
    }

    deleteTodo(remove) {
        this.todoList = this.todoList.filter(todo => todo.id !== remove.id);
        this.saveToLocalStorage()
    }

    addTodo(todo) {
        this.todoList = [...this.todoList, todo];
        this.saveToLocalStorage()
    }

    saveToLocalStorage() {
        const projectsSaved = JSON.parse(localStorage.getItem('projectList')) || [];
        const index = projectsSaved.findIndex(project => project._id === this._id);

        if (index !== -1) {
            projectsSaved[index] = { ...projectsSaved[index], ...this };
        } else {
            projectsSaved.push(this);
        }

        localStorage.setItem('projectList', JSON.stringify(projectsSaved));
    }

}

export class ProjectsManager {
    constructor () {
        this._projectList = this.loadLocalStorage();
    }

    get projectList() {
        return this._projectList;
    }

    set projectList(value) {
        this._projectList = value;
        this.saveToLocalStorage()
    }

    deleteProject(remove) {
        remove.todoList.forEach(todo => {
            this.deleteTodoFromAllProjects(todo.id);
        });

        this.projectList = this.projectList.filter(project => project.id !== remove.id);
        this.saveToLocalStorage()
    }

    addProject(project) {
        this.projectList = [...this.projectList, project];
        this.saveToLocalStorage()
    }

    saveToLocalStorage() {
        localStorage.setItem('projectList', JSON.stringify(this.projectList));
    }

    loadLocalStorage() {
        const projectsSaved = JSON.parse(localStorage.getItem('projectList')) || [];
        return projectsSaved.map(projectData => {
            const project = Object.assign(new Project(), projectData);
            project._todos = projectData._todos.map(todoData => Object.assign(new Todo(), todoData));
            return project;
        });
    }

    getTodoToday() {
       return this._projectList.flatMap((project) => {
            return project.todoList.filter(todo => isToday(toDate(todo.dueDate)))
        })
    }

    getTodosThisWeek() {
        return this._projectList.flatMap((project) => {
            return project.todoList.filter(todo => isThisWeek(subDays(toDate(todo.dueDate), 1)))
        })
    }

    findProjectByTodoId(todoId) {
        return this._projectList.find(project =>
            project.todoList.some(todo => todo.id === todoId)
        );
    }

    deleteTodoFromAllProjects(todoId) {
        const project = this.findProjectByTodoId(todoId);
        if (project) {
            project.deleteTodo({ id: todoId });
            this.saveToLocalStorage();
        }
    }
}
