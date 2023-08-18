let ls = localStorage.getItem('todo');
let todo = ls ? JSON.parse(ls):[];
let form = document.getElementById("submitform")
form.addEventListener('submit',(e)=>{
    e.preventDefault();

 // Get form values
 const taskName = document.querySelector('input[type="text"]').value;
 const date = document.querySelector('input[type="date"]').value;
 const time = document.querySelector('input[type="time"]').value;
 const category = document.querySelector('select[name="Categorie"]').value;
 const subtasks = Array.from(document.querySelectorAll('#subtaskList li')).map(li => li.textContent.trim());

 // Create an object to store the event data
 const eventData = {
     taskName,
     date,
     time,
     category,
     subtasks,
 };


 
 todo.push(eventData);
 console.log(todo)
 localStorage.setItem('eventData', JSON.stringify(todo));
 
 document.querySelector("#submitform").reset();
 document.querySelector('#subtaskList').innerHTML = '';
 alert('Event created and stored in local storage!');




})

add = ()=>{
    
document.getElementById("formcc").style.display = "block";
document.getElementById("temp").style.display = "block";
    
}



relode = (e)=>{
    e.preventDefault();
    document.getElementById("formcc").style.display = "none";
    document.getElementById("temp").style.display = "none";
}




const addSubtaskButton = document.getElementById('addSubtaskButton');
    const subtaskList = document.getElementById('subtaskList');

    addSubtaskButton.addEventListener('click', (e) => {
e.preventDefault()
        const subtaskInput = document.createElement('input');
        subtaskInput.type = 'text';
        subtaskInput.className = 'outline-none';
        subtaskInput.placeholder = 'Enter Subtask';

        const subtaskItem = document.createElement('li');
        subtaskItem.className = 'pl-5';
        subtaskItem.appendChild(subtaskInput);

        subtaskList.appendChild(subtaskItem);
    });


    todo.map((data, index)=>{
        
    })