var data;

export async function OnStart() {
    backButton.addEventListener("click", OnCloseProjectDetails);

    const cardResponse = await fetch("Pages/Modules/ProjectCard.html");
    const card = await cardResponse.text();

    const dataResponse = await fetch("js/Data/Data.json");
    data = await dataResponse.json();

    var categories = {};

    var AllSkills = [];
    data.Projects.forEach((element, index) => {
        if (!categories[element.category]) {
            var newCategory = document.createElement("div");
            newCategory.className = "projectCards";

            var categoryTitle = document.createElement("h3");
            categoryTitle.className = "SubTittle";
            categoryTitle.textContent = element.category;

            var container = document.createElement("div");
            container.appendChild(categoryTitle);
            container.appendChild(newCategory);

            ProjectsContainer.appendChild(container);

            categories[element.category] = newCategory;
        }

        var categoryContainer = categories[element.category];

        var cardWithData = card.replace("{title}", element.title).replace("{description}", element.description)
            .replace("{image}", element.image);

        var skills = "";
        element.skills.forEach(skill => {
            skills += `<span class="projectSkill">${skill}</span>`;
            if (!AllSkills.includes(skill)) {
                AllSkills.push(skill);
            }
        });

        cardWithData = cardWithData.replace("{skills}", skills);
        const wrapper = document.createElement("div");
        wrapper.innerHTML = cardWithData;

        const cardElement = wrapper.firstElementChild;
        cardElement.addEventListener("click", () => {
            OnClickProjectCard(index, skills);
        });
        const githubElement = cardElement.querySelector("#github-available");
        if (element.GithubLink != undefined && element.GithubLink != "") {
            githubElement.style.display = "block";
        } else {
            githubElement.style.display = "none";
        }

        categoryContainer.appendChild(cardElement);
        data.Projects[index].CardElement = cardElement;
    });


    CreateFilters(AllSkills);
    AddWorkExperiences();
}

async function AddWorkExperiences() {
    var workExpHTML = await fetch("Pages/Modules/WorkExperienceCard.html");
    var workExpContent = await workExpHTML.text();
    var workExpInnerHTML = "";
    data.WorkExperiences.forEach((element) => {
        workExpInnerHTML += workExpContent.replace("{title}", element.title)
            .replace("{company}", element.company)
            .replace("{period}", element.period)
            .replace("{description}", element.description);
    });
    WorkExperiences.innerHTML = workExpInnerHTML;
}

var lastScrollY = 0;

async function OnClickProjectCard(projectIndex, skills) {
    if (data.Projects[projectIndex].htmlpath != undefined && data.Projects[projectIndex].htmlpath != "") {
        var projectContentResponse = await fetch(data.Projects[projectIndex].htmlpath);
        var projectContentHTML = await projectContentResponse.text();
        projectDetailsAdditionalHTML.innerHTML = projectContentHTML;
    }
    else {
        projectDetailsAdditionalHTML.innerHTML = "";
    }

    if (data.Projects[projectIndex].Roles != undefined && data.Projects[projectIndex].Roles.length > 0) {
        var rolesHTML = "";
        data.Projects[projectIndex].Roles.forEach(role => {
            rolesHTML += `${role} <br>`;
        });

        Roles.innerHTML = rolesHTML;
        Roles.style.display = "block";
    } else {
        Roles.style.display = "none";
    }

    if (data.Projects[projectIndex].GithubLink != undefined && data.Projects[projectIndex].GithubLink != "") {
        ProjectGithub.href = data.Projects[projectIndex].GithubLink;
        ProjectGithub.style.display = "flex";
    } else {
        ProjectGithub.style.display = "none";
    }

    lastScrollY = window.scrollY;
    content.style.transform = `translateY(${-lastScrollY}px)`;
    window.scrollTo(0, 0);
    projectDetailsImg.src = data.Projects[projectIndex].image;
    projectDetailsTitle.textContent = data.Projects[projectIndex].title;
    AboutProjectText.textContent = data.Projects[projectIndex].about;
    AboutSkillsContainer.innerHTML = skills;
    if (data.Projects[projectIndex].projectLink) {
        ProjectWebSite.href = data.Projects[projectIndex].projectLink;
        ProjectWebSite.style.display = "flex";
    } else {
        ProjectWebSite.style.display = "none";
    }
    contentWrapper.style.transform = "translateX(0)";
    projectContent.style.transform = `translateX(0)`;
    contentWrapper.style.height = projectContent.offsetHeight + 100 + "px";
}

function OnCloseProjectDetails() {
    contentWrapper.style.transform = "translateX(-50%)";
    contentWrapper.style.height = "auto";
    content.style.transform = `translateY(${0}px)`;
    window.scrollTo(0, lastScrollY);
    projectContent.style.transform = `translateY(${lastScrollY}px)`;
}

var filterMap = {};
var filterElemetList = [];
function CreateFilters(AllSkills) {
    AllSkills.forEach(skill => {
        var filterElement = document.createElement("span");
        filterElement.className = "skill";
        filterElement.textContent = skill;
        filterElement.addEventListener("click", () => {
            RefreshFilters(skill);
        });
        Filter.appendChild(filterElement);
        filterMap[skill] = filterElement;
        filterElemetList.push(filterElement);
    });
}

var filters = [];
function RefreshFilters(skill) {
    if (filters.includes(skill)) {
        filters.splice(filters.indexOf(skill), 1);
    } else {
        filters.push(skill);
    }

    data.Projects.forEach(project => {
        if (filters.length === 0) {
            project.CardElement.style.display = "block";
            return;
        }

        const matches = filters.some(filter =>
            project.skills.includes(filter)
        );

        project.CardElement.style.display = matches ? "block" : "none";
    });

    filterElemetList.forEach(filter => {
        if (filters.includes(filter.textContent)) {
            filter.classList.add("SelectedFilter");
        } else {
            filter.classList.remove("SelectedFilter");
        }
    });
}