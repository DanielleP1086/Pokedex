let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  //add global variable for the modalContainer
  let modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
   pokemonList.push(pokemon);
 }
  function getAll() {
    return pokemonList;
  }
function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  //add event listener
  button.addEventListener('click', function () {
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

    function showModal(item) {
    //clear existing modal content
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    //add new modal content
    let closeButtonElement = document.createElement
    ('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click',
    hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = "Pokemon: " + item.name;

    let contentElement = document.createElement('p');
    contentElement.innerText = "weight: " + item.weight;

    let container = document.querySelector('#image-container');
    //create an <img> elemment
    let contentImage = document.createElement('img');
    contentImage.src = item.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(contentImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }
//add functionality to hideModal
  function hideModal() {
      modalContainer.classList.remove('is-visible');
  }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' &&
    modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

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
    hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
