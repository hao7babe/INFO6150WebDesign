// create.js
// Mocks a POST request to JSONPlaceholder, then adds the new pet to localStorage and redirects home.

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("create-pet-form");
    var result = document.getElementById("result");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("name").value.trim();
      var species = document.getElementById("species").value.trim();
      var age = document.getElementById("age").value.trim();
      var color = document.getElementById("color").value.trim();
      var breed = document.getElementById("breed").value.trim();
      var favoriteToy = document.getElementById("favoriteToy").value.trim();
  
      // 输入验证
      if (!name || !species || !age || !color || !breed || !favoriteToy) {
        result.textContent = "Please fill in all fields.";
        return;
      }

      // 年龄验证
      var ageNum = parseInt(age);
      if (isNaN(ageNum) || ageNum < 0) {
        result.textContent = "Age must be a positive number.";
        return;
      }

      // HTML 转义
      function escapeHtml(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
      }

      name = escapeHtml(name);
      species = escapeHtml(species);
      age = escapeHtml(age);
      color = escapeHtml(color);
      breed = escapeHtml(breed);
      favoriteToy = escapeHtml(favoriteToy);
  
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title: name })
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          var newPet = {
            id: "local-" + Date.now(),
            name: name,
            species: species,
            age: age,
            color: color,
            breed: breed,
            favoriteToy: favoriteToy
          };
          addPetToStorage(newPet);
  
          result.textContent = "Created pet with mock ID: " + data.id + ". Redirecting...";
          setTimeout(function () {
            window.location.href = "index.html";
          }, 1000);
        })
        .catch(function (err) {
          console.error("Create error:", err);
          result.textContent = "Failed to create pet.";
        });
    });
  
    function addPetToStorage(pet) {
      var pets = JSON.parse(localStorage.getItem("pets") || "[]");
      pets.push(pet);
      localStorage.setItem("pets", JSON.stringify(pets));
    }
  });
  