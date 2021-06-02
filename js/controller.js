import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import FavoriteView from './views/favorites.js';
import FavoriteModalView from './views/favoritesModalView.js';
import shoppingListView from './views/shoppingList';
import createRecipeView from './views/createRecipeView.js';

import {
  async
} from 'q';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {
  useImperativeHandle
} from 'react';


//MAIN NAV DROPDOWN
document.addEventListener('DOMContentLoaded', function () {
  const mainDropdown = document.querySelector('.main-dropdown');
  const dropdownOptions = {
    closeOnClick: true,
    hover: true,
    constrainWidth: false,
    coverTrigger: false,
    belowOrigin: true,
  };
  M.Dropdown.init(mainDropdown, dropdownOptions);
});


//init plugin for mobile/side nav.
document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems, {});
});

///////////////////////////////////////
// Recipe Section


//fetch data from https://forkify-api.herokuapp.com/v2
//LOAD RECIPE
async function controlRecipies() {
  try {
    //get hash id for new recipe - remove # symbol
    const id = window.location.hash.slice(1) || '5ed6604591c37cdc054bcda2';
    if (!id) return;
    recipeView.launchLoader();

    //update results view displaying chosen collection item
    resultView.render(model.loadSearchResultsPage());
    //update dropdown to show which fav is selected
    FavoriteView.render(model.state.favorites);
    //add to modal
    FavoriteModalView.render(model.state.favorites);

    // load recipe
    await model.loadRecipe(id);

    // RENDER RECIPE
    recipeView.render(model.state.recipe);

  } catch (error) {
    // console.error(error);
    recipeView.renderError();
  }
}

const controlSearchResults = async function () {
  try {
    resultView.launchLoader();
    const query = searchView.getSearchQuery() || 'curry'; //default on page load
    if (!query) return;

    await model.loadSearchResults(query);

    // render results
    resultView.render(model.loadSearchResultsPage())
    //load pagination
    paginationView.render(model.state.search);

  } catch (error) {
    console.error(error);
  }
}

const controlPagination = function (page) {
  // render new results
  resultView.render(model.loadSearchResultsPage(page))
  //reload pagination
  paginationView.render(model.state.search);
}


const controlServings = function (updatedServings) {
  //update servings in state
  model.updateServings(updatedServings);
  //rerender recipeView
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe);
}

const controlAddFavorites = function () {
  //adding/removing favorites
  if (!model.state.recipe.favorited) {
    model.addFavorite(model.state.recipe)
    M.toast({
      html: `Yay! ${model.state.recipe.title} was added to favorites!`
    });
  } else {
    model.removeFavorite(model.state.recipe.id);
    M.toast({
      html: `${model.state.recipe.title} was removed from favorites!`
    });
  }

  //update the recipe view
  recipeView.render(model.state.recipe);

  //render favorites
  FavoriteView.render(model.state.favorites);

  //add to modal
  FavoriteModalView.render(model.state.favorites);
}

const controlAddRecipe = async function (recipeData) {
  try {
    await model.uploadRecipe(recipeData);

    // render create recipe
    recipeView.render(model.state.recipe);

    //success message
    M.toast({
      html: `Your recipe "${model.state.recipe.title}" was created!!`
    });

    // update/rerender favorites
    FavoriteView.render(model.state.favorites);
    //add to modal
    FavoriteModalView.render(model.state.favorites);

    //update url (id)
    window.history.pushState(null, ',', `#${model.state.recipe.id}`)

    //close modal
    createRecipeView._toggleClass();

  } catch (error) {
    console.error(error);
    M.toast({
      html: `DAMN! ${error.message}`
    });
  }
}


// model.editItem("kp8c1yji", 2000);

const controlAddShopping = function () {
  let list = model.state.shoppingList
  //add each ingredient to list
  model.state.recipe.ingredients.forEach(item => {
    const el = model.addItem(item.quantity, item.unit, item.description);
  })
  shoppingListView.render(list);
  M.toast({
    html: `${model.state.recipe.ingredients.length} Items added to Shopping list.`
  });
}

const controlDeleteShopping = function (id) {
  model.deleteItem(id);
  shoppingListView.render(model.state.shoppingList);
}

const controlEditShopping = function (id, quantity) {
  model.editItem(id, quantity);
}


const init = function () {
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddFavorite(controlAddFavorites);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerBtnClick(controlPagination);
  createRecipeView._addHandlerSubmit(controlAddRecipe);
  shoppingListView._addHandlerAddItem(controlAddShopping);
  shoppingListView._addHandlerDeleteItem(controlDeleteShopping);
  shoppingListView._addHandlerEditItem(controlEditShopping);


  //default search on load
  controlSearchResults();
  controlPagination(1)
  shoppingListView.render(model.state.shoppingList)
}

init();