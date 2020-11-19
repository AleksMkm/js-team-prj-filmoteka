import filmsCardTpl from '../templates/card-films.hbs';
import NewApiService from './apiServis';
import { renderPagination } from './pagination';

// const refs = {
//   cardContainer: document.querySelector('.js-card'),
// };
const listElement = document.querySelector('.js-card');
const newApiService = new NewApiService();

render();
fetchDataOfPopularFilms();

// renders main (first) page
function render() {
  newApiService.insertGenresToMovieObj().then(renderFilmsCard);
}

// function for insertion of markup
function renderFilmsCard(articles) {
  listElement.innerHTML = filmsCardTpl(articles);
}

// renders movies by appropriate page
function displayList(wrapper, page) {
  wrapper.innerHTML = '';
  fetchPopularFilmsByPage(page)
    .then(({ results }) => {
      return results;
    })
    .then(renderFilmsCard);
}

// renders pagination for main (first) fetch
function fetchDataOfPopularFilms() {
  newApiService.fetchPopularArticlesPages().then(results => {
    renderPagination(results.total_pages, results.results, displayList);
  });
}

// fetches popular movies by appropriate page
function fetchPopularFilmsByPage(page) {
  newApiService.pageNum = page;
  return newApiService.fetchPopularArticlesPages();
}

// insertGenresToMovieObj() {
//     return this.fetchPopularArticles().then(data => {
//       return this.fetchGenres().then(genresList => {
//         return data.map(movie => ({
//           ...movie,
//           genre_ids: movie.genre_ids
//             .map(id => genresList.filter(el => el.id === id))
//             .flat(),
//         }));
//       });
//     });
//   }

newApiService.insertGenresToMovieObj().then(console.log);
