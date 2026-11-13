// selectores
let container = document.querySelector(".pokemons")
let selectPage = document.querySelector("#limit");
let navigation = document.querySelector(".navegation");

const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";


const getPokemons = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(responseJson => {
        showPokemons(responseJson.results)
    })
}

const showPokemons = (array) => {

    array.map(item => {
       fetch(item.url) 
       .then(response => response.json())
       .then(data => {
        loadCard(data);
       })
    })
}

const loadCard = (data) => {
    console.log(data)
    const imagen =  data.sprites.other.home.front_default
    const name = data.name

    let card = document.createElement("ul");

    let content = `
      <img src="${imagen}" alt="${name}">
      <p>${name}</p>
      <p>${data.order}</p>
    
    `

    card.innerHTML = content;
    container.appendChild(card)
}

getPokemons(`${POKE_URL}?offset=0&limit=40`)