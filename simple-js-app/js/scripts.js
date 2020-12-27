let pokemonRepository = (function() {
  let repository = [
  {
    name: 'Wigglytuff',
    weight: 12,
    types: ['fairy', 'normal']
  },
  {
    name: 'Balbasar',
    weight: 7,
    types: ['grass', 'poison']
  },
  {
    name: 'Wartortle',
    weight: 22,
    types: ['monster', 'water']
  },
];

  function add(pokemon){
   repository.push(pokemon);
 }
  function getAll() {
    return repository;
  }
function addListItem(pokemon){
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  //add event listener
  button.addEventListener('click', function () {
  showDetails(pokemon)
});
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
}
//callback to addEventListener
function showDetails(pokemon){
  console.log(pokemon.name);
};

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();



pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
