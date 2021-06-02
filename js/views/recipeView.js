import view from './view.js';

class RecipeView extends view {
    _parentEl = document.querySelector('.recipe-container');
    _errorMessage = 'We were unable to find the recipe, please try another!';
    _successMessage = 'Success!'


    //publisher
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach((event) =>
            window.addEventListener(event, handler)
        );
    }

    addHandlerUpdateServings(handler) {
        this._parentEl.addEventListener('click', function (ev) {
            const clicked = ev.target.closest('.btn--servings');
            if (!clicked) return;
            // console.log(clicked);
            const servings = clicked.dataset.updateto;
            // console.log(servings);
            if (servings > 0) handler(+servings);
        })
    }

    addHandlerAddFavorite(handler) {
        this._parentEl.addEventListener('click', function (ev) {
            const clicked = ev.target.closest('.favorite');
            if (!clicked) return
            handler();
        })
    }

    _generateHtml() {
        // console.log(this._data)
        return `
            <div class="card-image">
                <img
                src=${this._data.image} alt="${this._data.title}"
                />
                <span class="card-title"><h3>${this._data.title}</h3></span>
                <a
                class="btn-floating btn-large halfway-fab waves-effect waves-light favorite ${this._data.favorited ? 'red' : 'teal lighten-4'}"
                ><i
                    class="material-icons tooltipped"
                    data-position="bottom"
                    data-tooltip="Add Me To Favorites"
                    >loyalty</i
                ></a
                >
            </div>
            <div class="card-content">
                <div class="card-header">
                <p>
                    <span class="recipe-cook">${this._data.cookingTime}</span
                    ><i class="material-icons left">access_time</i> cooking time
                </p>
                <p>
                    <span class="recipe-servings">${this._data.servings}</span>
                    <i class="material-icons left">group</i> Servings
                    <i class="material-icons right btn--servings" data-updateTo="${this._data.servings + 1}">add_circle_outline</i>
                    <i class="material-icons right btn--servings" data-updateTo="${this._data.servings - 1}">remove_circle_outline</i>
                </p>
                </div>
                <div class="card-ingredients">
                <h4 class="center" id="ingredients-title">INGREDIENTS</h4> 

                <ul class="recipe__ingredient-list">
                ${this._data.ingredients
                .map(this._generateIngredient)
                .join('')}
                    
                </ul>
                </div>
                <div class="recipe-btn-group">
                    <a class="waves-effect waves-light btn" href="${this._data.sourceUrl}" target="_blank"><i class="material-icons right">keyboard_arrow_right</i>Cooking Method</a>
                    <a class="waves-effect waves-light btn btn-shoppingList"><i class="material-icons left">shopping_basket</i>Add To Shopping List</a>
                </div>
            </div>
            </div>
        </div>
        `;
    }

    _generateIngredient(ingredient) {
        return `
        <li class="recipe__ingredient">
        <p>
            <span class="recipe-quantity">${(ingredient.quantity) ? ingredient.quantity : ''}</span>
            <span class="recipe-unit">${ingredient.unit}</span>
            <span class="recipe-item">${ingredient.description}</span>
        </p>
        </li>
        `;
    }
}

export default new RecipeView();