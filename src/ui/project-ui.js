import { Project, ProjectsManager } from "../app/project";
import Todo from "../app/todo";
import { createTodo } from "./todo-ui";

const addProject = document.getElementById("button-add");
const projectsList = document.getElementById("projects-list");
const projectTitle = document.getElementById("project-title");
const taskList = document.getElementById("task-list");

const manageProjects = new ProjectsManager();

addProject.addEventListener('click', () => {
    createProject();
});

let createProject = () => {
    let newProject = new Project("Untitled");
    manageProjects.addProject(newProject);
    projectsList.innerHTML = "";

    displayProjects();
}

let initProjectUI = (newProject) => {
    let projectWrapper = document.createElement('li');
    let project = document.createElement('button');
    let title = document.createElement('p');

    projectWrapper.classList.add('project');
    title.textContent = newProject.title;

    projectsList.append(projectWrapper);
    projectWrapper.append(project);
    project.append(title);

    return project;
}

let displayProjects = () => {
    manageProjects.projectList.forEach(newProject => {
        let project = initProjectUI(newProject);

        project.addEventListener('click', () => {
            displayProjectPage(newProject);
        })
    });
}

let displayProjectPage = (project) => {
    projectTitle.textContent = project.title;
    taskList.textContent = "";

    project.todoList.forEach(todo => {
        taskList.append(createTodo(todo));
    });
}
