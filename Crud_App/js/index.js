// index.js
// 1) If 'pets' is not in localStorage, fetch 10 posts from JSONPlaceholder.
// 2) Split 'title' and 'body' to fill species/color/breed/favoriteToy, avoiding plain "N/A".
// 3) Store the processed data in localStorage, then render on the homepage.

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
            // Split title and body
            var titleWords = item.title ? item.title.split(" ") : [];
            var bodyWords = item.body ? item.body.split(" ") : [];
  
            return {
              id: "pet-" + (i + 1),
              name: item.title || "No Name",
              // species: first word of title
              species: titleWords[0] || "Unknown",
              // age: use item.id mod 10 for a quick numeric
              age: String(item.id % 10),
              // color: second word of title, if exists
              color: titleWords[1] || "N/A",
              // breed: first word of body
              breed: bodyWords[0] || "N/A",
              // favoriteToy: second word of body
              favoriteToy: bodyWords[1] || "N/A"
            };
          });
  
          localStorage.setItem("pets", JSON.stringify(pets));
          renderPets(pets);
        })
        .catch(function (err) {
          console.error("Fetch error:", err);
        });
    } else {
      // Already have 'pets' in localStorage
      var petsArray = JSON.parse(stored);
      renderPets(petsArray);
    }
  
    function renderPets(pets) {
      petList.innerHTML = "";
      pets.forEach(function (pet) {
        var li = document.createElement("li");
        li.innerHTML =
          '<a href="detail.html?id=' + encodeURIComponent(pet.id) + '">' + pet.name + "</a>";
        petList.appendChild(li);
      });
    }
  });
  