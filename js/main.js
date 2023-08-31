let ls = localStorage.getItem("todo");
let todo = ls ? JSON.parse(localStorage.getItem("todo")) : [];
let form = document.getElementById("submitform");


maptodo = ()=>{
    document.getElementById("fillup").innerHTML = "";
    document.getElementById("fillprogress").innerHTML = "";
    document.getElementById("filldone").innerHTML = "";
    todo.map((val, index) => {
        const ele = document.createElement("div");
        ele.innerHTML = `
        
        <div class="Cards mb-4 flex flex-col w-fit ">
        <div class="flex">
            <span class=" font-semibold">${val.taskName}</span>
          
            <div class="relative flex">
            <button id="popupButton" onclick="editlist('${val.type}${index}')" class="flex items-center">
            
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                    stroke="currentColor" class="ml-24 mr-2 w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <ul id="edit${val.type}${index}" class="absolute top-full hidden right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md">
                <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Edit Task</a></li>
                <button onclick="del('${index}')" class="block px-2 py-2 hover:bg-gray-100"><li>Delete Task</li></button>
                <li><button onclick="markAsCompleted('${index}')" class="block px-4 py-2 hover:bg-gray-100">Mark as Completed</button></li>
            </ul>
        </div>
    
        </div>
        <span class="bg-yellow-200 text-orange-800 rounded-xl font-bold p-1 w-fit">${
          val.category
        }</span>
        <hr class=" border-t-2">
    
        <div class="flex">
        
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" class="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
            </svg>
            <button onclick="show('${val.type}${index}')"><span>1/${
          val.subtasks.length
        }</span></button>
            <div class="flex w-48 ">
    
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    strokeWidth={1.5} stroke="currentColor" class="ml-auto  w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="mr-2">14 days</span>
            </div>
    
        </div>
        <div class="mt-[-5px]">
            
            <ul id="${val.type}${index}"  class="hidden pl-1">
    
                ${val.subtasks
                  .map((value, i) => {
                    return `<li><input type="checkbox" class="m-2">${value} </li>`;
                  })
                  .join("")}
                
            </ul>
        </div>
    </div>
    
    
    `;
        // console.log(val.type)
        if (val.type == "Create ToDo") {
          const filltodoElement = document.getElementById("fillup");
          filltodoElement.innerHTML += ele.innerHTML;
        } else if (val.type == "In Progress") {
          const filltodoElement = document.getElementById("fillprogress");
          filltodoElement.innerHTML += ele.innerHTML;
        } else if (val.type == "Add Done") {
          const filltodoElement = document.getElementById("filldone");
          filltodoElement.innerHTML += ele.innerHTML;
        }
      });
}
if(ls){
  maptodo();
}
// from event listen
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const taskName = document.querySelector('input[type="text"]').value;
  const date = document.querySelector('input[type="date"]').value;
  const time = document.querySelector('input[type="time"]').value;
  const category = document.querySelector('select[name="Categorie"]').value;
  const subtaskInputs = document.querySelectorAll("#subtaskList li input");
  const subtasks = Array.from(subtaskInputs).map((input) => input.value.trim());
  const type = document.getElementById("formspan").innerHTML;

  // Create an object to store the event data
  const eventData = {
    taskName: taskName,
    date: date,
    time: time,
    category: category,
    subtasks: subtasks,
    type: type,
  };

  todo.push(eventData);

  localStorage.setItem("todo", JSON.stringify((todo)));
  document.querySelector("#submitform").reset();
  document.querySelector("#subtaskList").innerHTML = "";
  alert("Event created and stored in local storage!");
  maptodo();  
});

// For form pop up blur
add = () => {
  document.getElementById("formcc").style.display = "block";
  document.getElementById("temp").style.display = "block";
};

relode = (e) => {
  e.preventDefault();
  document.getElementById("formcc").style.display = "none";
  document.getElementById("temp").style.display = "none";
};

const subtaskList = document.getElementById("subtaskList");
const addSubtaskButton = document.getElementById("addSubtaskButton");

addSubtaskButton.addEventListener("click", (e) => {
  e.preventDefault();

  const subtaskInput = document.createElement("input");
  subtaskInput.type = "text";
  subtaskInput.className = "outline-none";
  subtaskInput.placeholder = "Enter Subtask";

  const subtaskItem = document.createElement("li");
  subtaskItem.className = "listitem pl-5";
  subtaskItem.appendChild(subtaskInput);

  subtaskList.appendChild(subtaskItem);
});

// ------------------------------------------------------

show = (val) => {
  const initiate = document.getElementById(val);
  const compu = window.getComputedStyle(initiate);
  const displayvalue = compu.getPropertyValue("display");

  if (displayvalue === "none") {
    initiate.style.display = "flex";
    initiate.style.flexDirection = "column";
  } else {
    initiate.style.display = "none";
  }
};

add = (e) => {
  
  document.getElementById("formcc").style.display = "block";
  document.getElementById("temp").style.display = "block";
  document.getElementById("formspan").innerHTML = e.srcElement.innerText;
  
};


// Get the button and popup menu elements


// Show the popup menu when the button is clicked
editlist = (e)=>{
    
    const initiate = document.getElementById("edit"+e);
  const compu = window.getComputedStyle(initiate);
  const displayvalue = compu.getPropertyValue("display");

  if (displayvalue === "none") {
    initiate.style.display = "flex";
    initiate.style.flexDirection = "column";
  } else {
    initiate.style.display = "none";
  }


}

del = (index)=>{
todo.splice(index,1);
localStorage.setItem('todo',JSON.stringify(todo))
location.reload()


maptodo()

}

workrender = ()=>{
  const work = todo.filter(function(todo){return todo.category ==="Work"});

  document.getElementById("fillup").innerHTML = "";
  document.getElementById("fillprogress").innerHTML = "";
  document.getElementById("filldone").innerHTML = "";
  work.map((val, index) => {
      const ele = document.createElement("div");
      ele.innerHTML = `
      
      <div class="Cards mb-4 flex flex-col w-fit ">
      <div class="flex">
          <span class=" font-semibold">${val.taskName}</span>
        
          <div class="relative">
          <button id="popupButton" onclick="editlist('${val.type}${index}')" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" class="ml-24 mr-2 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
          </button>
          <ul id="edit${val.type}${index}" class="absolute top-full hidden right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md">
              <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Edit Task</a></li>
              <button onclick="del('${index}')" class="block px-2 py-2 hover:bg-gray-100"><li>Delete Task</li></button>
              <li><button onclick="markAsCompleted('${index}')" class="block px-4 py-2 hover:bg-gray-100">Mark as Completed</button></li>
          </ul>
      </div>
  
      </div>
      <span class="bg-yellow-200 text-orange-800 rounded-xl font-bold p-1 w-fit">${
        val.category
      }</span>
      <hr class=" border-t-2">
  
      <div class="flex">
      
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
          </svg>
          <button onclick="show('${val.type}${index}')"><span>1/${
        val.subtasks.length
      }</span></button>
          <div class="flex w-48 ">
  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" class="ml-24  w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="mr-2">14 days</span>
          </div>
  
      </div>
      <div class="mt-[-5px]">
          
          <ul id="${val.type}${index}"  class="hidden pl-1">
  
              ${val.subtasks
                .map((value, i) => {
                  return `<li><input type="checkbox" class="m-2">${value} </li>`;
                })
                .join("")}
              
          </ul>
      </div>
  </div>
  
  
  `;
      // console.log(val.type)
      if (val.type == "Create ToDo") {
        const filltodoElement = document.getElementById("fillup");
        filltodoElement.innerHTML += ele.innerHTML;
      } else if (val.type == "In Progress") {
        const filltodoElement = document.getElementById("fillprogress");
        filltodoElement.innerHTML += ele.innerHTML;
      } else if (val.type == "Add Done") {
        const filltodoElement = document.getElementById("filldone");
        filltodoElement.innerHTML += ele.innerHTML;
      }
    });
}


homerender=()=>{
  const home = todo.filter(function(todo){return todo.category ==="Home"});
  document.getElementById("fillup").innerHTML = "";
  document.getElementById("fillprogress").innerHTML = "";
  document.getElementById("filldone").innerHTML = "";
  home.map((val, index) => {
      const ele = document.createElement("div");
      ele.innerHTML = `
      
      <div class="Cards mb-4 flex flex-col w-fit ">
      <div class="flex">
          <span class=" font-semibold">${val.taskName}</span>
        
          <div class="relative">
          <button id="popupButton" onclick="editlist('${val.type}${index}')" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" class="ml-24 mr-2 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
          </button>
          <ul id="edit${val.type}${index}" class="absolute top-full hidden right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md">
              <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Edit Task</a></li>
              <button onclick="del('${index}')" class="block px-2 py-2 hover:bg-gray-100"><li>Delete Task</li></button>
              <li><button onclick="markAsCompleted('${index}')" class="block px-4 py-2 hover:bg-gray-100">Mark as Completed</button></li>
          </ul>
      </div>
  
      </div>
      <span class="bg-yellow-200 text-orange-800 rounded-xl font-bold p-1 w-fit">${
        val.category
      }</span>
      <hr class=" border-t-2">
  
      <div class="flex">
      
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
          </svg>
          <button onclick="show('${val.type}${index}')"><span>1/${
        val.subtasks.length
      }</span></button>
          <div class="flex w-48 ">
  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" class="ml-24  w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="mr-2">14 days</span>
          </div>
  
      </div>
      <div class="mt-[-5px]">
          
          <ul id="${val.type}${index}"  class="hidden pl-1">
  
              ${val.subtasks
                .map((value, i) => {
                  return `<li><input type="checkbox" class="m-2">${value} </li>`;
                })
                .join("")}
              
          </ul>
      </div>
  </div>
  
  
  `;
      // console.log(val.type)
      if (val.type == "Create ToDo") {
        const filltodoElement = document.getElementById("fillup");
        filltodoElement.innerHTML += ele.innerHTML;
      } else if (val.type == "In Progress") {
        const filltodoElement = document.getElementById("fillprogress");
        filltodoElement.innerHTML += ele.innerHTML;
      } else if (val.type == "Add Done") {
        const filltodoElement = document.getElementById("filldone");
        filltodoElement.innerHTML += ele.innerHTML;
      }
    });

}

shoppingrender =()=>{
  const shopping = todo.filter(function(todo){return todo.category ==="Shopping"});
  

  document.getElementById("fillup").innerHTML = "";
  document.getElementById("fillprogress").innerHTML = "";
  document.getElementById("filldone").innerHTML = "";
  shopping.map((val, index) => {
      const ele = document.createElement("div");
      ele.innerHTML = `
      
      <div class="Cards mb-4 flex flex-col w-fit ">
      <div class="flex">
          <span class=" font-semibold">${val.taskName}</span>
        
          <div class="relative">
          <button id="popupButton" onclick="editlist('${val.type}${index}')" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" class="ml-24 mr-2 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
          </button>
          <ul id="edit${val.type}${index}" class="absolute top-full hidden right-0 mt-2 bg-white border border-gray-300 shadow-lg rounded-md">
              <li><a href="#" class="block px-4 py-2 hover:bg-gray-100">Edit Task</a></li>
              <button onclick="del('${index}')" class="block px-2 py-2 hover:bg-gray-100"><li>Delete Task</li></button>
              <li><button onclick="markAsCompleted('${index}')" class="block px-4 py-2 hover:bg-gray-100">Mark as Completed</button></li>
          </ul>
      </div>
  
      </div>
      <span class="bg-yellow-200 text-orange-800 rounded-xl font-bold p-1 w-fit">${
        val.category
      }</span>
      <hr class=" border-t-2">
  
      <div class="flex">
      
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" class="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
          </svg>
          <button onclick="show('${val.type}${index}')"><span>1/${
        val.subtasks.length
      }</span></button>
          <div class="flex w-48 ">
  
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  strokeWidth={1.5} stroke="currentColor" class="ml-auto  w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="mr-2">14 days</span>
          </div>
  
      </div>
      <div class="mt-[-5px]">
          
          <ul id="${val.type}${index}"  class="hidden pl-1">
  
              ${val.subtasks
                .map((value, i) => {
                  return `<li><input type="checkbox" class="m-2">${value} </li>`;
                })
                .join("")}
              
          </ul>
      </div>
  </div>
  
  
  `;
      // console.log(val.type)
      if (val.type == "Create ToDo") {
        const filltodoElement = document.getElementById("fillup");
        filltodoElement.innerHTML += ele.innerHTML;
      } else if (val.type == "In Progress") {
        const filltodoElement = document.getElementById("fillprogress");
        filltodoElement.innerHTML += ele.innerHTML;
      } else if (val.type == "Add Done") {
        const filltodoElement = document.getElementById("filldone");
        filltodoElement.innerHTML += ele.innerHTML;
      }
    });
}



markAsCompleted = (index)=>{
 todo[index].type  = "Add Done";
 maptodo();
}