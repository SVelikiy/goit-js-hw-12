import { getImg } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const searchForm = document.querySelector('.js-form');

const loader = document.querySelector('.js-loader');
const loadMoreBtn = document.querySelector('.js-loadmore');
const hiddenClass = 'is-hidden';
export const list = document.querySelector('.gallery');


searchForm.addEventListener('submit', handlerSubmit);
loadMoreBtn.addEventListener('click', handleLoad);

btnHidden(loadMoreBtn);

const searchParams = {
  q: '',
    page: 1,
    per_page: 15,
    max_Page : 0,
};

function emptyInput() {
  return iziToast.show({
    message: 'Please enter your request.',
    messageColor: '#fff',
    backgroundColor: 'red',
    position: 'topRight',
  });
}

function onFetchError() {
  iziToast.show({
    message: 'Something went wrong, please try again',
    messageColor: '#fff',
    backgroundColor: 'red',
    position: 'topRight',
  });
}

function endCollection() {
  iziToast.show({
    message: "We're sorry, but you've reached the end of search results.",
    messageColor: '#fff',
    backgroundColor: 'red',
    position: 'topRight',
  });
}

async function handlerSubmit(event) {
    event.preventDefault();
  btnHidden(loadMoreBtn);
  searchParams.page = 1;
  list.innerHTML = '';
  const form = event.currentTarget;
  searchParams.q = form.elements.search.value.toLowerCase().trim();
  loader.classList.add('loader');

    try {
      if (!searchParams.q) {
        form.reset();
        emptyInput();
        return;
      }
    const { hits, total } = await getImg(searchParams);
    searchParams.max_Page = Math.ceil(total / searchParams.per_page);
    createMarkup(hits);
    if (hits.length > 0 && searchParams.page < searchParams.max_Page) {
      btnShow(loadMoreBtn);
    } else {
      btnHidden(loadMoreBtn);
    }
  } catch (error) {
    console.error(error);
  } finally {
    form.reset();
    loader.classList.remove('loader');
  }
};

function btnHidden(button) {
  button.classList.add(hiddenClass);
}

function btnShow(button) {
  button.classList.remove(hiddenClass);
}

function btnDisabled(button) {
  button.disabled = true;
}

function btnEnabled(button) {
  button.disabled = false;
}

async function handleLoad() {
  searchParams.page += 1;
  btnDisabled(loadMoreBtn);
  loader.classList.add('loader');
  try {
    const { hits } = await getImg(searchParams);
      createMarkup(hits);
      const item = document.querySelector('.gallery-item');
      const heightOfElem = item.getBoundingClientRect().height;
      console.log(typeof(heightOfElem * 2));
      window.scrollBy({
        top: heightOfElem * 2,
        behavior: 'smooth',
      });
  } catch {
    onFetchError();
  } finally {
    btnEnabled(loadMoreBtn);
      loader.classList.remove('loader');
      if (searchParams.page === searchParams.max_Page) {
          endCollection();
          btnHidden(loadMoreBtn);
         loadMoreBtn.removeEventListener('click', handleLoad); 
      }
  }
};
