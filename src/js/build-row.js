/* eslint-disable eqeqeq */

/*
[
  "id",
  "title",
  "title_sort",
  "pubdate",
  "timestamp",
  "author",
  "author_sort",
  "serie",
  "series_index",
  "publisher",
  "tags",
  "comment",
  "rating",
  "amz",
  "lettura",
  "data_lettura"
]
*/

import { params } from './params,js';
import amazonLogoFill from '@icons/amazon-logo-fill.svg?inline';
// import amazonLogo from '@icons/amazon-logo.svg?inline';
import amazonLogoBold from '@icons/amazon-logo-bold.svg?inline';
import books from '@icons/books.svg?inline';
import calendarBlank from '@icons/calendar-blank.svg?inline';
import chatCenteredDots from '@icons/chat-centered-dots.svg?inline';
import eyeglasses from '@icons/eyeglasses.svg?inline';
import file from '@icons/file.svg?inline';
// import googleLogo from '@icons/google-logo.svg?inline';
import googleLogoBold from '@icons/google-logo-bold.svg?inline';
import image from '@icons/image.svg?inline';
import tag from '@icons/tag.svg?inline';


export function build_row(data) {

  function dateStringToIso(str) {
    const d = new Date(str);
    return  d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  function printIcon(icon, className='icon top-adjust dark', attrs='') {
    icon = icon.replace(/<svg/, `<svg class="${className}"`);
    if(attrs) {
      icon = icon.replace(/<svg/, `<svg ${attrs}`);
    }
    return icon;
  }


  data.authors = JSON.parse(data.authors);
  data.tags = JSON.parse(data.tags);

}
/*
return `<article class="book${data.letto? ' letto' : ''}">
  <div class="book-inner">

    <div class="book-cover">
      ${+data.has_cover? `<img src="${params.CALIBRE_COVERS_BASE_URL}/${data.id}-minia.avif" alt="Cover" loading="lazy">` : ''}
    </div>

    <div class="book-data">
      <div class="author">
        ${data.authors.map(a => `<span role="button" data-author-id="${a.id}">${a.name}</span>`).join(', ')}
      </div>
      <h2 class="title">${data.title}</h2>
      ${data.serie? `<div class="serie" role="button" data-serie-id="${data.serie_id}"><span>${data.serie}</span> ${data.series_index}</div>` : ''}
      <div class="publisher">
        ${data.prima_ediz?  `<time title="Anno prima edizione">${data.prima_ediz}</time> / ` : ''}
        ${data.publisher?? '\u2014'} ${(data.pub_year && data.pub_year != '0101')? ` (<time>${data.pub_year}</time>)` : ''}
      </div>

      <div class="info">
        ${(data.tags.length) ?
          `<span class="tags-wrapper">
            ${data.tags.length?
              `${printIcon(tag)}&nbsp;` +
              `<span class="tags">${data.tags.map(t => `<span role="button" data-tag-id="${t.id}">${t.name}</span>`).join('/')}</span>`
            : ''}
          </span>`
        : ''}


        ${data.timestamp?
          `<time class="text-muted text-nowrap" datetime="${dateStringToIso(data.timestamp)}">
            ${printIcon(calendarBlank)}
            ${new Date(data.timestamp).toLocaleString('it-IT', { year: '2-digit', month: 'short', day: 'numeric' })}
          </time>`
        : ''}

        <span class="formats-wrapper">
          ${printIcon(file)}
          <span class="file-formats">${data.files_format?? '&mdash;'}</span>
        </span>

      </div>

      <div class="info">
        ${data.amz? `${printIcon(amazonLogoFill, 'icon icon-lg top-adjust')}` : ''}

        ${(data.data_lettura || data.rating)?
          `<span>
            ${data.data_lettura? printIcon(eyeglasses) : ''}
            <time class="text-muted mx-1" datetime=${dateStringToIso(data.data_lettura)}>${data.data_lettura? new Date(data.data_lettura).toLocaleString('it-IT', { year: '2-digit', month: 'short', day: 'numeric' }) : ''}</time>
            <span class="rating">${data.rating? '\u2605'.repeat(data.rating) : ''}</span>
          </span>`
        : ''}

        <span>
          ${printIcon(books)}
          <span class="scaffale">${data.scaffale? `<span role="button" data-scaffale-id="${data.scaffale_id}">${data.scaffale}</span>` : '\u2014'}</span>
        </span>

      </div>
    </div>

    <div class="book-utils">
      <a href="https://www.google.it/search?q=${encodeURIComponent(data.authors.map(a => a.name).join(', '))}" target="_blank" rel="noopener noreferrer">
        ${printIcon(googleLogoBold, 'icon')}
      </a>

      <a href="https://www.amazon.it/s?k=${encodeURIComponent(data.authors.map(a => a.name).join(', '))}&i=digital-text" target="_blank" rel="noopener noreferrer">
        ${printIcon(amazonLogoBold, 'icon')}
      </a>
    </div>

  </div>

  <div class="details-trigger">
    <button type="button"${(!data.comment && !data.has_cover)? ' disabled' : ''}>
      ${printIcon((data.comment || (!data.comment && !data.has_cover))? chatCenteredDots : image, 'icon')}
    </button>
  </div>
  ${(data.comment || data.has_cover)? `<section class="details">
    <div>
    ${data.comment?? ''}
    ${+data.has_cover? `<div class="cover"><img src="${params.CALIBRE_COVERS_BASE_URL}/${data.id}.avif" alt="Cover" loading="lazy"></div>` : ''}
    </div>
  </section>` : ''}
</article>`;
*/
