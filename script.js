fetch('./data.json')
.then(res => res.json())
.then(d => {
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
    document.getElementById(id).innerHTML =
      "<div class='empty'>No data available</div>";
    return;
  }

  list.forEach(s => {
    html += `
      <div class="stock">
        <div class="symbol">${s.symbol}</div>
        <div class="price">${s.price}</div>
        <div class="${s.change >= 0 ? 'green' : 'red'}">
          ${s.change}%
        </div>
      </div>
    `;
  });

  document.getElementById(id).innerHTML = html;
}
