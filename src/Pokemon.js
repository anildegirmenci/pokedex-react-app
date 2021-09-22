import React, { useState, useEffect } from 'react';
import './assets/style/PokedexStyle.css';
import { Typography, Tooltip, Checkbox, Box  } from '@material-ui/core';
import { FavoriteBorder, Favorite } from '@material-ui/icons';
import { toFirstCharUppercase, catchPokemon } from './assets/scripts/Method';
import Pokeball from './assets/scripts/Pokeball';
import PokeballIcon from './assets/images/pokeball.png'
import axios from 'axios';
import './index.css';



const Pokemon = (props) => {
    const { history, match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };



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
                    <div className='text-gray-200 flex flex-col w-96' style={{ height: '530px' }}>
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
            <div className="catched">
                <div className="flex justify-center items-center my-6">
                <Tooltip title="Set as Favorite">
                    <Box>
                        <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                    </Box>
                </Tooltip>
                <Tooltip title="Catch the Pokémon!">
                    <Box>
                        <div className="w-10 cursor-pointer mr-2"><img className="catchPokeball"  src={PokeballIcon} alt='Pokeball Logo' /></div>
                    </Box>
                </Tooltip>
                </div>
            </div>
            {pokemon !== undefined && (<div className="cursor-pointer px-14 py-4 bg-gray-400 rounded justify-center items-center hover:bg-gray-500" variant="contained" onClick={() => history.push("/")}>Back 2 Pokédex</div>)}

        </div>
    );

}

export default Pokemon