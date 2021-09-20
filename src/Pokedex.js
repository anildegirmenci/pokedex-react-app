import  React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pokeball from './Pokeball';
import { toFirstCharUppercase } from './Method';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import EkinoksImg from './assets/images/ekinoks-icon.png';
import PokeballIcon from './assets/images/pokeball.png'



const useStyles = makeStyles(theme => ({
    pokedexContainer: {
        paddingTop : '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia:{
        margin: 'auto',
    },
    cardContent:{
        textAlign:'center',
    },
    searchContainer:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:'50px',
        paddingRight:'20px',
        marginTop: '5px',
        marginBottom: '5px',
    },
    searchIcon:{
        marginTop:'5px'
    },
    searchInput:{
        width:'350px',
        margin:'5px'
    },

}));

const Pokedex = props =>{
    const {history} = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState('');


    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    }

    useEffect(() => {
        axios 
            .get(`https://pokeapi.co/api/v2/pokemon?limit=175`)
            .then(function(response){
                const {data} = response;
                const {results} = data;
                const newPokemonData = {};
                results.forEach((pokemon,index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, [])

    const getPokemonCard = (pokemonId) => {
        const {id,name, sprite} = pokemonData[pokemonId];
        return(
        <Grid item xs={12} sm={4} key={pokemonId}>
            <Card onClick={() => history.push(`/${pokemonId}`)}>
                <CardMedia className={classes.cardMedia} image={sprite} style={{width:'130px',height:'130px'}} />
                <CardContent className={classes.cardContent}>
                    <Typography>{`${id}.${toFirstCharUppercase(name)}`}</Typography>
                </CardContent>
            </Card>
        </Grid>
        );
    };

    return(
        <>
            <AppBar position = "static" style={{ background: '#c32b2b',width:'auto' }}>
                <Toolbar className="flex">
                    <a href='/'><img src={EkinoksImg} className="w-24" alt="Logo" /></a>
                    <div className= {classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon} />
                        <TextField onChange={handleSearchChange} label='Search a Pokémon' variant='standard' className={classes.searchInput} />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing = {2} className = {classes.pokedexContainer}>
                {Object.keys(pokemonData).map((pokemonId) => 
                    pokemonData[pokemonId].name.includes(filter) &&
                    getPokemonCard(pokemonId)
                )}
                
            </Grid>
            ): (
                <Pokeball />
            )}
        </>
    )
}

export default Pokedex