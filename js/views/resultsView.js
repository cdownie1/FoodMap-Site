import view from './view.js';
import {
    AST_This
} from 'terser';

class ResultsView extends view {
    _parentEl = document.querySelector('.recipe-collection');
    _errorMessage = 'No Recipes matched you search. Please try a different search.';
    _successMessage = 'Success!';

    _generateHtml() {
        return this._data.map(recipe => this._generateCollectionHtml(recipe)).join('');
    }

    _generateCollectionHtml(recipe) {

        const id = window.location.hash.slice(1);

        return `
            <li class="collection-item ${recipe.id === id ? 'active' : ''} avatar">
            <a href="#${recipe.id}">
                <img src="${recipe.image}" alt="${recipe.title}" class="circle">
                <span class="title"> <h6 class="${recipe.id === id ? 'white-text' : 'teal-text'}">${recipe.title}</h6></span> <br>
                <h6 class= ${recipe.id === id ? 'white-text' : 'black-text'}>
                    Publisher: ${recipe.publisher}
                </h6>
                <a href="#!" class="secondary-content ${recipe.key ? '' : 'hidden'}"
                ><i
                  class="material-icons">mood</i></a>
            </li>
            `
    }
}

export default new ResultsView();