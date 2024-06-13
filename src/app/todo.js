import generateId from "./id";

export default class Todo {
    constructor (title, description, dueDate, priority, notes, checked) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._notes = notes;
        this._checked = checked;
        this._completed = completed;
        this._id = generateId();
    }
}
