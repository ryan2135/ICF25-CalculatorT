let historyItems = [];

function calculate(operation) {
  const num1 = parseFloat(document.getElementById("num1").value);
  const num2 = parseFloat(document.getElementById("num2").value);
  const decimals = parseInt(document.getElementById("decimals").value);
  const resultField = document.getElementById("result");

  if (isNaN(num1) || isNaN(num2)) {
    resultField.textContent = "⚠️ Please enter valid numbers.";
    resultField.classList.add("text-danger");
    return;
  }

  let result;
  let symbol;

  switch (operation) {
    case "add":
      result = num1 + num2;
      symbol = "+";
      break;
    case "subtract":
      result = num1 - num2;
      symbol = "−";
      break;
    case "multiply":
      result = num1 * num2;
      symbol = "×";
      break;
    case "divide":
      if (num2 === 0) {
        resultField.textContent = "❌ Cannot divide by zero.";
        resultField.classList.add("text-danger");
        return;
      }
      result = num1 / num2;
      symbol = "÷";
      break;
    default:
      result = NaN;
  }

  const rounded = Number(result.toFixed(decimals));
  resultField.textContent = rounded;
  resultField.classList.remove("text-danger");

  // Save to history (max 5 items)
  const record = `${num1} ${symbol} ${num2} = ${rounded}`;
  historyItems.unshift(record);
  renderHistory();
}

function clearAll() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("result").textContent = "—";
  historyItems = [];
  renderHistory();
}

function renderHistory() {
  const historyList = document.getElementById("history");
  historyList.innerHTML = "";
  historyItems.slice(0, 5).forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = item;
    historyList.appendChild(li);
  });
}