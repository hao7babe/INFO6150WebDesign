// index.js
// 1) If 'pets' is not in localStorage, fetch 10 posts from JSONPlaceholder.
// 2) Use title and body to fill all pet information fields.

document.addEventListener("DOMContentLoaded", function () {
    var petList = document.getElementById("pet-list");
    var stored = localStorage.getItem("pets");
  
    if (!stored) {
      fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          var pets = data.map(function (item, i) {
            // Split title and body into words
            var titleWords = item.title ? item.title.split(" ") : [];
            var bodyWords = item.body ? item.body.split(" ") : [];
            
            // Use title words for name and species
            var name = titleWords.slice(0, 2).join(" ") || "No Name";
            var species = titleWords[2] || "Unknown";
            
            // Use body words for other fields
            var color = bodyWords[0] || "N/A";
            var breed = bodyWords[1] || "N/A";
            var favoriteToy = bodyWords[2] || "N/A";
            
            // Use item.id for age, but make it more reasonable (1-20)
            var age = String((item.id % 20) + 1);
  
            return {
              id: "pet-" + (i + 1),
              name: name,
              species: species,
              age: age,
              color: color,
              breed: breed,
              favoriteToy: favoriteToy
            };
          });
  
          localStorage.setItem("pets", JSON.stringify(pets));
          renderPets(pets);
        })
        .catch(function (err) {
          console.error("Fetch error:", err);
          petList.innerHTML = '<li class="error">Failed to load pets. Please try again later.</li>';
        });
    } else {
      // Already have 'pets' in localStorage
      try {
        var petsArray = JSON.parse(stored);
        renderPets(petsArray);
      } catch (err) {
        console.error("Parse error:", err);
        petList.innerHTML = '<li class="error">Failed to load pets data. Please refresh the page.</li>';
      }
    }
  
    function renderPets(pets) {
      petList.innerHTML = "";
      pets.forEach(function (pet) {
        var li = document.createElement("li");
        li.innerHTML = `
          <div class="pet-item">
            <a href="detail.html?id=${encodeURIComponent(pet.id)}">${pet.name}</a>
            <div class="pet-actions">
              <button onclick="window.location.href='edit.html?id=${encodeURIComponent(pet.id)}'">Edit</button>
              <button onclick="deletePet('${pet.id}')">Delete</button>
            </div>
          </div>
        `;
        petList.appendChild(li);
      });
    }
  });
  
  function deletePet(id) {
    if (confirm("Are you sure you want to delete this pet?")) {
      var pets = JSON.parse(localStorage.getItem("pets") || "[]");
      var updatedPets = pets.filter(function (pet) { return pet.id !== id; });
      localStorage.setItem("pets", JSON.stringify(updatedPets));
      window.location.reload(); // Refresh to show updated list
    }
  }
  