let tasks = [];
let editIndex = null;

let button = document.getElementById("add");
let update = document.getElementById("update-task");
let inputField = document.getElementById("input");

inputField.onfocus = function () {
  inputField.placeholder = "Enter new task";
  document.getElementById("input").style.borderColor = "black";
};
inputField.onblur = function () {
  if (inputField.value === "") {
    document.getElementById("error-display").textContent =
      "please enter a task to add.";
    document.getElementById("input").style.borderColor = "red";
  }
};

function addTasks(event) {
  event.preventDefault();
  if (inputField.value === "") {
    inputField.style.borderColor = "red";

    document.getElementById("error-display").textContent =
      "please enter a task to add.";
  } else {
    addtask(inputField.value);
    inputField.value = "";
    inputField.style.borderColor = "";
    document.getElementById("error-display").textContent = "";
  }
}

function updation(event) {
  event.preventDefault();
  if (inputField.value === "") {
    inputField.style.borderColor = "red";
    document.getElementById("error-display").textContent =
      "please enter a task to add.";
  } else {
    updatetask(inputField.value);
    inputField.value = "";
    inputField.style.borderColor = "";
    document.getElementById("error-display").textContent = "";
    document.getElementById("update-task").style.display = "none";
    document.getElementById("add").style.display = "block";
  }
}

updatetask = (todo) => {
  tasks[editIndex] = todo;
  console.log(tasks);
  editIndex = null;
  todolist.innerText = "";
  display();
};

addtask = (task) => {
  tasks.push(task);
  console.log(tasks);
  todolist.innerText = "";
  display();
};

display = () => {
  tasks.forEach((task) => addtodo(task));
};

deletetion = (todo) => {
  editIndex = tasks.findIndex((task) => task === todo);
  tasks.splice(editIndex, 1);
  editIndex = null;
  todolist.innerText = "";
  display();
};

function addtodo(todo) {
  let listContent = document.createElement("li");
  
  let para = document.createElement("p");
  para.innerText = todo;
 
  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");

  checkBox.addEventListener("change", () => {
    if (checkBox.checked) {
      para.style.textDecoration = "line-through";
    } else {
      para.style.textDecoration = "none";
    }
  });

  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.classList.add("edit-button");

  editButton.addEventListener("click", () => {
    inputField.value = todo;
    document.getElementById("update-task").style.display = "block";
    button.style.display = "none";
    editIndex = tasks.findIndex((product) => product === todo);
    console.log(`this is my index ${editIndex}`);
  });

  deleteButton.addEventListener("click", () => {
    inputField.value = todo;
    deletetion(todo);
    console.log(`${inputField.value} hi iam`);
    inputField.value = "";
  });

  listContent.appendChild(checkBox);
  listContent.appendChild(para);
  listContent.appendChild(deleteButton);
  listContent.appendChild(editButton);
  todolist.appendChild(listContent);
}
