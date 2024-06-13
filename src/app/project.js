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
}

export class ProjectManager {
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
        this.setProjectList(projectList.filter(project => project.getId() !== deleteId));
    }
}
