/* eslint-disable no-console */
/* eslint-env node */

import * as fs from 'fs';
// import * as path from 'path';
// import { URL } from 'url';

import { params } from './params.mjs';


import sharp from 'sharp';

export async function parseCover(id, path) {



  const original_cover = params.calibre_dir + '/' + path + '/cover.jpg';

  try {

    // https://sharp.pixelplumbing.com/api-output#avif
    const stream = await sharp(original_cover);

    const promises = [
      stream.clone().resize({ width: params.cover_minia_width, fit: 'inside' })
        .avif({
          lossless: false,
          quality: 30,
          effort: 4
        })
        .toBuffer()
        .then( result => {
          fs.writeFileSync(`${params.covers_dir}/${id}-minia.avif`, result);
        }),

      stream.clone().resize({ width: params.cover_width, fit: 'inside' })
        .avif({
          lossless: false,
          quality: 30,
          effort: 4
        })
        .toBuffer()
        .then( result => {
          fs.writeFileSync(`${params.covers_dir}/${id}.avif`, result);
        })
    ];

    Promise.all(promises)
      .then( () => {

        console.log(`... ${id} processed`);

        // aggiornamento last_import_file
        // aggiornamento ad ogni ciclo per non perdere l'id in caso di errori
        params.last_import.id = Math.max(id, params.last_import.id?? 0);
        fs.writeFileSync(params.last_import_file, JSON.stringify(params.last_import));

      })
      .catch(err => { throw err; });

  } catch(e) {
    console.error( e );

  }

}
