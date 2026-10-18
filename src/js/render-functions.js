import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader-wrapper');
const loadMoreWrapperEl = document.querySelector('.load-more-wrapper');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
          loading="lazy"
          width="360"
          height="200"
        />
        <ul class="gallery-text">
          <li>
            <span>Likes</span>
            <p>${likes}</p>
          </li>
          <li>
            <span>Views</span>
            <p>${views}</p>
          </li>
          <li>
            <span>Comments</span>
            <p>${comments}</p>
          </li>
          <li>
            <span>Downloads</span>
            <p>${downloads}</p>
          </li>
        </ul>
      </a>
    </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
  loaderEl.setAttribute('aria-hidden', 'false');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
  loaderEl.setAttribute('aria-hidden', 'true');
}

export function showLoadMoreButton() {
  loadMoreWrapperEl.classList.remove('is-hidden');
  loadMoreWrapperEl.setAttribute('aria-hidden', 'false');
}

export function hideLoadMoreButton() {
  loadMoreWrapperEl.classList.add('is-hidden');
  loadMoreWrapperEl.setAttribute('aria-hidden', 'true');
}
