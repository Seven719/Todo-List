import { Project, ProjectsManager } from "../app/project";
import { displayProjectPage } from "./project-ui";

const manageProjects = new ProjectsManager();

const inbox = document.getElementById("button-inbox");
const today = document.getElementById("button-today");
const week = document.getElementById("button-week");

const inboxProject = new Project("Inbox");
const todayProject = new Project("Today");
const weekProject = new Project("This Week");

manageProjects.addProject(inboxProject);
manageProjects.addProject(todayProject);
manageProjects.addProject(weekProject);

inbox.addEventListener('click', () => displayProjectPage(inboxProject));
today.addEventListener('click', () => displayProjectPage(todayProject));
week.addEventListener('click', () => displayProjectPage(weekProject));

displayProjectPage(inboxProject);
