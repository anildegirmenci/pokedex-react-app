import React, { useState, useEffect } from 'react';
import './assets/style/PokedexStyle.css';
import { Button, Typography } from '@material-ui/core';
import { toFirstCharUppercase, catchPokemon } from './Method';
import Pokeball from './Pokeball';
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
            .catch(function (e) {
                setPokemon(false);
            })
    }, [pokemonId]);

    const generatePokemonJSX = () => {
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const { front_default } = sprites;
        return (
            <div className="pokeBackground">
                <Typography className="justify-center items-center flex flex-row pt-20" variant='h4'>
                    {`${id}.`} {toFirstCharUppercase(name)}
                    <img style={{ justifyContent: 'center', alignItems: 'center' }} src={front_default} alt="sprite" />
                </Typography>
                <Typography>{'Species: '}{toFirstCharUppercase(species.name)} </Typography>
                <Typography>{'Height: '}{height}{' cm'} </Typography>
                <Typography>{'Weight: '}{weight}{' cm'} </Typography>
                <Typography>{'Types: '} </Typography>{types.map((typeInfo) => {
                    const { type } = typeInfo
                    const { name } = type;
                    return <Typography key={name}>{`${toFirstCharUppercase(name)}`}</Typography>
                })}
            </div>
        );
    };
    return (
        <div className="justify-center items-center flex flex-col">
            {pokemon === undefined && <Pokeball />}
            {pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography>Pokemon not found :( </Typography>}
            <div className="catched">asd</div>
            <Typography onClick={catchPokemon()} className="bg-red-400 hover:bg-red-600 w-52 h-6 
            cursor-pointer justify-items-center rounded">{'Try to catch the Pokémon!'} </Typography>{}
            {pokemon !== undefined && (<Button variant="contained" onClick={() => history.push("/")}>Back 2 Pokédex</Button>)}
            
        </div>
    );

}

export default Pokemon