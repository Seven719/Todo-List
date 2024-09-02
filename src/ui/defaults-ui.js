import { Project } from "../app/project";
import { displayProjectPage } from "./project-ui";
import { manageProjects } from "./project-ui";

const inbox = document.getElementById("button-inbox");
const today = document.getElementById("button-today");
const week = document.getElementById("button-week");

let inboxProject = manageProjects.projectList.find(p => p.title === "Inbox");
let todayProject = manageProjects.projectList.find(p => p.title === "Today");
let weekProject = manageProjects.projectList.find(p => p.title === "This Week");

if (!inboxProject) {
    inboxProject = new Project("Inbox");
    manageProjects.addProject(inboxProject);
}

if (!todayProject) {
    todayProject = new Project("Today");
    manageProjects.addProject(todayProject);
}

if (!weekProject) {
    weekProject = new Project("This Week");
    manageProjects.addProject(weekProject);
}

inbox.addEventListener('click', () => displayProjectPage(inboxProject));
today.addEventListener('click', () => displayProjectPage(todayProject));
week.addEventListener('click', () => displayProjectPage(weekProject));

manageProjects.projectList.forEach(project => {
    if (project.title === "Inbox") {
        displayProjectPage(project);
    }
})
