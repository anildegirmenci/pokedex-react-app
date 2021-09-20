import React, { useState, useEffect } from 'react';
import './assets/style/PokedexStyle.css';
import { Typography } from '@material-ui/core';
import { toFirstCharUppercase, catchPokemon } from './Method';
import Pokeball from './Pokeball';
import PokeballIcon from './assets/images/pokeball.png'
import axios from 'axios';
import './index.css';

const Pokemon = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(function (response) {
                const { data } = response;
                setPokemon(data);
            })
            .catch(function (error) {
                setPokemon(false);
            })
    }, [pokemonId]);

    const generatePokemonJSX = () => {
        const { name, species, height, weight, types, sprites } = pokemon;
        const { front_default } = sprites;
        return (
            <div className="pokeBackground">
                <div className='text-gray-200 flex flex-col w-96' style={{height:'530px'}}>
                <div className="pokeContainer text-2xl mt-20 justify-center items-center flex flex-row" variant='h4'>
                    {toFirstCharUppercase(name)}
                    <img className='justify-center items-center' src={front_default} alt="sprite" />
                </div>
                <div className=' pl-16 pokeContainer mt-2'>
                <div>{'Species: '}{toFirstCharUppercase(species.name)} </div>
                <div>{'Height: '}{height}{' "'} </div>
                <div>{'Weight: '}{weight}{' lbs'} </div>
                <div>{'Types: '} </div>{types.map((typeInfo) => {
                    const { type } = typeInfo
                    const { name } = type;
                    return <div key={name}>{`${toFirstCharUppercase(name)}`}</div>
                })}
                </div>
                </div>
            </div>
        );
    };
    return (
        <div className="justify-center items-center flex flex-col">
            {pokemon === undefined && <Pokeball />}
            {pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography>Pokemon not found :( </Typography>}
            <div className="catched">asd</div>
            <div className="flex justify-center items-center">
            <div className="w-16 cursor-pointer mr-2"><img className="catchPokeball" onClick={catchPokemon()} src={PokeballIcon} alt='Pokeball Logo' /></div>
            <div className="bg-red-400 hover:bg-red-600 w-full pl-1
             justify-items-center rounded">{'🡠 Catch the Pokémon!'} </div>
            </div>
            {pokemon !== undefined && (<div className="cursor-pointer px-2 bg-gray-400 rounded justify-center items-center" variant="contained" onClick={() => history.push("/")}>Back 2 Pokédex</div>)}
            
        </div>
    );

}

export default Pokemon