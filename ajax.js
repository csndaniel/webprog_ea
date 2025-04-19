const apiUrl = "http://http://elsowebdb.nhely.hu/AjaxApi.php"; 

function validateInputs(name, height, weight) {
  if (!name || !height || !weight) {
    alert("Minden mezőt ki kell tölteni!");
    return false;
  }

  if (name.length > 30 || height.length > 30 || weight.length > 30) {
    alert("A mezők maximum 30 karakter hosszúak lehetnek!");
    return false;
  }

  return true;
}

// ---- READ ----
function readData() {
  const code = document.getElementById("code-read").value || "tesztKod";

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=read&code=${encodeURIComponent(code)}`
  })
    .then(res => res.json())
    .then(data => {
      const list = data.list || [];
      const dataDiv = document.getElementById("data-list");
      const statsDiv = document.getElementById("stats");
      dataDiv.innerHTML = "";
      statsDiv.innerHTML = "";

      let sum = 0, max = 0;

      list.forEach(item => {
        dataDiv.innerHTML += `<div>ID: ${item.id} | Név: ${item.name} | Magasság: ${item.height} | Súly: ${item.weight}</div>`;
        const h = parseFloat(item.height);
        if (!isNaN(h)) {
          sum += h;
          if (h > max) max = h;
        }
      });

      const avg = list.length ? (sum / list.length).toFixed(2) : 0;
      statsDiv.innerHTML = `<p>Magasság összeg: ${sum}</p><p>Átlag: ${avg}</p><p>Legnagyobb: ${max}</p>`;
    });
}

// ---- CREATE ----
function createData() {
  const name = document.getElementById("name-create").value;
  const height = document.getElementById("height-create").value;
  const weight = document.getElementById("weight-create").value;
  const code = document.getElementById("code-create").value || "tesztKod";

  if (!validateInputs(name, height, weight)) return;

  const body = `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  })
    .then(res => res.json())
    .then(result => {
      document.getElementById("create-result").innerText = result == 1 ? "Sikeres hozzáadás!" : "Nem sikerült hozzáadni.";
    });
}

// ---- GET DATA FOR UPDATE ----
function getDataForId() {
  const id = document.getElementById("id-update").value;
  const code = document.getElementById("code-update").value || "tesztKod";

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `op=read&code=${code}`
  })
    .then(res => res.json())
    .then(data => {
      const found = (data.list || []).find(item => item.id === id);
      if (found) {
        document.getElementById("name-update").value = found.name;
        document.getElementById("height-update").value = found.height;
        document.getElementById("weight-update").value = found.weight;
      } else {
        alert("Nem található adat ezzel az ID-vel.");
      }
    });
}

// ---- UPDATE ----
function updateData() {
  const id = document.getElementById("id-update").value;
  const name = document.getElementById("name-update").value;
  const height = document.getElementById("height-update").value;
  const weight = document.getElementById("weight-update").value;
  const code = document.getElementById("code-update").value || "tesztKod";

  if (!validateInputs(name, height, weight)) return;

  const body = `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  })
    .then(res => res.json())
    .then(result => {
      document.getElementById("update-result").innerText = result == 1 ? "Sikeres frissítés!" : "Nem sikerült frissíteni.";
    });
}

// ---- DELETE ----
function deleteData() {
  const id = document.getElementById("id-delete").value;
  const code = document.getElementById("code-delete").value || "tesztKod";

  const body = `op=delete&id=${id}&code=${code}`;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  })
    .then(res => res.json())
    .then(result => {
      document.getElementById("delete-result").innerText = result == 1 ? "Sikeres törlés!" : "Nem sikerült törölni.";
    });
}