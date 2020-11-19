import filmsCardTpl from '../templates/card-films.hbs';
import NewApiService from './apiServis';
import { renderPagination } from './pagination';
import createTrailerLink from './trailers.js';

const listElement = document.querySelector('.js-card');
const logoEl = document.querySelector('.js-main-logo');
const newApiService = new NewApiService();

render();
fetchDataOfPopularFilms();

logoEl.addEventListener('click', onLogoClick);

// page set to default with click on logotype without page refresh
function onLogoClick(e) {
  e.preventDefault();
  render();
  fetchDataOfPopularFilms();
}

// renders main (first) page
function render() {
  newApiService
    .insertGenresToMovieObj()
    .then(renderFilmsCard)
    .catch(err => {
      console.log('error in function render');
    });
}

// function for insertion of markup
function renderFilmsCard(articles) {
  listElement.innerHTML = filmsCardTpl(articles);
  createTrailerLink();
}

// renders movies by appropriate page
function displayList(wrapper, page) {
  wrapper.innerHTML = '';
  fetchPopularFilmsByPage(page)
    .then(renderFilmsCard)
    .catch(err => {
      console.log('error in function displayList');
    });
}

// renders pagination for main (first) fetch
function fetchDataOfPopularFilms() {
  newApiService
    .fetchPopularArticlesPages()
    .then(results => {
      renderPagination(results.total_pages, results.results, displayList);
    })
    .catch(err => {
      console.log('error in function fetchDataOfPopularFilms');
    });
}

// fetches popular movies by appropriate page
function fetchPopularFilmsByPage(page) {
  newApiService.pageNum = page;
  return newApiService.insertGenresToMovieObj();
}
