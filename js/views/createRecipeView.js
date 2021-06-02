import View from "./view";

class CreateRecipe extends View {
    _parentEl = document.querySelector('.recipeForm');
    _modalWindow = document.querySelector('.recipeModal');
    _overlay = document.querySelector('.overlay');
    _openModal = document.querySelector('.btn--show-modal-recipe');
    _openModalSideNav = document.querySelector('.create-sideNav');
    _closeModal = document.querySelector('.btn--close-modal-recipe');

    constructor() {
        super();
        this._addHandlerOpenModal();
        this._addHandlerOpenModalSideNav();
        this._addHandlerCloseModal();
    }



    _addHandlerSubmit(handler) {
        this._parentEl.addEventListener('submit', function (ev) {
            ev.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

}





export default new CreateRecipe();