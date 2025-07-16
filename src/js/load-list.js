import { params } from './params.js';

// TODO annulla filtro
// TODO filtri separati con interfaccia caricata ad hoc?
// TODO annulla filtro (torna alla lista)


// list loader init
(() => {

  params.filterBtnsFset.addEventListener('click', e => {

    if(e.target.classList.contains('filter-btn')) {

      const radio = document.getElementById(e.target.getAttribute('for'));
      radio.checked = true;

      loadList(radio.value);
    }
  }, false);

  // reset filter
  params.resultWrapper.addEventListener('click', e => {
    if(e.target.id === 'reset-list-filter') {
      params.searchForm.submit();
    }
  }, false);

})();


function loadList(list) {

  params.searchFormFset.disabled = true;
  params.spinnerWrapper.classList.remove('off');

  params.observer_element?.remove();
  params.resultWrapper.innerHTML = '';

  const url = params.get_list_url;
  const searchParams = new URLSearchParams(url.search);
  searchParams.set('l', list);
  url.search = searchParams.toString();

  (async () => {
    const response = await fetch(url),
      data = await response.json();
    return data;
  })()
    .then(data => {


      params.resultWrapper.innerHTML = '<p class="text-center mt-1"><button class="btn btn-outline" type="button" id="reset-list-filter">Annulla</button></p>' +

      '<ul class="list">' +
        data.map(item => `<li role="button" data-${list}-id="${item.id}">${item.name}</li>`).join('') +
      '</ul>';

      params.spinnerWrapper.classList.add('off');
      params.searchFormFset.disabled = false;
      params.orderByBtnsFset.disabled = true;
      params.searchFieldsFset.disabled = true;


    })
    .catch(err => {
      /* eslint-disable no-console */
      console.error(url);
      console.error(err);
      /* eslint-enable no-console */

      alert('Si è verificato un errore (getList)');
    });



}
