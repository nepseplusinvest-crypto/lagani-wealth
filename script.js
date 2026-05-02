function loadHistory(){
  let date = document.getElementById("datePick").value;

  fetch(`./history-${date}.json`)
  .then(res => res.json())
  .then(d => {
    render("all", d.all);
    render("gainers", d.gainers);
    render("losers", d.losers);
  })
  .catch(() => alert("No data for this date"));
}
