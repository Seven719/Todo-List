import generateId from "./id";

export default class Todo {
    constructor (title, dueDate) {
        this._title = title;
        this._dueDate = dueDate;
        this._id = generateId();
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get id() {
        return this._id;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = value;
    }
}
