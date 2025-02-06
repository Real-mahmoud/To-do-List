let rowNum=1;
let targetTable;
let targetText;
let targetbutton;


window.addEventListener('load',function(){
    targetTable=this.document.querySelector("table");
    targetText=this.document.getElementById("text");
    targetbutton=this.document.getElementById("add");
   
    // when click on add
    targetbutton.addEventListener('click',function(){
        const newRow=document.createElement("tr");
        
        const done=document.createElement("td");
        let checkbox=document.createElement("input");
        checkbox.type="checkbox";
        done.appendChild(checkbox);


        let task=document.createElement("td");
        task.textContent=targetText.value;


        const del=document.createElement('td');
        let deleteImage=document.createElement('img');
        deleteImage.src=`delete.PNG`;

        del.appendChild(deleteImage);
        

        newRow.appendChild(done);
        newRow.appendChild(task);
        newRow.appendChild(del);

        // to make row with another color at row number is even(if row number is even change its bg color)
        if (rowNum%2==0) {
            newRow.style.backgroundColor="rgb(243, 243, 243)";
        }
        rowNum++;

        //add the new row to the table
        targetTable.appendChild(newRow);

        // check if the task done it makes line through it
        checkbox.addEventListener('change',function(event){
            if (event.target.checked) {
                task.style.textDecoration = 'line-through';
            } else {
                task.style.textDecoration = 'none';
            }
    
        })

        deleteImage.addEventListener('click',function(e){
            let deleteReply=confirm("Are You sure you need to delete this task? ");
            if (deleteReply) {
                targetTable.removeChild(newRow);
            }

        })


    })

  

})
