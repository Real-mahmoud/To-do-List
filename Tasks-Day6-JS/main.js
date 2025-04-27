let rowNum = 1;
let targetTable;
let targetText;
let targetButton;

window.addEventListener('load', function() {
    targetTable = document.querySelector("table");
    targetText = document.getElementById("text");
    targetButton = document.getElementById("add");

    // when the page load display the stored tasks
    let savedTasks = JSON.parse(window.localStorage.getItem('tasks')) || [];

    savedTasks.forEach(taskText => {
        createTaskRow(taskText);
    });

    // when click on add button
    targetButton.addEventListener('click', function() {
        if (targetText.value.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        let tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
        tasks.push(targetText.value);
        window.localStorage.setItem('tasks', JSON.stringify(tasks));

        createTaskRow(targetText.value);

        targetText.value = "";
    });
});

//create the new row 
function createTaskRow(taskText) {
    const newRow = document.createElement("tr");

    const done = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    done.appendChild(checkbox);

    const task = document.createElement("td");
    task.textContent = taskText;

    const del = document.createElement("td");
    const deleteImage = document.createElement('img');
    deleteImage.src = `delete.PNG`;
    deleteImage.alt = "Delete";

    del.appendChild(deleteImage);

    newRow.appendChild(done);
    newRow.appendChild(task);
    newRow.appendChild(del);

    targetTable.appendChild(newRow);

    // chen check task and done
    checkbox.addEventListener('change', function(event) {
        if (event.target.checked) {
            task.style.textDecoration = 'line-through';
        } else {
            task.style.textDecoration = 'none';
        }
    });

    // when click on delete to delete task
    deleteImage.addEventListener('click', function() {
        let deleteReply = confirm("Are you sure you want to delete this task?");
        if (deleteReply) {
            targetTable.removeChild(newRow);

            let tasks = JSON.parse(window.localStorage.getItem('tasks')) || [];
            tasks = tasks.filter(t => t !== taskText);
            window.localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });
}
