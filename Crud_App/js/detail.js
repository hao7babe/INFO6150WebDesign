// detail.js
// Reads the 'id' from the URL, looks up the pet in localStorage, and displays all fields.

document.addEventListener("DOMContentLoaded", function () {
    var details = document.getElementById("pet-details");
    var id = getParam("id");
    
    console.log("Current URL:", window.location.href);
    console.log("Looking for pet with ID:", id);
    console.log("Type of ID:", typeof id);
    
    if (!id) {
      details.textContent = "No pet ID provided.";
      return;
    }
  
    var pets = JSON.parse(localStorage.getItem("pets") || "[]");
    console.log("All pets in localStorage:", pets);
    console.log("Number of pets:", pets.length);
    
    var pet = pets.find(function (p) { 
      console.log("Comparing pet ID:", p.id, "with search ID:", id);
      console.log("Types - Pet ID:", typeof p.id, "Search ID:", typeof id);
      return p.id === id; 
    });
    
    if (!pet) {
      details.innerHTML = 
        "<p class='error'>Pet not found with ID: " + id + "</p>" +
        "<p>Available pets in localStorage:</p>" +
        "<ul>" + pets.map(p => "<li>ID: " + p.id + " (Type: " + typeof p.id + "), Name: " + p.name + "</li>").join("") + "</ul>";
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
      var params = new URLSearchParams(window.location.search);
      console.log("All URL parameters:", Array.from(params.entries()));
      return params.get(key);
    }
  });
  