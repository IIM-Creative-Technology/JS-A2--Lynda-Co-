    const url = 'https://pokeapi.co/api/v2/pal-park-area/';
    const url1 = 'https://pokeapi.co/api/v2/pal-park-area/1/';
    const map = document.querySelector("#map");
    let villes = document.querySelector('#villes')
    let pokevilles = document.querySelector('#pokémons')
    let zoom = 1;

    const ZOOM_SPEED = 0.1;
    
    document.addEventListener("wheel", function(e) {  
        
        if(e.deltaY > 0){    
            map.style.transform = `scale(${zoom += ZOOM_SPEED})`;  
        }else{    
            map.style.transform = `scale(${zoom -= ZOOM_SPEED})`;  }
        
    
    });

  
function Showregion(){

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
      let pokeapi = data.results;
      console.log(pokeapi)
      pokeapi.forEach(p => {
        let ul = document.createElement('ul')
        ul.innerHTML = "<button onclick='pokeville()' >" + p.name + "</button>" ;
        villes.appendChild(ul)
      });        
      
    })
    .catch(function(error) {
      console.log(error);
    });

}

Showregion()

function pokeville(){

    fetch(url1)
    .then((resp) => resp.json())
    .then(function(data) {
      let pokeapi = data.names;

      pokeapi.forEach(p => {
        let ul = document.createElement('ul')
        ul.innerHTML = "<p>" + p.pokemon_spieces + "</p>"  ;
        pokevilles.appendChild(ul)
      });        
      
    })
    .catch(function(error) {
      console.log(error);
    });

}

pokeville() 
    




    




