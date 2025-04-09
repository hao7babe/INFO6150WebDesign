// edit.js
// Loads pet data based on ID from URL, allows editing, and updates localStorage

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("edit-pet-form");
    var result = document.getElementById("result");
    var id = new URLSearchParams(window.location.search).get("id");
    
    if (!id) {
        result.textContent = "No pet ID provided.";
        return;
    }

    // Load pet data
    var pets = JSON.parse(localStorage.getItem("pets") || "[]");
    var pet = pets.find(function (p) { return p.id === id; });
    
    if (!pet) {
        result.textContent = "Pet not found.";
        return;
    }

    // Pre-fill form
    document.getElementById("name").value = pet.name;
    document.getElementById("species").value = pet.species;
    document.getElementById("age").value = pet.age;
    document.getElementById("color").value = pet.color;
    document.getElementById("breed").value = pet.breed;
    document.getElementById("favoriteToy").value = pet.favoriteToy;

    // Handle form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Get form values
        var updatedPet = {
            id: id,
            name: document.getElementById("name").value.trim(),
            species: document.getElementById("species").value.trim(),
            age: document.getElementById("age").value.trim(),
            color: document.getElementById("color").value.trim(),
            breed: document.getElementById("breed").value.trim(),
            favoriteToy: document.getElementById("favoriteToy").value.trim()
        };

        // Update pet in localStorage
        var index = pets.findIndex(function (p) { return p.id === id; });
        if (index !== -1) {
            pets[index] = updatedPet;
            localStorage.setItem("pets", JSON.stringify(pets));
            
            result.textContent = "Pet updated successfully. Redirecting...";
            setTimeout(function () {
                window.location.href = "index.html";
            }, 1000);
        } else {
            result.textContent = "Error updating pet.";
        }
    });
}); 