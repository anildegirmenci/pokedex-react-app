import  React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import getData from './getData';
import Pokeball from './Pokeball';



const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop : '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    }
});


const Pokedex = () =>{
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState(getData);

    const getPokemonCard = (pokemonId) => {
        console.log(pokemonData[`${pokemonId}`]);
        return(
        <Grid item xs={12} sm={4} key={pokemonId}>
            <Card>
                <CardContent>
                    Hi!
                </CardContent>
            </Card>
        </Grid>
        )
    }
    return(
        <>
            <AppBar position = "static">
                <Toolbar />
            </AppBar>
            {pokemonData ? (
                <Grid container spacing = {2} className = {classes.pokedexContainer}>
                {Object.keys(pokemonData).map((pokemonId) => {
                    getPokemonCard(pokemonId)
                })}
            </Grid>
            ): (
                <Pokeball />
            )}
            
        </>
    )
}

export default Pokedex