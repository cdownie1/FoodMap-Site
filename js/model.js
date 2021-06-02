import {
    API_URL,
    SEARCH_RESULT_LIMIT,
    API_KEY
} from './config.js';
import {
    AJAXCall
} from './helper.js';
import {
    Obj
} from 'prelude-ls';

import uniqid from 'uniqid';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        currentPage: 1,
        resultsPerPage: SEARCH_RESULT_LIMIT,
    },
    favorites: [],
    shoppingList: [],
};

const createRecipeObject = function (data) {
    const {
        recipe
    } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        sourceUrl: recipe.source_url,
        image: recipe.image_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && {
            key: recipe.key
        }),
    };
};

const createshoppingListObject = function (data) {
    const {
        recipe
    } = data.data;
    return {
        ingredients: recipe.ingredients,
    };
};
export const loadRecipe = async function (id) {

    try {
        const data = await AJAXCall(`${API_URL}${id}?key=${API_KEY}`);
        state.recipe = createRecipeObject(data);

        if (state.favorites.some(fav => fav.id === id)) {
            state.recipe.favorited = true;
        } else {
            state.recipe.favorited = false;
        }
    } catch (error) {
        throw error;
    }
}


export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;

        const data = await AJAXCall(`${API_URL}?search=${query}&key=${API_KEY}`);

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && {
                    key: recipe.key
                })
            };
        });
        state.search.currentPage = 1;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const loadSearchResultsPage = function (page = state.search.currentPage) {

    state.search.currentPage = page;

    const first = (page - 1) * state.search.resultsPerPage;
    const last = page * state.search.resultsPerPage;

    return state.search.results.slice(first, last);
}

export const updateServings = function (updatedServings) {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = (ingredient.quantity * updatedServings) / state.recipe.servings;
    });

    state.recipe.servings = updatedServings;
}

const saveFavorite = function () {
    localStorage.setItem('favorites', JSON.stringify(state.favorites))
}

export const addFavorite = function (recipe) {
    //add to favorites array
    state.favorites.push(recipe);

    //mark current recipe as favorite
    if (recipe.id === state.recipe.id) {
        state.recipe.favorited = true;
    }

    saveFavorite();
}

export const removeFavorite = function (id) {
    //remove from array
    const index = state.favorites.findIndex(item => item.id === id);
    state.favorites.splice(index, 1);

    //unmark recipe as favorite
    if (id === state.recipe.id) {
        state.recipe.favorited = false;
    }

    saveFavorite();
}


export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ingredient => {
                const ingredientsArr = ingredient[1].split(',').map(item => item.trim());
                if (ingredientsArr.length !== 3) throw new Error('Ingredient format must be: quantity, unit, item');
                const [quantity, unit, description] = ingredientsArr;
                return {
                    quantity: quantity ? +quantity : null,
                    unit,
                    description
                };
            });


        const recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients: ingredients,
        }

        const data = await AJAXCall(`${API_URL}?key=${API_KEY}`, recipe);
        state.recipe = createRecipeObject(data);
        addFavorite(state.recipe);
    } catch (error) {
        throw error;
    }

}

const saveShopping = function () {
    localStorage.setItem('shoppingList', JSON.stringify(state.shoppingList))
}

export const addItem = function (quantity, unit, description) {
    const item = {
        id: uniqid(),
        quantity,
        unit,
        description,
    }
    state.shoppingList.push(item);
    saveShopping();
    return item;
}


export const deleteItem = function (id) {
    const index = state.shoppingList.findIndex(item => item.id === id);
    state.shoppingList.splice(index, 1);
    saveShopping();
}

export const editItem = function (id, newQuantity) {
    state.shoppingList.find(item => item.id === id).quantity = newQuantity;
    saveShopping();
}

const init = function () {
    const allFavorites = localStorage.getItem('favorites');
    if (allFavorites) state.favorites = JSON.parse(allFavorites);

    const shopping = localStorage.getItem('shoppingList');
    if (shopping) state.shoppingList = JSON.parse(shopping);
}

init();