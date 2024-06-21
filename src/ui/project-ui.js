import { Project, ProjectsManager } from "../app/project";
import { displayTodos } from "./todo-ui";

const addProject = document.getElementById("button-add");
const projectsList = document.getElementById("projects-list");
const projectTitle = document.getElementById("project-title");

const manageProjects = new ProjectsManager();

addProject.addEventListener('click', () => {
    createProject();
});

const createProject = () => {
    const newProject = new Project("Untitled");
    manageProjects.addProject(newProject);
    updateProjects();
}

const initProjectUI = (newProject) => {
    const projectWrapper = document.createElement('li');
    const project = document.createElement('button');
    const title = document.createElement('p');

    projectWrapper.classList.add('project');
    title.textContent = newProject.title;

    projectsList.append(projectWrapper);
    projectWrapper.append(project);
    project.append(title);

    project.addEventListener('click', () => displayProjectPage(newProject));
}

const updateProjects = () => {
    projectsList.innerHTML = "";
    manageProjects.projectList.forEach(initProjectUI);
}

const displayProjectPage = (project) => {
    projectTitle.textContent = project.title;
    displayTodos(project);
}
