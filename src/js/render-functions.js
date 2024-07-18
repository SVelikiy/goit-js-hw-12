import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { list } from '../main';


let modal = new SimpleLightbox('.gallery a', {
  captions: true,
  captionType: 'attr',
  captionPosition: 'bottom',
  captionDelay: 250,
  captionsData: 'alt',
});


export function createMarkup(arr) {
  if (arr.length === 0) {
     return showMessage();
  }
  const markup = arr
    .map(
      ({
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        largeImageURL,
      }) => {
        return `<li class="gallery-item">
  <a class="gallery-link" href=${largeImageURL} onclick="event.preventDefault()">
    <img
      class="gallery-image"
      src=${webformatURL}
      alt=${tags} /></a>
      <div class="list-info">
      <ul class="info-items">
  <li class="item-info">
    <h3  class="item-title">Likes</h3>
    <p class="item-text">${likes}</p>
  </li>
  <li class="item-info">
    <h3 class="item-title">Views</h3>
    <p class="item-text">${views}</p>
  </li>
  <li class="item-info">
    <h3 class="item-title">Comments</h3>
    <p class="item-text">${comments}</p>
  </li>
  <li class="item-info">
    <h3 class="item-title">Downloads</h3>
    <p class="item-text">${downloads}</p>
  </li>
</ul>
      </div>
</li>`;
      }
    )
    .join('');
  list.insertAdjacentHTML('beforeend', markup);
  modal.refresh();
}

function showMessage() {
    iziToast.show({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      messageColor: '#fff',
      backgroundColor: 'red',
      position: 'topRight',
    });
}

