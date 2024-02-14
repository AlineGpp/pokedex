const pokemonList = document.getElementById('pokemonList');
const loadaMoreButton = document.getElementById('loadMoreButton');

const limit = 10; 
const maxRecord = 151; 
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset,limit);

loadaMoreButton.addEventListener('click',()=>{
    offset += limit;
    const qtRecordNexPage = offset + limit;

    if(qtRecordNexPage >= maxRecord){
        const newLimit = maxRecord - offset;
        loadPokemonItens(offset,newLimit);
        
        loadaMoreButton.parentElement.removeChild(loadaMoreButton);
    }else {
    loadPokemonItens(offset,limit);
    }
})


