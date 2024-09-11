import { Expense, Goal, User } from "./models/models";
import { UserRepository } from "./services/UserServices";
import { ExpenseRepository, GoalRepository } from "./services/services";
import { Chart, PieController, ArcElement, Legend, Tooltip, Title, } from "chart.js";

const usersRepo = new UserRepository();
let UserAccountArray:  User[] = usersRepo.UsersLocalStorage();
console.log(UserAccountArray);

let profileName = document.getElementById("profile-name") as HTMLElement;
let logoutIcon = document.getElementById("logout-icon") as HTMLSpanElement;
let remainingBalance = document.getElementById("remaining-balance-display") as HTMLElement;

// Find the user with login status in
let userAccount = usersRepo.getLoggedUser(UserAccountArray);
console.log(userAccount);

if (userAccount) {
  profileName.innerText = userAccount.name;
  var userNames = userAccount.name;
  var userEmails = userAccount.email;
  console.log(userEmails);
} else {
  console.error("No user is logged in.");
}

// Logout functionality
logoutIcon.onclick = function () {
  UserAccountArray.forEach((user) => {
    if ( user.loggedStatus === "in" && user.name === userAccount?.name && user.email === userAccount?.email ) {
      user.loggedStatus = "out";
    }
  });

  localStorage.setItem("UserArray", JSON.stringify(UserAccountArray));
  window.location.href = "index.html";
};


//category changing part ...
const transactionType = document.getElementById("transaction-type") as HTMLSelectElement;
const categoryType = document.getElementById("category") as HTMLSelectElement;


interface category {
  value: string;
  text: string;
}

const incomeCategories: category[] = [
  { value: "salary", text: "Salary" },
  { value: "investment", text: "Investment" },
  { value: "other", text: "Other Income" },
];

const expenseCategories: category[] = [
  { value: "food", text: "Food" },
  { value: "education", text: "Education" },
  { value: "medicine", text: "Medicine" },
  { value: "others", text: "Others" },
];

function updatecategoryOptions(): void {
  categoryType.innerHTML = "";
  const selectedCategories: category[] =
    transactionType.value === "Income" ? incomeCategories : expenseCategories;

  selectedCategories.forEach((category: category) => {
    const option = document.createElement("option");
    option.value = category.value;
    option.textContent = category.text;
    categoryType.appendChild(option);
  });
}

transactionType.onchange = function () {
  updatecategoryOptions();
};


// these are the functions to be loaded when the page is loaded ...

window.onload = function () {
  updatecategoryOptions();
  expenseRepo.renderTransactions();
  goalRepo.renderGoals();
  expenseRepo.calculateTotals();
  expenseRepo.calculateSelectedExpense();
  goalRepo.calculateSavings();
};


// transaction working part ...

const expenseRepo = new ExpenseRepository();

const transactionTypeElement = document.getElementById("transaction-type") as HTMLSelectElement;
const categoryElement = document.getElementById("category") as HTMLSelectElement;
const amountFieldElement = document.getElementById("amount-field") as HTMLInputElement;
const dateFieldElement = document.getElementById("date-field") as HTMLInputElement;
const addButtonElement = document.getElementById("expense-add-submit-button") as HTMLButtonElement;
const amountErrorElement = document.getElementById("amount-error") as HTMLSpanElement;
const dateErrorElement = document.getElementById("date-error") as HTMLSpanElement;
const displayMainErrors = document.getElementById("display-main-errors") as HTMLSpanElement;

// Validation Part
let isValidate: boolean = false;
let editingExpenseId: number | null = null;

amountFieldElement.onblur = function () {
  const amount = parseFloat(amountFieldElement.value);
  if (isNaN(amount) || amount <= 0) {
    amountErrorElement.innerText = "Please enter a valid amount.";
    isValidate = false;
  } else {
    amountErrorElement.innerText = "";
    isValidate = true;
  }
};

function validateDate(): boolean {
  const selectedDate = new Date(dateFieldElement.value);
  const today = new Date();
  selectedDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  return selectedDate >= firstDayOfMonth && selectedDate <= today;
}

dateFieldElement.onblur = function () {
  if (dateFieldElement.value === "") {
    dateErrorElement.innerText = "Please choose a date.*";
    isValidate = false;
  } else if (!validateDate()) {
    dateErrorElement.innerText = "Please choose a correct date.*";
    isValidate = false;
  } else {
    dateErrorElement.innerText = "";
    isValidate = true;
  }
};

// Function to create transaction rows in the table
export function createRow(Usertransactions: Expense) {
  const tableBody = document.getElementById(
    "transaction-body"
  ) as HTMLTableSectionElement;

  let row = document.createElement("tr");

  let dateCell = document.createElement("td");
  dateCell.innerText = Usertransactions.date;
  row.appendChild(dateCell);

  let categoryCell = document.createElement("td");
  categoryCell.innerText = Usertransactions.category;
  row.appendChild(categoryCell);

  let amountCell = document.createElement("td");
  amountCell.innerText = Usertransactions.amount.toString();
  row.appendChild(amountCell);

  let deleteCell = document.createElement("td");
  let deleteButton = document.createElement("button");
  deleteButton.onclick = function () {
    expenseRepo.deleteTransaction(Usertransactions);
  };
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("transaction-delete-button");
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  let editCell = document.createElement("td");
  let editButton = document.createElement("button");
  editButton.onclick = function () {
    transactionTypeElement.value = Usertransactions.transactionType;
    updatecategoryOptions();
    categoryElement.value = Usertransactions.category;
    amountFieldElement.value = Usertransactions.amount.toString();
    dateFieldElement.value = Usertransactions.date;
    editingExpenseId = Usertransactions.id;
  };
  editButton.innerText = "Edit";
  editButton.classList.add("transaction-edit-button");
  editCell.appendChild(editButton);
  row.appendChild(editCell);

  tableBody.appendChild(row);
}

function clearFormFields() {
  transactionTypeElement.value = "";
  categoryElement.value = "";
  amountFieldElement.value = "";
  dateFieldElement.value = "";
}

//Calculate expense percentage ... 

var calculatePercentage = document.getElementById("percentage-calculator") as HTMLButtonElement;
var categoryProgress = document.getElementById("category-progress") as HTMLSelectElement;
calculatePercentage.onclick = function (e) {
  e.preventDefault();
  expenseRepo.expenseCategories();
};

// adding a transaction ...
addButtonElement.onclick = function (event) {
  event.preventDefault();
  if (isValidate) {
    let isFormValid = true;

    // inner validation ...
    const amount = parseFloat(amountFieldElement.value);
    if (isNaN(amount) || amount <= 0) {
      amountErrorElement.innerText = "Please enter a valid amount.";
      isFormValid = false;
    } else {
      amountErrorElement.innerText = "";
    }

    if (dateFieldElement.value === "") {
      dateErrorElement.innerText = "Please choose a date.*";
      isFormValid = false;
    } else if (!validateDate()) {
      dateErrorElement.innerText = "Please select a date within this month.*";
      isFormValid = false;
    } else {
      dateErrorElement.innerText = "";
    }

    if (isFormValid) {
      const newExpense: Expense = {
        id:
          editingExpenseId !== null
            ? editingExpenseId
            : Math.floor(Math.random() * 90) + 10,
        email: userEmails,
        transactionType: transactionTypeElement.value,
        category: categoryElement.value,
        amount: parseFloat(amountFieldElement.value),
        date: dateFieldElement.value,
      };

      if (transactionTypeElement.value === "Expense") {
        let currentRemainingBalance = parseFloat(
          remainingBalance.innerText.replace("$", "")
        );

        if (amount > currentRemainingBalance) {
          displayMainErrors.innerText =
            "This expense exceeds your remaining balance.";
          console.log("This expense exceeds your remaining balance.");
          return;
        }
      }

      if (editingExpenseId !== null) {
        expenseRepo.editTransaction(editingExpenseId, newExpense);
        editingExpenseId = null;
      } else {
        expenseRepo.addTransaction(newExpense);
        clearFormFields();
      }
      window.location.reload();
      console.log("Form is valid. Transaction added.");
    } else {
      console.log("Form validation failed.");
    }
  } else {
    displayMainErrors.innerText = "please fill all the fields.*";
    console.log("Form validation failed.");
  }
};

// Savings and goal part starting

// Modals part

var editGoalCloseButton = document.getElementById("close-btn-cross") as HTMLSpanElement;
editGoalCloseButton.onclick = function () {
  closeEditGoalModal();
};

var editGoalCancelButton = document.getElementById("edit-goal-cancel-button") as HTMLButtonElement;
editGoalCancelButton.onclick = function () {
  closeGoalModal();
};

var contributionClosePopup = document.getElementById("contribution-close-popup") as HTMLSpanElement;
contributionClosePopup.onclick = function () {
  closeModal();
};

var contributionCancelButton = document.getElementById("contibution-cancel-button") as HTMLButtonElement;
contributionCancelButton.onclick = function () {
  closeModal();
};

var addGoalPopUpCancel = document.getElementById("add-goal-popup") as HTMLButtonElement;
addGoalPopUpCancel.onclick = function () {
  closeGoalModal();
};

var addGoalPopUpclose = document.getElementById("add-goal-close-button") as HTMLSpanElement;
addGoalPopUpclose.onclick = function () {
  closeGoalModal();
};

var addgoals = document.getElementById("add-goals") as HTMLButtonElement;
addgoals.onclick = function () {
  openGoalModal();
};

var closeInfo = document.getElementById("info-close-popup") as HTMLSpanElement;
closeInfo.onclick = function(){
  infoModalClose()
}

function closeModal() {
  let contributionModal = document.getElementById("contribution-modal") as HTMLDivElement;
  contributionModal.style.display = "none";
}

function NormalcloseModal() {
  let contributionModal = document.getElementById("contribution-modal") as HTMLDivElement;
  contributionModal.style.display = "none";
  goalRepo.saveGoalsToLocalStorage();
      goalRepo.renderGoals();
      window.location.reload();
      goalRepo.calculateSavings();
}

function openGoalModal() {
  let openAddGoalModal = document.getElementById("add-goal-modal") as HTMLDivElement;
  openAddGoalModal.style.display = "flex";
}

let editGoalID: number | null = null;
function editGoalModal(goalID: number, goalName: string) {
  let editGoalModal = document.getElementById("edit-goal-modal"
  ) as HTMLDivElement;
  let editGoalNameField = document.getElementById(
    "edit-goal-name"
  ) as HTMLInputElement;
  console.log(goalName);
  editGoalNameField.value = goalName;
  editGoalModal.style.display = "flex";
  editGoalID = goalID;
  //console.log(editGoalID);
}
function closeEditGoalModal() {
  let editGoalMoal = document.getElementById("edit-goal-modal") as HTMLDivElement;
  editGoalMoal.style.display = "none";
}
function closeGoalModal() {
  let closeAddGoalModal = document.getElementById("add-goal-modal") as HTMLDivElement;
  closeAddGoalModal.style.display = "none";
}
function infoModalClose(){
  let infoGoalModal = document.getElementById("info-modal") as HTMLDivElement;
  infoGoalModal.style.display = "none";
}

let currentGoalID: number | null = null;

function openModal(goalName: string, currentContribution: number, goalAmount: number, goalID: number) {
  const openContributionModel = document.getElementById("contribution-modal") as HTMLDivElement;
  openContributionModel.style.display = "flex";
  let contributionStatus = document.getElementById("contribution-status") as HTMLSpanElement;
  let goalAmountStatus = document.getElementById("goal-amount-status") as HTMLSpanElement;
  let goalHeading = document.getElementById("goal-heading") as HTMLHeadingElement;
  contributionStatus.innerText = `${currentContribution}`;
  goalAmountStatus.innerText = `${goalAmount}`;
  goalHeading.innerText = goalName;
  currentGoalID = goalID;
}

function infoModal(goalName: string, currentContribution: number, goalAmount: number){
  const openInfoModal = document.getElementById('info-modal') as HTMLDivElement;
  openInfoModal.style.display = "flex";
  let contributionInfo = document.getElementById("contribution-info") as HTMLSpanElement;
  let amountInfo = document.getElementById("goal-amount-info") as HTMLSpanElement;
  let headingInfo = document.getElementById("goal-heading-info") as HTMLHeadElement;

  headingInfo.innerText = goalName;
  contributionInfo.innerText = `${currentContribution}`;
  amountInfo.innerText = `${goalAmount}`;
}



// creation of the object for Goal Class.

const goalRepo = new GoalRepository();

// Create a goal card.

export function createGoalCard(goal: Goal): void {
  const goalCard: HTMLDivElement = document.createElement("div");
  goalCard.classList.add("goal-card");
  goalCard.id = `goal-container-${goal.goalId}`;
  console.log(goalCard.id);

  if (goal.goalStatus === "yes") {
    goalCard.style.backgroundColor = "#32CD32";
  }

  const goalName: HTMLHeadingElement = document.createElement("h2");
  goalName.classList.add("box");
  goalName.textContent = goal.goalName;
  goalCard.appendChild(goalName);

  const progressBar: HTMLDivElement = document.createElement("div");
  progressBar.classList.add("progress-bar");

  const progress: HTMLDivElement = document.createElement("div");
  progress.classList.add("progress");
  progress.style.width = `${Math.min(
    (goal.goalContribution / goal.goalAmount) * 100,
    100
  )}%`;

  progressBar.appendChild(progress);
  goalCard.appendChild(progressBar);

  const contribution: HTMLDivElement = document.createElement("div");
  contribution.classList.add("contribution");

  const contributionSpan: HTMLSpanElement = document.createElement("span");
  contributionSpan.classList.add("contribution-span");
  contributionSpan.textContent = `${Math.min(
    parseFloat(((goal.goalContribution / goal.goalAmount) * 100).toFixed(1)),
    100
  )}% achieved`;

  contribution.appendChild(contributionSpan);
  goalCard.appendChild(contribution);

  const arrangeButtons: HTMLDivElement = document.createElement("div");
  arrangeButtons.classList.add("arrange-buttons");

  if (goal.goalStatus !== "yes") {
  const contributeBtn: HTMLButtonElement = document.createElement("button");
  contributeBtn.classList.add("contribute-btn");
  contributeBtn.textContent = "+";
  contributeBtn.onclick = function () {
    openModal( goal.goalName, goal.goalContribution, goal.goalAmount, goal.goalId );
  };
  arrangeButtons.appendChild(contributeBtn);
 }else{
  const infoBtn: HTMLButtonElement = document.createElement("button");
  infoBtn.classList.add("contribute-btn");
  infoBtn.textContent = "i";
  infoBtn.onclick = function(){
    infoModal(goal.goalName, goal.goalContribution, goal.goalAmount);
  }

  arrangeButtons.appendChild(infoBtn);
 }
  const deleteBtn: HTMLButtonElement = document.createElement("button");
  deleteBtn.classList.add("delete-goal-btn");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.onclick = function () {
    goalRepo.deleteGoals(goal.goalId);
  };
  arrangeButtons.appendChild(deleteBtn);

  const editBtn: HTMLButtonElement = document.createElement("button");
  editBtn.classList.add("edit-goal-btn");
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  editBtn.onclick = function () {
    editGoalModal(goal.goalId, goal.goalName);
  };
  arrangeButtons.appendChild(editBtn);

  goalCard.appendChild(arrangeButtons);

  const goalsContainer = document.getElementById(
    "goals-container"
  ) as HTMLElement;
  goalsContainer.appendChild(goalCard);
}


// add a new goal 
var totalSavingsdisplay = document.getElementById( "total-savings") as HTMLSpanElement;
let goalNameInput = document.getElementById("goal-name") as HTMLInputElement;
let goalAmountInput = document.getElementById("goal-amount") as HTMLInputElement;
let goalContributionInput = document.getElementById("current-contribution") as HTMLInputElement;
let goalNameError = document.getElementById("goal-name-error") as HTMLSpanElement;
let goalAmountError = document.getElementById("goal-amount-error") as HTMLSpanElement;
let goalContributionError = document.getElementById("goal-contribution-error") as HTMLSpanElement;
let goalErrors = document.getElementById("add-goal-main-errors") as HTMLSpanElement;
let goalFormButton = document.getElementById("goal-submit-button") as HTMLButtonElement;
let canProceed = false;

goalNameInput.onblur = function () {
  if (goalNameInput.value === "") {
    goalNameError.innerText = "the name field is empty.";
    canProceed = false;
  } else {
    goalNameError.innerText = "";
    canProceed = true;
  }
};

goalAmountInput.onblur = function () {
  if (goalAmountInput.value === "") {
    goalAmountError.innerText = "please enter a amount.*";
    canProceed = false;
  } else if (
    isNaN(parseFloat(goalAmountInput.value)) ||
    parseFloat(goalAmountInput.value) <= 0
  ) {
    goalAmountError.innerText = "please enter a valid amount.*";
    canProceed = false;
  } else {
    goalAmountError.innerText = "";
    canProceed = true;
  }
};

goalContributionInput.onblur = function () {
  if (goalContributionInput.value === "") {
    goalContributionError.innerText = "please enter a amount.*";
    canProceed = false;
  } else if (
    isNaN(parseFloat(goalAmountInput.value)) ||
    parseFloat(goalAmountInput.value) <= 0
  ) {
    goalContributionError.innerText = "please enter a valid amount.*";
    canProceed = false;
  } else {
    goalContributionError.innerText = "";
    canProceed = true;
  }
};

goalFormButton.onclick = function (e: Event): void {
  e.preventDefault();
  let currentRemainingBalance = parseFloat(
    remainingBalance.innerText.replace("$", "")
  );

  const remainingStatus: number = currentRemainingBalance;
  const userGoalName: string = (goalNameInput as HTMLInputElement).value;
  const userGoalAmount: number = parseInt((goalAmountInput as HTMLInputElement).value);
  const userGoalContribution: number = parseInt((goalContributionInput as HTMLInputElement).value);
  const userGoalId: number = Math.floor(Math.random() * 90) + 10;

  if (canProceed) {
    goalErrors.innerText = "";
    if (userGoalAmount > userGoalContribution) {
      goalErrors.innerText = "";
    } else {
      goalErrors.innerText = "Enter a valid contribution.";
      return;
    }

    if (!(userGoalContribution < remainingStatus)) {
      console.log(remainingStatus);
      goalErrors.innerText = "Limited Balance.";
      return;
    }

    const userGoal: Goal = {
      goalId: userGoalId,
      goalEmail: userEmails,
      goalName: userGoalName,
      goalAmount: userGoalAmount,
      goalContribution: userGoalContribution,
      goalStatus: "not",
    };
    goalRepo.addGoals(userGoal);
  } else {
    goalErrors.innerText = "Check the fields before you submit.";
  }
};

var editGoalNamefield = document.getElementById("edit-goal-name") as HTMLInputElement;
var editNameError = document.getElementById("edit-goal-name-error") as HTMLSpanElement;
var editMainErrors = document.getElementById("edit-goal-main-errors") as HTMLSpanElement;
var editGoalButton = document.getElementById("goal-edit-button") as HTMLButtonElement;
let proceed = false;

editGoalNamefield.onblur = function () {
  if (editGoalNamefield.value === "") {
    editNameError.innerText = "please enter a goal name.*";
    proceed = false;
  } else if (!isNaN(parseFloat(editGoalNamefield.value))) {
    editNameError.innerText = "please enter a valid Name.";
    proceed = false;
  } else {
    proceed = true;
  }
};

editGoalButton.onclick = function (event) {
  event.preventDefault();
  const goalID = editGoalID;
  const editName = editGoalNamefield.value;
  if (proceed) {
    editMainErrors.innerText = "";
    goalRepo.editGoal(goalID, editName);
  } else {
    editMainErrors.innerText = "Complete the fields to submit.*";
    return;
  }
};

var addContribution = document.getElementById("goal-contribution-submit-button") as HTMLButtonElement;
var contributionAmountInput = document.getElementById("contribution-amount") as HTMLInputElement;
var addContributionError = document.getElementById("add-contribution-error") as HTMLSpanElement;

let mayProceed = false;

contributionAmountInput.onblur = function () {
  let currentRemainingBalance = parseFloat(remainingBalance.innerText.replace("$", ""));

  const remainingStatus: number = currentRemainingBalance;

  if (contributionAmountInput.value === "") {
    addContributionError.innerText = "enter amount to contribute.*";
    mayProceed = false;
  } else if (
    isNaN(parseFloat(contributionAmountInput.value)) || 
    parseFloat(contributionAmountInput.value) <= 0 
  ) {
    addContributionError.innerText = "enter a valid amount.*";
    mayProceed = false;
  } else if (parseFloat(contributionAmountInput.value) > remainingStatus) {
    addContributionError.innerText = "Limited Balance.";
    console.log(remainingStatus);
    mayProceed = false;
  } else {
    addContributionError.innerText = "";
    mayProceed = true;
  }
};

// add contribution for the goal button ... 
addContribution.onclick = function (event) {
  event.preventDefault();
  let smallContribute = parseFloat(contributionAmountInput.value);

  const goalID = currentGoalID;
  console.log(goalID);

  if (mayProceed) {
    const userGoal = goalRepo.goals.filter((goal) => goal.goalId === currentGoalID);

    userGoal.forEach((goal) => {
        var temp: number = 0;
        if (goal.goalId === currentGoalID && goal.goalEmail === userEmails && goal.goalStatus !== "yes") {
          temp = goal.goalContribution + smallContribute;
        }

        if (!(temp <= goal.goalAmount && goal.goalId === currentGoalID)) {
          console.log(temp);
          addContributionError.innerText = "this contribution will exceed the goal.";
          return;
        } else {
          goal.goalContribution += smallContribute;
          if (goal.goalContribution === goal.goalAmount && goal.goalStatus !== "yes" ) {
            goal.goalStatus = "yes";
            closeModal();
            var goalCompletionPopup = document.getElementById("goal-completion-popup") as HTMLDivElement;
            var completedGoalName = document.getElementById("completed-goal-name") as HTMLSpanElement;
            var closePopup = document.getElementById("close-congratulation-popup") as HTMLSpanElement;
            var userNameElement = document.getElementById("user-name") as HTMLSpanElement;
            userNameElement.innerText = userNames;
            completedGoalName.innerText = goal.goalName;
              goalCompletionPopup.style.display = "block";
              closePopup.onclick = function(){
                goalCompletionPopup.style.display = "none";
                goalRepo.saveGoalsToLocalStorage();
                goalRepo.renderGoals();
                window.location.reload();
                goalRepo.calculateSavings();
              }
        }else{
          NormalcloseModal();
        } 
        }
    });  
  }
};

// Toggle Function for dark mode and light mode ... 

const themeToggle = document.getElementById("theme-toggle") as HTMLInputElement;

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.checked = true;
} else {
  document.body.classList.remove("dark-mode");
  themeToggle.checked = false;
}

themeToggle.onchange = function () {
  if (themeToggle.checked) {
    document.body.classList.add("dark-mode");
    document.getElementById("main-contents")?.classList.add("dark-mode");
    document.getElementById("sidebar-1")?.classList.add("dark-mode");
    document.getElementById("dark-header")?.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    document.getElementById("main-contents")?.classList.remove("dark-mode");
    document.getElementById("sidebar-1")?.classList.remove("dark-mode");
    document.getElementById("dark-header")?.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
};

const canvas = document.getElementById("myChart") as HTMLCanvasElement;

expenseRepo.calculateTotals();
expenseRepo.calculateSelectedExpense();

  Chart.register(PieController, ArcElement, Title, Legend, Tooltip);

if (canvas) {
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const data = {
      labels: ["Food", "Education", "Medicine", "others"],
      datasets: [
        {
          backgroundColor: [ "#b91d47", "#00aba9", "#2b5797", "#e8c3b9"],
          data: [
            (expenseRepo.getFoodSum() / expenseRepo.getTotalIncomes()) * 100,
            (expenseRepo.getEducationSum() / expenseRepo.getTotalIncomes()) * 100,
            (expenseRepo.getMedicineSum() / expenseRepo.getTotalIncomes()) * 100,
            (expenseRepo.getOthersSum() / expenseRepo.getTotalIncomes()) * 100,
          ],
        },
      ],
    };

    const config = {
      type: "pie" as const,
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: "Expense Statistics",
          },
          Legend: {
            display: true,
            position: "top",
          },
        },
      },
    };

    // Create and render the pie chart
    new Chart(ctx, config);
  } else {
    console.log("2D context not available.");
  }
} else {
  console.log("Canvas element not found.");
}

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn') as HTMLButtonElement;
  const sidebarMenu = document.getElementById('sidebar-menu') as HTMLElement;
  const closeSidebarMenuBtn = document.getElementById('close-sidebar-menu') as HTMLButtonElement;
  const goalsSection = document.getElementById('sidebar-1') as HTMLDivElement;
  const transactionsSection = document.getElementById('main-contents') as HTMLDivElement;
  const GoalPage = document.getElementById('menu-goals') as HTMLAnchorElement;
  const TransactionPage = document.getElementById('menu-transactions') as HTMLAnchorElement;

  hamburgerBtn.onclick = function(){
    sidebarMenu.style.display = 'block';
  }

  closeSidebarMenuBtn.onclick = function() {
    sidebarMenu.style.display = 'none';
  }

  GoalPage.onclick = function() {
    goalsSection.style.display = 'block';
    transactionsSection.style.display = 'none';
  }

  TransactionPage.onclick = function() {
    goalsSection.style.display = 'none';
    transactionsSection.style.display = 'block';
  }
});

export { userNames, userEmails, categoryProgress, totalSavingsdisplay };
