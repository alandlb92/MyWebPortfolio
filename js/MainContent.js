var data;

export async function OnStart() {
    backButton.addEventListener("click", OnCloseProjectDetails);

    const cardResponse= await fetch("Pages/Modules/ProjectCard.html");
    const card = await cardResponse.text();

    const dataResponse = await fetch("js/Data/Data.json");
    data = await dataResponse.json();

    data.Projects.forEach((element, index) => {
        var cardWithData = card.replace("{title}", element.title).replace("{description}", element.description)
        .replace("{image}", element.image);
                
        var skills = "";
        element.skills.forEach(skill => {
            skills += `<span class="skill">${skill}</span>`;
        });

        cardWithData = cardWithData.replace("{skills}", skills);
        const wrapper = document.createElement("div");
        wrapper.innerHTML = cardWithData;
        
        const cardElement = wrapper.firstElementChild;
        cardElement.addEventListener("click", () => {
            OnClickProjectCard(index);
        });

        ProjectsContainer.appendChild(cardElement);
    });    
}

var lastScrollY = 0;

function OnClickProjectCard(projectIndex) {
    lastScrollY = window.scrollY;
    content.style.transform = `translateY(${-lastScrollY}px)`;
    window.scrollTo(0, 0);
    projectContent.innerHTML = "<h2>" + data.Projects[projectIndex].title + "</h2>";
    contentWrapper.style.transform = "translateX(0)";
    contentWrapper.style.height = 100 + "vh";
}

function OnCloseProjectDetails() {
    content.style.transform = `translateY(0px)`;
    contentWrapper.style.transform = "translateX(-50%)";
    contentWrapper.style.height = "auto";
    content.style.transform = `translateY(${0}px)`;
    window.scrollTo(0, lastScrollY);
}
