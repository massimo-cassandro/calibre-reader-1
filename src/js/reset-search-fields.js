import { params } from './params.js';

export function resetFields() {

  params.searchInput.value = '';
  params.resultWrapper.innerHTML = '';
  params.searchFormFset.querySelector('[type="radio"]:first-of-type').checked = true;
  params.searchInfoContainer.innerHTML = '';
  params.searchParams = {};
}
