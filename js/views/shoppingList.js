import view from './view.js';
import {
    AST_This
} from 'terser';

class ShoppingListView extends view {
    _addBtn = document.querySelector('.btn-shoppingList');
    _mainEl = document.querySelector('.recipe-container');
    _parentEl = document.querySelector('.collection-header');
    _modalWindow = document.querySelector('.shoppingListModal');
    _overlay = document.querySelector('.overlay');
    _openModal = document.querySelector('.btn--show-modal-shopping');
    _openModalSideNav = document.querySelector('.shopping-sideNav');
    _closeModal = document.querySelector('.btn--close-modal-shopping');

    constructor() {
        super();
        this._addHandlerOpenModal();
        this._addHandlerOpenModalSideNav();
        this._addHandlerCloseModal();
    }

    _addHandlerAddItem(handler) {
        this._mainEl.addEventListener('click', function (ev) {
            const clicked = ev.target.closest('.btn-shoppingList');
            if (!clicked) return;
            handler();
        })

    }

    _addHandlerDeleteItem(handler) {
        this._modalWindow.addEventListener('click', function (ev) {
            ev.preventDefault();
            const clicked = ev.target.closest('.delete-item');
            if (!clicked) return;
            const id = ev.target.closest('.collection-item').dataset.itemid;
            handler(id)
        });
    };

    _addHandlerEditItem(handler) {
        this._modalWindow.addEventListener('click', function (ev) {
            ev.preventDefault();
            const quantity = ev.target.closest('.quantity-input input').value;
            const id = ev.target.closest('.collection-item').dataset.itemid;
            if (!quantity || !id) return;
            console.log(quantity);
            console.log(id);
            if (quantity > 0) handler(id, quantity);
        });
    }

    _generateHtml() {
        return ` <li class="collection-header"><h4>Shopping List</h4></li>
        ${this._data.map(this._generateIngredient)
            .join('')}
      `;
    }



    _generateIngredient(ingredient) {
        return `
        <li class="collection-item" data-itemid=${ingredient.id}>
            <div class="row">
                <div class="input-field col s2 quantity-input">
                    <input  id="quantity" type="number" value="${ingredient.quantity}"> 
                </div>
                <div class="shopping-item">
                <p class="${ingredient.unit ? 'unit-badge' : ''}">${ingredient.unit}</p> <p class="description">${ingredient.description}</p>
                <a href="#!" class="secondary-content"><i class="material-icons delete-item">delete</i></a>
                </div>
                
            </div>
        </li>`;
    }
}
export default new ShoppingListView();