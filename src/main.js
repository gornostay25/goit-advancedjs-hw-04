import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const PER_PAGE = 15;

const formEl = document.querySelector('.form');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

const state = {
  query: '',
  page: 1,
};

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreClick);

function hasMoreResults(page, totalHits) {
  return page * PER_PAGE < totalHits;
}

async function onFormSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();
  if (!query) {
    return;
  }

  state.query = query;
  state.page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(state.query, state.page);

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (hasMoreResults(state.page, data.totalHits)) {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMoreClick() {
  showLoader();
  loadMoreBtnEl.disabled = true;

  state.page += 1;

  try {
    const data = await getImagesByQuery(state.query, state.page);

    if (!data.hits || data.hits.length === 0) {
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);

    if (!hasMoreResults(state.page, data.totalHits)) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    scrollAfterLoadMore();
  } catch {
    state.page -= 1;
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loadMoreBtnEl.disabled = false;
    hideLoader();
  }
}

function scrollAfterLoadMore() {
  const cardEl = document.querySelector('.gallery-item');
  if (!cardEl) {
    return;
  }

  const cardHeight = cardEl.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
