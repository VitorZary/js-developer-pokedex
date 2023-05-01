
const pokeApi = {}

pokeApi.convertPokeApiDetailToPokemon = (pokeDetail) => {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.species = pokeDetail.species.name
    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.abilities = abilities

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(pokeApi.convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}



pokeApi.getPokemonPerId = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then(pokeApi.convertPokeApiDetailToPokemon)
}

pokeApi.convertPokeApiSpecieToSpecie = (pokeSpecie) => {
    const specie = new Specie();

    specie.name = pokeSpecie.name
    specie.gender_rate = pokeSpecie.gender_rate
    const egg_groups = pokeSpecie.egg_groups.map((eggGroupSlot) => eggGroupSlot.name)

    specie.egg_groups = egg_groups;

    return specie
}

pokeApi.getPokemonSpecie = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(pokeApi.convertPokeApiSpecieToSpecie)
}

pokeApi.getPokemonSpeciePerId = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.species)
        .then(pokeApi.getPokemonSpecie)
}
