let displayArea = document.getElementById(
  "display-area-content"
) as HTMLElement;
let errorMessage = document.getElementById("display-error-msg") as HTMLElement;
function displayContent(num: string): void {
  displayArea.innerText += num;
  console.log("Entered here.");
}
function refresh(): void {
  displayArea.innerText = "";
}

function displayCalculate(): void {
  if (displayArea.innerText === "") {
    errorMessage.innerText = "Please enter a expression to evaluate.";
  } else {
    errorMessage.innerText = "";
    try {
        let result = eval(displayArea.innerText);
        if(result === Infinity || result === -Infinity){
          displayArea.textContent = "a number cannot be divided by 0";
        }
        else if(isNaN(result)){
          displayArea.textContent = "Zero cannot be '/' by zero."
        }
          else{
          displayArea.innerText = result.toFixed(3);
        }
    } catch (error) {
        errorMessage.innerText = "Invalid expression. Please try again.";
        displayArea.innerText=""
    }
  }
}
