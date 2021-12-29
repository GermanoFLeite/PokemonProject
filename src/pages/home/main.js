{() => {

}}


var next;
var previous;
var results = [];


fetch(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`)
    .then(response => response.json())
    .then(data => {
        next = data.next;
        previous = data.previous;
        results = data.results
        PegarPokemons()
    })
    .catch(e => console.log('Deu Erro ' + e.message));


function PegarPokemons(){
    for(const result of results){
        fetch(result.url)
        .then(response => response.json())
        .then(data => {            
            var id = data.id;
            var nome = data.name;
            var tipo = data.types[0].type.name;
            var img = data.sprites.other.dream_world.front_default;
            ListaPokemons(id,nome,tipo,img);
        })
        .catch(e => console.log('Deu Erro ' + e.message));
    
    }
} 

function ListaPokemons(id, name,type,img){
    const pokeLista = document.querySelector('[data-list]')

    const pokeItem = document.createElement('div')

    pokeItem.classList.add('card', 'mb-3', 'card-pokemon', 'p-3')

    const conteudo = `
    <div class="row g-0">         
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">#${id}</h5>
        <h5 class="mt-3">${name}</h5>              
        <p class="card-text">
          <button class="tipo-pokemon btn btn-${type} mt-5  ">
          <img src="../../assets/icons/${type}.sgv"> ${type}
          </button>                
        </p>
      </div>            
    </div>
    <div class="col-md-4">
      <img src="${img}" class="img-fluid rounded-start pokemon" alt="imagem pokemon">
    </div>
  </div>
  `
  pokeItem.innerHTML = conteudo

  pokeLista.appendChild(pokeItem)
}