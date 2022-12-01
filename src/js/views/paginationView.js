import View from "./View.js";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn(curPage, "next");
    }

    //Last Page
    if (curPage === numPages) {
      return this._generateMarkupBtn(curPage, "previous");
    }

    //Other Page
    if (curPage < numPages) {
      return this._generateMarkupBtn(curPage);
    }

    //Page 1 and there are NO other pages
    return "";
  }

  _generateMarkupBtn(curPage, name = null) {
    const btnNext = `
      <button data-goto=${
        curPage + 1
      } class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
    const btnPrev = `
      <button data-goto=${
        curPage - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
    if (!name) return [btnPrev, btnNext].join("");
    return name === "previous" ? btnPrev : btnNext;
  }
}

export default new PaginationView();
