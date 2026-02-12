function OnStartMainPage() {
    console.log("Main page loaded");
}


document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("Pages/MainContent.html");
        const html = await response.text();
        document.getElementById("content").innerHTML = html;

        const module = await import("./MainContent.js");
        module.OnStart(); // se exportar isso
    } catch (error) {
        console.error("Erro ao carregar HTML:", error);
    }
});