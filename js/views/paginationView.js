import view from './view.js';

class PaginationView extends view {
    _parentEl = document.querySelector('.pagination');

    addHandlerBtnClick(handler) {
        this._parentEl.addEventListener('click', function (ev) {
            ev.preventDefault();
            const clicked = ev.target.closest('.pagBtn');
            if (!clicked) return;
            const targetPage = +clicked.dataset.goto;
            handler(targetPage);
        })
    }

    _generateHtml() {
        const numOfPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        //page 1, more pages
        if (this._data.currentPage === 1 && numOfPages > 1) {
            return `<li class="disabled"><a href="#!" class="grey-text text-lighten-3">Prev<i class="material-icons left">chevron_left</i></a><span class="badge center">${this._data.currentPage} / ${numOfPages}</span></li>
            <li class="waves-effect teal-text pagBtn" data-goto="${this._data.currentPage +1}"><a href="#!">Next<i class="material-icons right teal-text">chevron_right</i></a></li>`;
        }

        //last page
        if (this._data.currentPage === numOfPages && numOfPages > 1) {
            return `<li class="waves-effect teal-text pagBtn" data-goto="${this._data.currentPage - 1}"><a href="#!">Prev<i class="material-icons left">chevron_left</i></a><span class="badge center">${this._data.currentPage} / ${numOfPages}</span></li>
            <li class="disabled"><a href="#!" class="grey-text text-lighten-3">Next<i class="material-icons right">chevron_right</i></a></li>`
        }
        //middle page

        if (this._data.currentPage < numOfPages) {
            return `<li class="waves-effect teal-text pagBtn" data-goto="${this._data.currentPage - 1}"><a href="#!">Prev<i class="material-icons left teal-text">chevron_left</i></a><span class="badge center">${this._data.currentPage} / ${numOfPages}</span></li>
            <li class="waves-effect teal-text pagBtn" data-goto="${this._data.currentPage + 1}"><a href="#!">Next<i class="material-icons right teal-text">chevron_right</i></a></li>`
        }

        //page 1, no more pages
        return `<li class="disabled"><a href="#!" class="grey-text text-lighten-3">Prev<i class="material-icons left">chevron_left</i></a><span class="badge center">${this._data.currentPage} / ${numOfPages}</span></li>
        <li class="disabled"><a href="#!" class="grey-text text-lighten-3">Next<i class="material-icons right">chevron_right</i></a></li>`

    }
}

export default new PaginationView();