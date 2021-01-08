let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //add global variable for the modalContainer

  function add(pokemon) {
   pokemonList.push(pokemon);
 }
  function getAll() {
    return pokemonList;
  }
  //adds a list item to the list for each pokemon
  function addListItem(pokemon) {
    let list = $(".pokemon-list");
    let listItem = $("<li></li>");
    let button = $("<button>" + pokemon.name + "</button>");
    button.addClass("btn-primary");
    button.attr("data-toggle", "modal"); //this works with bootstrap to open the modal when the pokemon name button is clicked
    button.attr("data-target", "#pokemonModal");
    listItem.append(button);
    list.append(listItem);

    //event listener for opening modal with pokemon info
    button.on("click", function(event) {
      showDetails(pokemon);
    });
  }


//get list from API
function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }
//loads specific pokemon info from API
  function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.name = details.name
        item.weight = details.weight;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    function showModal(pokemon) {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");

//empties the modal each time
      modalTitle.empty();
      modalBody.empty();

      //add the new content into the new "modal" div
      let nameElement = $("<h1>" + pokemon.name + "</h1>");


      let weightElement = $("<p>" + "Weight: " + pokemon.weight + "</p>");


      let imageElement = $('<img class="modal-img" style="width:30%">');
      imageElement.attr("src", pokemon.imageUrl);


      modalTitle.append(nameElement);
      modalBody.append(imageElement);
      modalBody.append(weightElement);
    }

    //callback to addEventListener
    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function ()
      {
      showModal(pokemon);
      });
    }

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
