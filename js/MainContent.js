export async function OnStart() {
    const cardResponse= await fetch("Pages/ProjectCard.html");
    const card = await cardResponse.text();

    const dataResponse = await fetch("js/Data/Data.json");
    const data = await dataResponse.json();

    var projectsContainer = document.getElementById("ProjectsContainer");

    data.Projects.forEach(element => {
        var cardWithData = card.replace("{title}", element.title).replace("{description}", element.description)
        .replace("{image}", element.image);
                
        var skills = "";
        element.skills.forEach(skill => {
            skills += `<span class="skill">${skill}</span>`;
        });

        cardWithData = cardWithData.replace("{skills}", skills);

        projectsContainer.innerHTML += cardWithData;
    });
}
