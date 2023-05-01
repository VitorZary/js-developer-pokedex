const pokemon_top = document.getElementById('pokemon-top')
const pokemon_down = document.getElementById('pokemon-down')
const pokemon_image = document.getElementById('pokemon-image')
const maxRecords = 151

function showPokemonTop(pokemon) {
    return `
        <h1 class="name">${pokemon.name}</h1>
        <div class="number"><span>#${pokemon.number}</span></div>
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
    `
}

function showPokemonDown(pokemon, specie) {
    return `
        <ol class="details">
            <li class="info"><span class="info1">Species</span><span class="info2"> ${pokemon.species}</span></li>
            <li class="info"><span class="info1">Heigth</span><span class="info2"> ${(pokemon.height/10).toFixed(2)}</span> m</li>
            <li class="info"><span class="info1">Weight</span><span class="info2"> ${(pokemon.weight/10).toFixed(2)}</span> kg</li>
            <li class="info"><span class="info1">Abilities</span><span class="info2"> ${pokemon.abilities.map((ability) => `<span class="ability">${ability}</span>`).join(', ') }</span></li>
        </ol>

        <h3>Breeding</h3>
        <ol class="details">
            <li class="info"><span class="info1">Gender Rate</span><span class="info2">${specie.gender_rate}</span></li>
            <li class="info"><span class="info1">Egg Groups</span><span class="info2"> ${specie.egg_groups.map((eggGroup) => `<span class="eggGroup">${eggGroup}</span>`).join(', ') }</span></li>
        </ol>
    `
}

function showPokemonImage(pokemon) {
    return `
        <img class="img" src="${pokemon.photo}">
    `
}


function loadPokemonDetails() {
    param = Number.parseInt(window.location.href.split("?")[1]);

    if(Number.isInteger(param) && param <= maxRecords && param > 0) {
        pokeApi.getPokemonPerId(param)
        .then((pokemon) => {
            pokemon_top.innerHTML += showPokemonTop(pokemon)
            pokemon_top.className += pokemon.type

            pokeApi.getPokemonSpeciePerId(param)
            .then((specie) => {
                pokemon_down.innerHTML += showPokemonDown(pokemon, specie)
            })

            pokemon_image.innerHTML = showPokemonImage(pokemon)
        })
    }
}

loadPokemonDetails();