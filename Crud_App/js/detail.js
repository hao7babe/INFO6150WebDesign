// detail.js
// Reads the 'id' from the URL, looks up the pet in localStorage, and displays all fields.

document.addEventListener("DOMContentLoaded", function () {
    var details = document.getElementById("pet-details");
    var id = getParam("id");
    if (!id) {
      details.textContent = "No pet ID provided.";
      return;
    }
  
    var pets = JSON.parse(localStorage.getItem("pets") || "[]");
    var pet = pets.find(function (p) { return p.id === id; });
    if (!pet) {
      details.textContent = "Pet not found in localStorage.";
      return;
    }
  
    details.innerHTML = 
      "<p><strong>ID:</strong> " + pet.id + "</p>" +
      "<p><strong>Name:</strong> " + pet.name + "</p>" +
      "<p><strong>Species:</strong> " + pet.species + "</p>" +
      "<p><strong>Age:</strong> " + pet.age + "</p>" +
      "<p><strong>Color:</strong> " + pet.color + "</p>" +
      "<p><strong>Breed:</strong> " + pet.breed + "</p>" +
      "<p><strong>Favorite Toy:</strong> " + pet.favoriteToy + "</p>";
  
    function getParam(key) {
      return new URLSearchParams(window.location.search).get(key);
    }
  });
  