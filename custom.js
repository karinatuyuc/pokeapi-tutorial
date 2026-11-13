// selectores
let container = document.querySelector(".pokemons")
let selectPage = document.querySelector("#limit");
let navigation = document.querySelector(".numbers");

const POKE_URL = "https://pokeapi.co/api/v2/pokemon/";
let = nextLink = "";
let = prevLink = "";
let count = 0;
let perPage = 40;
let currentPage = 0;

const changePag = (value) => {
    const newUrl = `${POKE_URL}?limit=${value}`
    perPage = value;
    getPokemons(newUrl)
}

const prev = () => {
    getPokemons(prevLink)
}

const next = () => {
    getPokemons(nextLink)
}
 
const getPokemons = (url) => {

    let params = new URLSearchParams(url.split('?')[1]);
    currentPage = params.get("offset") / perPage;

    fetch(url)
    .then(response => response.json())
    
    .then(responseJson => {
        console.log(responseJson)
        nextLink = responseJson.next;
        prevLink = responseJson.previous;
        count = responseJson.count
        addNumber();
        showPokemons(responseJson.results)
    })
}

const showPokemons = (array) => {
    clearContainer()

    array.map(item => {
       fetch(item.url) 
       .then(response => response.json())
       .then(data => {
        loadCard(data);
       })
    })
}

const loadCard = (data) => {
    //console.log(data)
    const imagen =  data.sprites.other.home.front_default;
    const newImage = imagen ? imagen : "./images/defualt.png";
    const name = data.name

    let card = document.createElement("ul");

    let content = `
      <img src="${newImage}" alt="${name}">
      <p>${name}</p>
      <p class="order">#${data.order}</p>
    
    `
    card.innerHTML = content;
    container.appendChild(card);
}

const addNumber = () => {
    clearNavigation();
    const page = count / perPage;
    for (let i = 0; i < page; i++) {
        
        let number = document.createElement("span");
        number.classList.add(`element-${i}`);
        const numLink = `<button onclick="actionNum(${i})">${i}</button>`
        number.innerHTML = numLink;
        navigation.appendChild(number)
        
    }
    addFocusClass();
}

const actionNum = (index) => {
    const newUrl = `${POKE_URL}?offset=${index*perPage}&limit=${perPage}`;
    getPokemons(newUrl)
}

const addFocusClass = () => {
    const span = document.querySelector(`.element-${currentPage}`);
    span.classList.add('current')
}

const clearContainer = () => container.innerHTML = "";
const clearNavigation = () => navigation.innerHTML = '';

getPokemons(`${POKE_URL}?offset=0&limit=40`)