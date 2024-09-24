export { addContent };

function addContent() {
    const content = document.createElement("div");

    // Add the empty window content
    const emptyWindowContent = document.createElement("div");
    emptyWindowContent.id = "empty-window";
    emptyWindowContent.setAttribute("style", "display: block;");
    content.appendChild(emptyWindowContent);

    // Info text for empty window
    const infoText = document.createElement("p");
    infoText.id = "info-text";
    infoText.textContent = "Press the + icon to start your journey!";
    emptyWindowContent.appendChild(infoText);

    // Icon to add ToDo list items
    const addIcon = document.createElement("div");
    addIcon.id = "add-icon";
    addIcon.innerHTML = "<i class='fas fa-plus'></i>";
    emptyWindowContent.appendChild(addIcon);

    document.body.appendChild(content);

    addIcon.addEventListener("mouseup", () => {
        popUpOption();
        emptyWindowContent.remove();
    });
}

function popUpOption(){
    const popUp = document.createElement("div");
    popUp.id = "pop-up";
    popUp.innerHTML = "<p>Do you want to add a new item?</p>";
    document.body.appendChild(popUp);
}