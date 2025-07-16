import { params } from './params.js';
import { build_row } from './build-row.js';
import { run_scroll_observer, stop_scroll_observer } from './scroll-observer.js';



/*

capire dove sistemare: in getData? o funzione ad hoc?

    searchInfoContainer.innerHTML = search_info?
      `<em>Ricerca per</em><br>${search_info.type}: <strong>${search_info.value}</strong>`
      : '';
    params.spinnerWrapper.classList.add('off');
    params.searchFormFset.disabled = false;
    params.orderByBtnsFset.disabled = false;
    params.searchFieldsFset.disabled = false;
    Array.from(params.filterBtnsFset.querySelectorAll('input[type="radio"]'), (i) => i.checked = false);

 */

function setSearchParams() {

  params.searchParams = {
    ...{
      q: null,
      orderBy: null,
      authorId: null,
      pag: 0,
      limit: 20,
      serieId: null
    },
    ...params.searchParams,
    q: params.searchInput.value.trim() || null,
    orderBy: params.orderByBtnsFset.querySelector('[type="radio"]:checked').value || null,
  };
}


export async function getData() {

  setSearchParams();

  // TODO history

  // console.log(search_params);

  async function runGetData() {


// TODO script esterno, scrollTo in reset?
    if(params.searchParams.pag === 0) {
      window.scrollTo(0, 0);
      params.resultWrapper.innerHTML = '';
      params.observer_element?.remove();
      params.observer_element = null;
    }

    const url = params.getData_url,
      urlParams = url.searchParams;

console.log(params.searchParams);
    for(const i in params.searchParams) {
      if(params.searchParams[i]) {
        urlParams.set(i, params.searchParams[i]);
      }
    }


    // console.log(url.toString());

    const response = await fetch(url.toString()),
      data = await response.json();
    return data;

  }

  params.searchFormFset.disabled = true;
  params.spinnerWrapper.classList.remove('off');

  const data = await runGetData();

  if(data.length < params.searchParams.limit && params.observer_element) {
    stop_scroll_observer()
  }

  params.resultWrapper.insertAdjacentHTML('beforeend',
    data.map(row => build_row(row)).join('')
  );



  if(data.length < params.searchParams.limit ) {
    params.resultWrapper.insertAdjacentHTML('beforeend',
      '<div class="bookend"><img src="/favicon.svg" alt=""></div>'
    );
  }

  if(!params.observer_element && data.length === params.searchParams.limit) {
    run_scroll_observer();
  }

  params.spinnerWrapper.classList.add('off');
  params.searchFormFset.disabled = false;

  // console.log('params.observer_element', params.observer_element !== null, 'pag', search_params.pag);

}
