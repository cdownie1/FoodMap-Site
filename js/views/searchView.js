class SearchView {
    _parentEl = document.querySelector('.search');

    getSearchQuery() {
        const query = this._parentEl.querySelector('.autocomplete').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentEl.querySelector('.autocomplete').value = '';
    }

    addHandlerSearch(handler) {
        this._parentEl.addEventListener('keydown', function (ev) {
            if (ev.code === 'Enter') {
                handler();
            }
        })
    }
}

export default new SearchView();