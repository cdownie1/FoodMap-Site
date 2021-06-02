export default class View {
    _data;

    /**
     * render the received Obj to the DOM.
     * @param {object | object[]} data recipe data
     */
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const htmlOutput = this._generateHtml();
        //clear loader
        this._clear();
        // insert recipe
        this._parentEl.insertAdjacentHTML('afterbegin', htmlOutput);
    }

    /**
     * rerender object in DOM where changes (servings) have been made
     * @param {object | object[]} data ingredient quantity
     */
    update(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this._data = data;
        const updatedHtmlOutput = this._generateHtml();

        const newDom = document.createRange().createContextualFragment(updatedHtmlOutput);
        const newDomEls = Array.from(newDom.querySelectorAll('*'));
        const currDomEls = Array.from(this._parentEl.querySelectorAll('*'));
        // console.log(newDomEls);

        newDomEls.forEach((newEl, i) => {
            const currEl = currDomEls[i];

            if (!newEl.isEqualNode(currEl)) {
                currEl.innerHTML = newEl.innerHTML;
            }
        });
    }

    /**
     * clear DOM section
     */
    _clear() {
        this._parentEl.innerHTML = '';
    }

    /**
     * loading wheel
     */
    launchLoader() {
        const htmlOutput = `  
          <div class="preloader-wrapper big active">
              <div class="spinner-layer spinner-blue-only">
                  <div class="circle-clipper left">
                  <div class="circle"></div>
                  </div><div class="gap-patch">
                  <div class="circle"></div>
                  </div><div class="circle-clipper right">
                  <div class="circle"></div>
                  </div>
              </div>
          </div>
          `;
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', htmlOutput);
    }

    /**
     * render error message - param optional
     * @param {string} [message] 
     */
    renderError(message = this._errorMessage) {
        const htmlOutput = `
        <div class="row">
            <div class="col s12 m6" style="z-index: 200">
                <div class="card red ">
                    <div class="card-content white-text">
                    <p class="flow-text"> <br> ${message} </p>
                    </div>
                </div>
            </div>
        </div>
        `
        this._clear();
        this._parentEl.insertAdjacentHTML('afterbegin', htmlOutput);
    }

    _toggleClass() {
        this._overlay.classList.toggle('hidden');
        this._modalWindow.classList.toggle('hidden');

    }

    _addHandlerOpenModal() {
        this._openModal.addEventListener('click', this._toggleClass.bind(this));
    }

    _addHandlerOpenModalSideNav() {
        this._openModalSideNav.addEventListener('click', this._toggleClass.bind(this));
    }


    _addHandlerCloseModal() {
        this._closeModal.addEventListener('click', this._toggleClass.bind(this));
        this._overlay.addEventListener('click', this._toggleClass.bind(this));
    }

}