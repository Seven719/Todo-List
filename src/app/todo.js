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
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get completed() {
        return this._completed;
    }

    set completed(value) {
        this._completed = value;
    }
}
