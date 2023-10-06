import axios from "axios";
import { useState, useEffect } from "react";

function usePokemonDetails(id, pokemonName) {   
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemons() {

        try {            
            let response;
        if (pokemonName) {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        }else {
            response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);

        }


        const pokemonOfSameType = await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types ? response.data.types[0].type.name : ''}`);
        setPokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map((t) => t.type.name),
            similarPokemons: pokemonOfSameType.data.pokemon.slice(0, 5)
        });         
        setPokemonListState({...pokemonListState, type: response.data.types ? response.data.types[0].type.name : ''})

    }catch (error) {
            console.log('Something went wrong');
        }
    }    
    const {pokemonListState, setPokemonListState } = useState({})

    useEffect(() => {
        downloadPokemons()
        console.log("list", pokemon.types, pokemonListState);
    }, []);

    return[pokemon];
}

export default usePokemonDetails;