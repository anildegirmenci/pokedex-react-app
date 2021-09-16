import  React, { useState } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import getData from './getData';



const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop : '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    }
});

const getPokemonCard = () => {
    return(
    <Grid item xs={12} sm={4}>
        <Card>
            <CardContent>
                Hi!
            </CardContent>
        </Card>
    </Grid>
    )
}

const Pokedex = () =>{
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState(getData);
    return(
        <>
            <AppBar position = "static">
                <Toolbar />
            </AppBar>

            <Grid container spacing = {2} className = {classes.pokedexContainer}>
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
                {getPokemonCard()}
            </Grid>
        </>
    )
}

export default Pokedex