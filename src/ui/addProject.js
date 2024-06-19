import iconPlay from "../images/play.svg";

const addProject = document.getElementById("button-add");
const projectsList = document.getElementById("projects-list");

let createProject = () => {
    let project = document.createElement('li');
    let button = document.createElement('button');
    let icon = document.createElement('img');
    let title = document.createElement('p');
    project.classList.add('project');
    title.textContent = "Untitled";
    icon.src = iconPlay;
    title.style.color = "grey";

    projectsList.append(project);
    project.append(button);
    button.append(icon, title);
}

addProject.addEventListener('click', () => {
    createProject();
})
