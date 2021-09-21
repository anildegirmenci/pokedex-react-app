import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Grid, Card, CardContent, CardMedia,
    Typography, TextField, Switch
} from '@material-ui/core';
import { makeStyles, ThemeProvider, createTheme, styled } from '@material-ui/core/styles';
import Pokeball from './assets/scripts/Pokeball';
import { toFirstCharUppercase } from './assets/scripts/Method';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import EkinoksImg from './assets/images/ekinoks-icon.png';


const useStyles = makeStyles(() => ({
    pokedexContainer: {
        paddingTop: '20px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    cardMedia: {
        margin: 'auto',
        width: '130px', 
        height: '130px'
    },
    cardContent: {
        textAlign: 'center',
    },
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: '50px',
        paddingRight: '20px',
        marginTop: '5px',
        marginBottom: '5px',
    },
    searchIcon: {
        marginTop: '5px'
    },
    searchInput: {
        width: '350px',
        margin: '5px'
    },
    switchStyle: {
        paddingLeft:'1000px'
    }

}));

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#0c183c',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));

const Pokedex = props => {
    const { history } = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState();
    const [filter, setFilter] = useState('');
    const [darkMode, setDarkMode] = useState(false);


    const theme = createTheme({
        palette: {
            type: darkMode ? "dark" : "light",
        }
    });

    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    }

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=175`)
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, [])

    const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];
        return (
            <Grid item xs={12} sm={4} key={pokemonId}>
                <Card onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia className={classes.cardMedia} image={sprite}/>
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}.${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <AppBar position="static" style={{ background: '#c32b2b', width: 'auto' }}>
                    <Toolbar className="flex">
                        <a href='/'><img src={EkinoksImg} className="w-24" alt="Logo" /></a>
                        <div className={classes.searchContainer}>
                            <SearchIcon className={classes.searchIcon} />
                            <TextField onChange={handleSearchChange} label='Search a Pokémon' variant='standard' className={classes.searchInput} />
                        </div>
                        <MaterialUISwitch className="switchStyle" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
            {pokemonData ? (
                <ThemeProvider theme={theme}>
                    <Grid container spacing={2} className={classes.pokedexContainer}>
                        {Object.keys(pokemonData).map((pokemonId) =>
                            pokemonData[pokemonId].name.includes(filter) &&
                            getPokemonCard(pokemonId)
                        )}

                    </Grid>
                </ThemeProvider>
            ) : (
                <Pokeball />
            )}

        </>
    )
}

export default Pokedex