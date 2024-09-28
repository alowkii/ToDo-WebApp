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
        addToDoList();
        emptyWindowContent.remove();
    });
}

function addToDoList(){
    const popUp = document.getElementById("pop-up");
    popUp.classList.remove("hidePopUp");
    popUp.classList.add("showPopUp");
    
    const dateInput = document.getElementById('inputDate');
    dateInput.addEventListener('click', showDatePicker);
}

function showDatePicker() {
    const dateInput = document.getElementById('inputDate');
    dateInput.click();

    dateInput.onchange = function() {
        // Update the custom input with the selected date in your desired format
        const customDateInput = document.getElementById('customDateInput');
        const selectedDate = new Date(dateInput.value);
        const formattedDate = selectedDate.toLocaleDateString('en-GB'); // Format as dd/mm/yyyy or any other
        customDateInput.value = formattedDate;
    };
}
