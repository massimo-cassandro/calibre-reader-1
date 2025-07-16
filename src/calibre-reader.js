import './calibre-reader.css';

//  imposta alcuni elementi di params dal DOM
import './js/init.js';

// attiva i vari listener legati al form di ricerca
import './js/listeners.js';

// listeners e funzioni legate alle liste degli autori, tags, serie ecc
// import './js/load-list'; // TODO da implementare

// caricamento inziale
import { getData } from './js/get-data.js';

// TODO creazopme searchparams da url
getData();
