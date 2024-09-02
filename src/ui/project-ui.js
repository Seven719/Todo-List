import { Project, ProjectsManager } from "../app/project";
import { displayTodos } from "./todo-ui";
import Trash from "../images/trash.svg";

const addProject = document.getElementById("button-add-project");
const projectsList = document.getElementById("projects-list");
let projectTitle = document.getElementById("project-title");

export const manageProjects = new ProjectsManager();

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
    const deleteBtn = document.createElement('img')

    deleteBtn.src = Trash;
    projectWrapper.classList.add('project');
    title.textContent = newProject.title;

    projectsList.append(projectWrapper);
    projectWrapper.append(project);
    project.append(title, deleteBtn);

    project.addEventListener('click', () => displayProjectPage(newProject));
    deleteBtn.addEventListener('click', () => deleteProject(newProject, projectWrapper))
}

const updateProjects = () => {
    projectsList.innerHTML = "";
    manageProjects.projectList.forEach((newProject) => {
        if (newProject.title !== "Today" && newProject.title !== "This Week" && newProject.title !== "Inbox") {
            initProjectUI(newProject);
        }
    });
}

updateProjects();

const renameProjectListener = (project) => {
    projectTitle.contentEditable = "true";

    if (project.title === "Inbox" || project.title === "Today" || project.title === "This Week") {
        projectTitle.contentEditable = "false";
        return
    }

    const updateTitle = () => {
        project.title = projectTitle.textContent;
        updateProjects();
        displayProjectPage(project);
    };

    const newProjectTitle = projectTitle.cloneNode(true);
    projectTitle.parentNode.replaceChild(newProjectTitle, projectTitle);
    projectTitle = newProjectTitle;

    newProjectTitle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            newProjectTitle.blur();
        }
    });

    projectTitle.addEventListener('blur', updateTitle);
}

const deleteProject = (project, projectWrapper) => {
    manageProjects.deleteProject(project);
    projectsList.removeChild(projectWrapper);
}

export const displayProjectPage = (project) => {
    projectTitle.textContent = project.title;
    renameProjectListener(project);

    if (project.title === "Today") {
        const todosToday = manageProjects.getTodoToday();
        displayTodos({ title: "Today", todoList: todosToday });
    } else if (project.title === "This Week") {
        const todosThisWeek = manageProjects.getTodosThisWeek();
        displayTodos({ title: "This Week", todoList: todosThisWeek });
    } else {
        displayTodos(project);
    }
}
