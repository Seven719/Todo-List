import generateId from "./id";

export default class Project {
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
}
