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
.catch(err => {
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
