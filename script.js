let globalData = [];

fetch('./data.json')
.then(res => res.json())
.then(d => {
  globalData = d.all || [];

  render("gainers", d.gainers);
  render("losers", d.losers);
  render("all", d.all);

  document.getElementById("status").innerText =
    "Last updated: " + new Date().toLocaleString();
})
.catch(() => {
  document.getElementById("status").innerText =
    "Using cached data...";
});

function render(id, list){
  let html = "";

  if(!list || list.length === 0){
    document.getElementById(id).innerHTML = "No data";
    return;
  }

  list.forEach(s => {
    html += `
      <div class="stock">
        <span>${s.symbol}</span>
        <span>${s.price} (${s.change}%)</span>
      </div>
    `;
  });

  document.getElementById(id).innerHTML = html;
}

/* 🔥 HISTORY FUNCTION */
function loadHistory(){
  let date = document.getElementById("datePick").value;

  if(!date){
    alert("Please select date");
    return;
  }

  fetch(`./history-${date}.json`)
  .then(res => {
    if(!res.ok) throw new Error("No file");
    return res.json();
  })
  .then(d => {
    render("gainers", d.gainers);
    render("losers", d.losers);
    render("all", d.all);

    document.getElementById("status").innerText =
      "History loaded: " + date;
  })
  .catch(() => {
    alert("No history data found for this date");
  });
}
