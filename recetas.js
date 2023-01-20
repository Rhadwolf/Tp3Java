const characters = document.querySelector("#characters")

fetch("https://rickandmortyapi.com/api/character")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data.results);

    data.results.map ((item) => {
        const content = document.createElement ("div");
        content.innerHTML =`
        <h4>${item.name}</h4>
        <img src="${item.image}"></img>
        `;
        characters.append(content);
    })
    .catch((error) => console.log(error)); 
});