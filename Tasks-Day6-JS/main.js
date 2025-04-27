// let rowNum=1;
// let targetTable;
// let targetText;
// let targetbutton;


// window.addEventListener('load',function(){
//     targetTable=this.document.querySelector("table");
//     targetText=this.document.getElementById("text");
//     targetbutton=this.document.getElementById("add");
   
//     // when click on add
//     targetbutton.addEventListener('click',function(){
//         const newRow=document.createElement("tr");
        
//         const done=document.createElement("td");
//         let checkbox=document.createElement("input");
//         checkbox.type="checkbox";
//         done.appendChild(checkbox);


//         let task=document.createElement("td");
        
//         window.localStorage.setItem("task",targetText.value)
//         if (window.localStorage.getItem('task')) {
//             task.textContent=window.localStorage.getItem('task');
//         }


//         const del=document.createElement('td');
//         let deleteImage=document.createElement('img');
//         deleteImage.src=`delete.PNG`;

//         del.appendChild(deleteImage);
        

//         newRow.appendChild(done);
//         newRow.appendChild(task);
//         newRow.appendChild(del);

//         // old version of code => new version i used tr:nth:child in css

//         // to make row with another color at row number is even(if row number is even change its bg color)
//         // if (rowNum%2==0) {
//         //     newRow.style.backgroundColor="#f3f3f3";
//         // }
//         // rowNum++;

//         //add the new row to the table
//         targetTable.appendChild(newRow);

//         //impty the input to add new task
//         targetText.value="";

//         // check if the task done it makes line through it
//         checkbox.addEventListener('change',function(event){
//             if (event.target.checked) {
//                 task.style.textDecoration = 'line-through';
//             } else {
//                 task.style.textDecoration = 'none';
//             }
    
//         })

//         deleteImage.addEventListener('click',function(e){
//             let deleteReply=confirm("Are You sure you need to delete this task? ");
//             if (deleteReply) {
//                 targetTable.removeChild(newRow);
//             }

//         })


//     })

  

// })



let rowNum = 1;
let targetTable;
let targetText;
let targetButton;

window.addEventListener('load', function() {
    targetTable = document.querySelector("table");
    targetText = document.getElementById("text");
    targetButton = document.getElementById("add");

    // أول ما الصفحة تحمل، نعرض المهمات المخزنة
    let savedTasks = JSON.parse(window.localStorage.getItem('tasks')) || [];

    savedTasks.forEach(taskText => {
        createTaskRow(taskText);
    });

    // لما ندوس على زرار إضافة
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

// دالة بناء صف المهمة
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

    // لما تعلم على المهمة انها خلصت
    checkbox.addEventListener('change', function(event) {
        if (event.target.checked) {
            task.style.textDecoration = 'line-through';
        } else {
            task.style.textDecoration = 'none';
        }
    });

    // لما تدوس على صورة الحذف
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
