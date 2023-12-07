import "./styles/style.scss";
import pokemonArray from "./data/pokemon.ts";

const cardContainer = document.querySelector<HTMLElement>(".card-container");
const input = document.querySelector<HTMLInputElement>(".input");
if (!cardContainer || !input) {
    throw new Error("Issues with Selector");
}

const addHTML = (pokemon: Pokemon) => {
    cardContainer.innerHTML += `
<div class="card">
<img class="card__image" src="${pokemon.sprite}" />
<div class="card__content">
  <h1 class="card__heading">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
  <p class="card__text"> ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} (#${pokemon.id}) is a ${pokemon.types.join(" & ")} type pokemon.</p>
</div>
</div>`;
}

pokemonArray.forEach(pokemon => {
    addHTML(pokemon);
});


const handleFilter = (event: Event) => {
    const userInput = (event.currentTarget as HTMLInputElement).value;
    cardContainer.innerHTML = ""
    if (userInput) {
        const filteredPokemon = pokemonArray.filter(pokemon => {
            return pokemon.name.includes(userInput) || pokemon.types.includes(userInput)
        });
        filteredPokemon.forEach(pokemon => {
            addHTML(pokemon);
        })
    } else {
        pokemonArray.forEach(pokemon => {
            addHTML(pokemon);
        });
    }
}
input.addEventListener("input", handleFilter);
