export const toFirstCharUppercase = name => 
    name.charAt(0).toUpperCase() + name.slice(1);

export const catchPokemon = () =>{
    let pokemonHTML = '';
    let randomCatch = Math.random()< 0.5;
    console.log(randomCatch);
    if (randomCatch === true) {
        pokemonHTML = 
        `<div class='bg-green-600' text-gray-400 text-lg'>
            You've got the Pokémon. Well Done!
        </div>`
        
    }
    else {
        pokemonHTML =  `<div class='bg-red-600' text-white 
        text-lg'>
            Ah... You failed.
        </div>`
    }
    document.getElementsByClassName("catched").innerHTML = pokemonHTML;
}