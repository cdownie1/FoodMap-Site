import view from './view.js';

class FavoritesView extends view {
    _parentEl = document.querySelector('#favorites');
    _errorMessage = 'Find your favorites and add them!';
    _successMessage = 'Success!';

    _generateHtml() {
        return this._data.map(recipe => this._generateCollectionHtml(recipe)).join('');
    }

    _generateCollectionHtml(recipe) {

        const id = window.location.hash.slice(1);

        return `
            <li class="${recipe.id === id ? 'active' : ''} avatar favorite-dropdown">
            <a href="#${recipe.id}" class="favorite-dropdown--item">
                <img src="${recipe.image}" alt="${recipe.title}">
                <h5 class="teal-text">${recipe.title}</h5> <br>
            </a>
            </li>
            `
    }


}

export default new FavoritesView();