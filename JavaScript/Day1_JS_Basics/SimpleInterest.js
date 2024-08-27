let inputPrincipal = document.getElementById("principal");
      let inputRateOfInterest = document.getElementById("rate-of-interest");
      let inputTime = document.getElementById("time");

      inputPrincipal.onfocus = function () {
        inputPrincipal.classList.remove("error-msg");
        document.getElementById("principal-error").textContent = "";
      };
      inputRateOfInterest.onfocus = function () {
        inputRateOfInterest.classList.remove("error-msg");
        document.getElementById("rate-of-interest-error").textContent = "";
      };
      inputTime.onfocus = function () {
        inputTime.classList.remove("error-msg");
        document.getElementById("time-years-error").textContent = "";
      };

      inputPrincipal.onblur = function () {
        let principal = inputPrincipal.value;
        if (principal === "") {
          document.getElementById("principal-error").textContent =
            "Principal is required.";
          inputPrincipal.classList.add("error-msg");
        } else if (isNaN(principal)) {
          document.getElementById("principal-error").textContent =
            "Please enter a valid numeric value for Principal.";
          inputPrincipal.classList.add("error-msg");
        } else {
          principal = parseFloat(principal);
          if (principal < 500 || principal > 10000) {
            document.getElementById("principal-error").textContent =
              "Principal should be between 500 - 10000.";
            inputPrincipal.classList.add("error-msg");
          }
        }
      };

      inputRateOfInterest.onblur = function () {
        let rate = inputRateOfInterest.value;
        if (rate === "") {
          document.getElementById("rate-of-interest-error").textContent =
            "Rate of Interest is required.";
          inputRateOfInterest.classList.add("error-msg");
        } else if (isNaN(rate)) {
          document.getElementById("rate-of-interest-error").textContent =
            "Please enter a valid numeric value for Rate of Interest.";
          inputRateOfInterest.classList.add("error-msg");
        } else {
          rate = parseFloat(rate);
          if (rate <= 0) {
            document.getElementById("rate-of-interest-error").textContent =
              "Rate of Interest should be a positive number.";
            inputRateOfInterest.classList.add("error-msg");
          }
        }
      };

      inputTime.onblur = function () {
        let time = inputTime.value;
        if (time === "") {
          document.getElementById("time-years-error").textContent =
            "Time is required.";
          inputTime.classList.add("error-msg");
        } else if (isNaN(time)) {
          document.getElementById("time-years-error").textContent =
            "Please enter a valid numeric value for Time.";
          inputTime.classList.add("error-msg");
        } else {
          time = parseFloat(time);
          if (time <= 0) {
            document.getElementById("time-years-error").textContent =
              "Time should be a positive number.";
            inputTime.classList.add("error-msg");
          }
        }
      };

      document
        .getElementById("interest-form")
        .addEventListener("submit", function validation(event) {
          event.preventDefault();
          let principal = parseFloat(
            document.getElementById("principal").value
          );
          let rate = parseFloat(
            document.getElementById("rate-of-interest").value
          );
          let time = parseFloat(document.getElementById("time").value);
          let isValid = true;

          if (isNaN(principal) || principal === "") {
            inputPrincipal.style.borderColor = "red";
            isValid = false;
          }
          if (isNaN(rate) || rate === "") {
            inputRateOfInterest.style.borderColor = "red";
            isValid = false;
          }
          if (isNaN(time) || time === "") {
            inputTime.style.borderColor = "red";
            isValid = false;
          }

          if (isValid) {
            calculateSI();
          }
        });
      function calculateSI() {
        var principal = parseFloat(document.getElementById("principal").value);
        var rate = parseFloat(
          document.getElementById("rate-of-interest").value
        );
        var time = parseFloat(document.getElementById("time").value);
        if (principal >= 500 && principal <= 10000) {
          if (principal < 1000) {
            if (rate < 5) {
              rate = 5;
            }
          } else if (principal >= 1000 && principal <= 5000) {
            if (rate < 7) {
              rate = 7;
            }
          } else {
            if (rate < 10) {
              rate = 10;
            }
          }

          if (time > 5) {
            rate += 2;
            console.log(rate);
            var addInfo = document.getElementById("addition-info");
            addInfo.textContent =
              "you have got an extra 2% rate of interest for extra time period.";
          } else {
            var addInfo = document.getElementById("ans3");
            addInfo.textContent = " No bonus rate of interest.";
          }
          var total = (principal * rate * time) / 100;
          var SI = document.getElementById("ans1");
          var totalAmount = document.getElementById("ans2");
          SI.textContent = total.toFixed(2);
          var ans = principal + parseFloat(total);
          totalAmount.textContent = ans.toFixed(2);
        } else {
          alert(
            "please enter an amount that is greater than 500 and less than 10000"
          );
        }
      }