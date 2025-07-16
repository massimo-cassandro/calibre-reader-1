/* global process */

// const isDev = process.env.NODE_ENV === 'development';

export const params = {
  container         : document.getElementById('app-root'),
  observer_element  : null,

  CALIBRE_COVERS_BASE_URL   : process.env.CALIBRE_COVERS_BASE_URL,
  getData_url       : new URL(process.env.API_URL + '/php/get-data.php', location.href),
  get_list_url      : new URL(process.env.API_URL + '/php/get-list.php', location.href),

  spinnerWrapper    : document.querySelector('.spinner-wrapper'),

  searchParams      : {pag: 0},

};

