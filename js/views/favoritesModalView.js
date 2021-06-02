import view from './view.js';

class FavoritesModalView extends view {
    _parentEl = document.querySelector('.favorites');
    _errorMessage = 'Find your favorites and add them!';
    _successMessage = 'Success!';
    _openModalSideNav = document.querySelector('.side-dropdown');
    _modalWindow = document.querySelector('.favoritesModal');
    _overlay = document.querySelector('.overlay');
    _closeModal = document.querySelector('.btn--close-modal-favorites');

    constructor() {
        super();
        this._addHandlerOpenModalSideNav();
        this._addHandlerCloseModal();
    }


    _generateHtml() {
        return this._data.map(recipe => this._generateCollectionHtml(recipe)).join('');
    }

    _generateCollectionHtml(recipe) {

        const id = window.location.hash.slice(1);

        return `
        <li class="collection-item ${recipe.id === id ? 'active' : ''} avatar collection-item--modal">
        <a href="#${recipe.id}">
            <img src="${recipe.image}" alt="${recipe.title}" class="circle">
            <span class="title"> <h6 class="${recipe.id === id ? 'white-text' : 'teal-text'}">${recipe.title}</h6></span> <br>
            <a href="#!" class="secondary-content ${recipe.key ? '' : 'hidden'}"
            ><i
              class="material-icons">mood</i></a>
        </li>
        `
    }


}

export default new FavoritesModalView();