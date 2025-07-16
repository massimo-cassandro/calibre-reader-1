import { params } from './params.js';
import markup from './markup.html';

(() => {

  params.container.innerHTML = markup;

  params.searchForm           = params.container.querySelector('.search-form'); // form
  params.searchFormFset       = params.container.querySelector('.search-form-fset'); // fieldset
  params.resultWrapper        = params.container.querySelector('.result-wrapper');
  params.orderByBtnsFset      = params.container.querySelector('.search-options.orderBy');
  params.filterBtnsFset       = params.container.querySelector('.search-options.filter');
  params.searchFieldsFset     = params.container.querySelector('.searchFields');
  params.searchInput          = params.searchFormFset.querySelector('.search-input'),
  params.searchInfoContainer  = params.searchFormFset.querySelector('.search-info');


  console.log(params);

})();
