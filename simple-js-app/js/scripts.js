//let pokemonList = [
  //{name: 'Wigglytuff', weight: 12, types: ['fairy', 'normal']},
  //{name: 'Bulbasaur', weight: 7, types: ['grass', 'poison']},
  //{name: 'Wartortle', weight: 22, types: ['monster', 'water']}
//];

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
  }
];

for (let i = 0; i < pokemonList.length; i++){
  document.write(pokemonList[i].name + " (weight:" + pokemonList[i].weight + ") ");
  //add a conditional to highlight the biggest pokemon
 if (pokemonList[i].weight >20){
    document.write("-Wow! That's a big pokemon!");
  }

  document.write('<br>');
};
