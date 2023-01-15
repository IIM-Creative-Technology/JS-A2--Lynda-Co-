const poke_container = document.getElementById('poke_container');
const pokemons_number = 1;
var pokeList = []
const getAllPokemons = async () => {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1279")
    let pokemons = res.json()
    pokemons.then(data => {
        let pokemons =  data.results
        pokemons.forEach(pokemon => {
            pokeList.push(pokemon.name)

        })
    })

}
getAllPokemons()


const fetchPokemons = async () => {
    /* console.log('salut'); */
    for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
        /* console.log('salut'); */
    }
};
const getPokemon = async id => {
  let url =`https://pokeapi.co/api/v2/pokemon/${id}`;
  let res = await fetch(url);
  let pokemon = await res.json();
  console.log(pokemon);
  createPokemonCard(pokemon)
}


const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div');
  pokemonEl.classList.add('pokemon');
  const pokeInnerHTML = `
  <div class='new_pokemon' draggable="true">
  <h2>${pokemon.name}</h2>
  <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
  <h3>
  ${pokemon.types[0].type.name}
  </h3>
  
  </div>`;
  pokemonEl.insertAdjacentHTML("beforeend",pokeInnerHTML);
  poke_container.appendChild(pokemonEl);
}

fetchPokemons();

/* function findpokemons(search, pokemon){
  return pokemon.filter(pokemon =>{
      const regex = new RegExp(search, `gi` );
      return pokemon.name.match(regex)
  });
} */
const showresults = async(pokemon) =>{
  //console.log(pokemon.explicitOriginalTarget.value)
  let search = document.querySelector('input').value
  let filteredPokemons = pokeList.filter(pokemon => pokemon.startsWith(search))
  console.log(filteredPokemons)

  // remove all the previous results
  while (result.firstChild) {
      result.removeChild(result.firstChild);
  }

  console.log(filteredPokemons.length)

  if (filteredPokemons.length !== 0 && filteredPokemons.length !== 1279) {
      filteredPokemons = filteredPokemons.slice(0, 8)
      for(const pokemon of filteredPokemons) {
          //console.log(pokemon)
          let url =`https://pokeapi.co/api/v2/pokemon/${pokemon}`;
          let res = await fetch(url);
          let pokemonData = await res.json();
          let HTML =
          /*<span>${pokemon.stats[0].type.name}</span> />*/ `
      <li>
          <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}"
          <span>${pokemonData.name}</span>
          
      </li>`;
          result.insertAdjacentHTML("beforeend", HTML);
      }
  }

  // console.log(pokemonData);

  //const tableresult = fetchPokemons(this.value.pokemons);

}
const input = document.querySelector('input');
const result = document.querySelector('ul');

//input.addEventListener('change',showresults);
input.addEventListener('keyup',showresults);

let dragged;

/* events fired on the draggable target */
const source = document.getElementById("poke_container");
source.addEventListener("drag", (event) => {
  console.log("dragging");
});

source.addEventListener("dragstart", (event) => {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.classList.add("dragging");
});

source.addEventListener("dragend", (event) => {
  // reset the transparency
  event.target.classList.remove("dragging");
});

/* events fired on the drop targets */
const target = document.getElementById("droptarget");
target.addEventListener("dragover", (event) => {
  // prevent default to allow drop
  event.preventDefault();
}, false);

target.addEventListener("dragenter", (event) => {
  // highlight potential drop target when the poke_container element enters it
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.add("dragover");
  }
});

target.addEventListener("dragleave", (event) => {
  // reset background of potential drop target when the poke_container element leaves it
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.remove("dragover");
  }
});

target.addEventListener("drop", (event) => {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.classList.contains("dropzone")) {
    event.target.classList.remove("dragover");
    event.target.appendChild(dragged);
  }
});