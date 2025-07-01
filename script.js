const items = ["belt","hankachi", "nail", "socks"];
const labels = {
  belt: "ベルト",hankachi: "ハンカチ",nail: "爪", socks: "靴下"
};

let currentValues = {};
let savedValues = {};

function generateTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";
  items.forEach(item => {
    let row = `<tr><td>${labels[item]}</td>`;
    for (let i = 1; i <= 6; i++) {
      const id = `${item}${i}`;
      currentValues[id] = 0;
      row += `<td>
        <button onclick="changeValue('${id}', -1)">-</button>
        <span id="${id}">0</span>
        <button onclick="changeValue('${id}', 1)">+</button>
      </td>`;
    }
    row += `<td><span id="${item}Sum">0</span></td></tr>`;
    tbody.innerHTML += row;
  });
}

function changeValue(id, delta) {
  const span = document.getElementById(id);
  let value = parseInt(span.textContent);
  value = Math.max(0, value + delta);
  span.textContent = value;
  currentValues[id] = value;

  const item = id.replace(/\d$/, '');
  updateSum(item);
}

function updateSum(item) {
  let sum = 0;
  for (let i = 1; i <= 6; i++) {
    const value = parseInt(document.getElementById(`${item}${i}`).textContent);
    sum += value;
  }
  document.getElementById(`${item}Sum`).textContent = sum;
}

function saveData() {
  localStorage.setItem("checkValues", JSON.stringify(currentValues));
  alert("保存しました。");
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("checkValues") || "{}");
  if (Object.keys(data).length === 0) {
    alert("保存されたデータがありません。");
    return;
  }

  savedValues = { ...data };
  for (const id in data) {
    const span = document.getElementById(id);
    if (span) {
      span.textContent = data[id];
      currentValues[id] = data[id];
    }
  }

  items.forEach(updateSum);
  alert("前回の結果を表示しました。");
}

function resetData() {
  for (const id in currentValues) {
    const span = document.getElementById(id);
    span.textContent = currentValues[id];
  }

  items.forEach(updateSum);
  alert("現在の値に戻しました。");
}
function loadData() {
  const data = JSON.parse(localStorage.getItem("checkValues") || "{}");
  if (Object.keys(data).length === 0) {
    alert("保存されたデータがありません。");
    return;
  }

  savedValues = { ...data };

  for (const id in data) {
    const span = document.getElementById(id);
    if (span) {
      const oldValue = parseInt(data[id]);
      const newValue = parseInt(span.textContent);
      const diff = oldValue - newValue;

      span.textContent = oldValue;

      // 差分表示
      let diffElement = document.getElementById(id + "_diff");
      if (!diffElement) {
        diffElement = document.createElement("div");
        diffElement.id = id + "_diff";
        span.parentElement.appendChild(diffElement);
      }

      if (diff > 0) {
        diffElement.textContent = `（+${diff}）`;
        diffElement.style.color = "blue";
      } else if (diff < 0) {
        diffElement.textContent = `（${diff}）`;
        diffElement.style.color = "red";
      } else {
        diffElement.textContent = `（±0）`;
        diffElement.style.color = "gray";
      }

      currentValues[id] = oldValue;
    }
  }

  items.forEach(updateSum);
  alert("前回の結果を表示しました。");
}

window.onload = generateTable;
function resetData() {
  for (const id in currentValues) {
    const span = document.getElementById(id);
    span.textContent = currentValues[id];

    // 差分を削除
    const diffElement = document.getElementById(id + "_diff");
    if (diffElement) {
      diffElement.remove();
    }
  }

  items.forEach(updateSum);
  alert("現在の値に戻しました。");
}
