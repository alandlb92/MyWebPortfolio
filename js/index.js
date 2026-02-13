var ProjectHtml;


async function OnStartMainPage() {
    console.log("Main page loaded");
    const module = await import("./MainContent.js");
    module.OnStart();
    
    const ProjectHtmlResponse = await fetch("Pages/Modules/ProjectDetails.html");
    ProjectHtml = await ProjectHtmlResponse.text();
}


document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("Pages/Modules/MainContent.html");
        const html = await response.text();
        content.innerHTML = html;
        OnStartMainPage();
    } catch (error) {
        console.error("Erro ao carregar HTML:", error);
    }
});