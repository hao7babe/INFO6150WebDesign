fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => res.json())
  .then(posts => {
    const pets = posts.slice(0, 10).map((post, index) => ({
      id: index + 1,
      name: post.title.split(' ')[0],
      description: post.body,
      type: ["cat", "dog", "rabbit", "hamster"][Math.floor(Math.random() * 4)],
      age: Math.floor(Math.random() * 10) + 1
    }));
    
    localStorage.setItem("pets", JSON.stringify(pets));

    const list = document.getElementById("pet-list");
    pets.forEach(pet => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="detail.html?id=${pet.id}">${pet.name} (${pet.type})</a>`;
      list.appendChild(li);
    });
  }); 