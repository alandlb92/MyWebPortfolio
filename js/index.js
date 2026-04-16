var ProjectHtml;

function adjustContentMargin() {
    const h = document.querySelector("header").offsetHeight;
    contentWrapper.style.marginTop = h + "px";
}

async function OnStartMainPage() {
    console.log("Main page loaded");
    const module = await import("./MainContent.js");
    module.OnStart();
}


document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("Pages/Modules/MainContent.html");
        const html = await response.text();
        content.innerHTML = html;
        adjustContentMargin();
        window.addEventListener("resize", adjustContentMargin);
        OnStartMainPage();
    } catch (error) {
        console.error("Erro ao carregar HTML:", error);
    }
});