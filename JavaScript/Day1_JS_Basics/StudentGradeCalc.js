let nameField = document.getElementById("student-name");
let gradeField = document.getElementById("grade");

nameField.onfocus = function () {
  nameField.style.borderColor = "";
  document.getElementById("student-name-error").textContent = "";
};
gradeField.onfocus = function () {
  gradeField.style.borderColor = "";
  document.getElementById("grade-error").textContent = "";
};

nameField.onblur = function () {
  let nameValue = nameField.value.trim();

  if (nameValue === "") {
    nameField.style.borderColor = "red";
    document.getElementById("student-name-error").textContent =
      "Student name is required";
  } else if (!isNaN(nameValue)) {
    nameField.style.borderColor = "red";
    document.getElementById("student-name-error").textContent =
      "Name cannot contain numbers";
  }
};

gradeField.onblur = function () {
  let gradeValue = gradeField.value.trim();

  if (gradeValue === "") {
    gradeField.style.borderColor = "red";
    document.getElementById("grade-error").textContent = "Grade is required";
  } else if (isNaN(gradeValue)) {
    console.log("I am entering inside this field 1.");
    gradeField.style.borderColor = "red";
    document.getElementById("grade-error").textContent =
      "Grade must be a number";
  } else if (parseInt(gradeValue) < 0 || parseInt(gradeValue) > 100) {
    console.log("I am entering inside this field 2.");
    gradeField.style.borderColor = "red";
    document.getElementById("grade-error").textContent =
      "Grade must be between 0 and 100";
  }
};

let addStudent = document.getElementById("add-student");
addStudent.addEventListener("click", (event) => {
  event.preventDefault();
  let studentNameInput = document.getElementById("student-name");
  let studentGradeInput = document.getElementById("grade");
  let studentName = document.getElementById("student-name").value.trim();
  let studentGrade = document.getElementById("grade").value.trim();

  studentNameInput.classList.remove("error-msg");
  studentGradeInput.classList.remove("error-msg");

  if (studentName === "" || studentGrade === "") {
    if (studentName === "") {
      studentNameInput.classList.add("error-msg");

      document.getElementById("student-name-error").textContent =
        "Student name is required";
    }
    if (studentGrade === "") {
      studentGradeInput.classList.add("error-msg");

      document.getElementById("grade-error").textContent = "Grade is required";
    }
    return;
  }
  let grade = parseInt(studentGrade);
  if (isNaN(grade) || grade < 0 || grade > 100) {
    studentGradeInput.classList.add("error-msg");

    document.getElementById("grade-error").textContent =
      "Grade must be between 0 and 100";
    return;
  }

  studentNameInput.value = "";
  studentGradeInput.value = "";

  studentNameInput.placeholder = "Enter student name";
  studentGradeInput.placeholder = "Enter student grade ";
  studentNameInput.classList.remove("error-msg");
  studentGradeInput.classList.remove("error-msg");
  addingStudent(studentName, studentGrade);
});
let students = [];
function addingStudent(studentName, studentGrade) {
  let student = { name: studentName, grade: parseInt(studentGrade) };
  let len = students.length;
  let booleans = checkIfNameExists(studentName);

  function checkIfNameExists(name) {
    let result = students.filter((student) => student.name === name);
    return result.length > 0;
  }
  if (!booleans) {
    if (students.push(student) > len) {
      alert("student added successfully...");
    }
  } else {
    alert(`${studentName} already exists...!`);
  }
}

let displayStudents = document.getElementById("display-grades");
displayStudents.addEventListener("click", (event) => {
  event.preventDefault();
  let gradeList = document.querySelector(".grade-list ol");
  gradeList.innerHTML = "";
  students.map((student) => {
    let listItem = document.createElement("li");
    listItem.textContent = `${student.name} - ${student.grade}`;
    gradeList.appendChild(listItem);
  });
});

let calculateAverage = document.getElementById("average-calculator");
calculateAverage.addEventListener("click", (event) => {
  event.preventDefault();
  let count = students.length;
  let total = students.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.grade;
  }, 0);
  console.log(total);
  parseFloat(total);
  let ans = parseFloat(total / count);
  let averageGrade = document.getElementById("average");
  averageGrade.innerHTML = "";
  averageGrade.textContent = ans.toFixed(2);
});
