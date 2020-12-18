let pokemonRepository = (function() {
  let pokemonList = [
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

function getAll() {
  return pokemonList;
}

function add(pokemon) {
  pokemonList.push(pokemon);
}
  return {
    getAll: getAll,
    add: add
    };
})();


pokemonRepository.getAll().forEach(function(pokemon) {
  document.write(pokemon.name + " (weight:" + pokemon.weight + ") ");
//add a conditional to highlight the biggest pokemon
if (pokemon.weight >20){
  document.write("-Wow! That's a big pokemon!");
}
//add line break after each iteration
document.write('<br>');
});
