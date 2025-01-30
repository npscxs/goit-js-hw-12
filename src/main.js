import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const PER_PAGE = 15;
let currentPage = 1;
let currentQuery = '';

const form = document.getElementById('search-form');
const loader = document.getElementById('loader');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.classList.add('btn-more');
loadMoreBtn.style.display = 'none';
document.body.appendChild(loadMoreBtn);

form.addEventListener('submit', async event => {
  event.preventDefault();
  const queryInput = document.getElementById('search-input');
  currentQuery = queryInput.value.trim();
  currentPage = 1;

  if (currentQuery === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
      position: 'topRight',
    });
    return;
  }

  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits);
    if (data.totalHits > PER_PAGE) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images.',
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loader.style.display = 'block';

  try {
    const data = await fetchImages(currentQuery, currentPage);
    renderImages(data.hits, true);
    if (currentPage * PER_PAGE >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images.',
      position: 'topRight',
    });
  } finally {
    loader.style.display = 'none';
  }
});
