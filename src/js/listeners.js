
import { params } from './params.js';
import { getData } from './get-data.js';
import { resetFields } from './reset-search-fields.js';

(() => {

  // =>> submit esegui ricerca
  params.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    getData();

  }, false);


  // =>> reset
  params.searchFormFset.querySelector('.reset-btn').addEventListener('click', () => {
    resetFields();
    params.searchForm.submit();

  }, false);


  // orderBy radio btns: al click viene rieseguita la ricerca
  params.orderByBtnsFset.addEventListener('click', e => {

    if(e.target.classList.contains('orderBy-btn')) {

      // TODO da togliere?
      // const radio = document.getElementById(e.target.getAttribute('for'));
      // radio.checked = true;
      params.searchForm.submit();
    }
  }, false);



/*
  // click authors, series ecc nella lista dei libri (resultWrapper)
  params.resultWrapper.addEventListener('click', e => {

    // authors
    if(e.target.hasAttribute('data-author-id')) {

      document.getElementById('orderBy-year').click();

      search_info = {
        type: 'autore',
        value: e.target.innerText
      };
      search_params = {
        authorId: +e.target.dataset.authorId,
      };
      searchInput.value = '';
      run_search();
    }

    // series
    if(e.target.closest('[data-serie-id]')) {


      const target = e.target.closest('[data-serie-id]');
      document.getElementById('orderBy-serie').click();

      search_info = {
        type: 'serie',
        value: target.closest('[data-serie-id]').querySelector('span').innerText
      };
      search_params = {
        serieId: +target.dataset.serieId,
      };
      searchInput.value = '';
      run_search();
    }


    // tags
    if(e.target.hasAttribute('data-tag-id')) {

      search_info = {
        type: 'tag',
        value: e.target.innerText
      };
      search_params = {
        tagId: +e.target.dataset.tagId,
      };
      searchInput.value = '';
      run_search();
    }

    // scaffale
    if(e.target.hasAttribute('data-scaffale-id')) {

      document.getElementById('orderBy-serie').click();

      search_info = {
        type: 'scaffale',
        value: e.target.innerText
      };
      search_params = {
        scaffaleId: +e.target.dataset.scaffaleId,
      };
      searchInput.value = '';
      run_search();
    }

    // TODO cambiare con nuovo metodo e predisporre per calc-size
    // https://frontendcoding.com/getting-the-height-of-a-hidden-element/
    function getHiddenHeight(el) {
      if(!el?.cloneNode) {
        return null;
      }

      // // lazy images
      // let img_height = 0;
      // const cover = el.querySelector('.cover img[loading="lazy"]');
      // if(cover) {
      //   console.log('cover');
      //   cover.loading = 'eager';
      //   cover.fetchPriority = 'high';
      //   img_height = cover.naturalHeight;
      //   console.log(1, img_height);
      // }

      const clone = el.cloneNode(true);
      Object.assign(clone.style, {
        overflow: 'visible',
        height: 'auto',
        maxHeight: 'none',
        opacity: '0',
        visibility: 'hidden',
        display: 'block',
      });

      el.after(clone);
      const height = clone.offsetHeight;

      clone.remove();

      return height;
    }

    // details
    if(e.target.closest('.details-trigger')) {
      const item_container = e.target.closest('.book'),
        details = item_container.querySelector('.details');

      // if(!details.dataset.height) {
      //   details.dataset.height = getHiddenHeight(details);
      //   details.style.setProperty('--details-height', details.dataset.height +'px');
      // }
      if(!getComputedStyle(details).getPropertyValue('--details-height')) {
        details.style.setProperty('--details-height', getHiddenHeight(details) +'px');
      }

      item_container.classList.toggle('details-on');
    }

  }, false);
 */
})();
