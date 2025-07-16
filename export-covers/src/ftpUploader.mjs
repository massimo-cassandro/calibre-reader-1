/* eslint-disable no-console */
/* global process */

import * as ftp from 'basic-ftp';
// import * as path from 'path';
import * as fs from 'fs';
// import * as url from 'url';
import 'dotenv/config'; //  --env-file=.env calling the script (node >= 20)
import { params } from './params.mjs';

// https://nodejs.org/api/util.html#utilstyletextformat-text-options
import { styleText } from 'node:util';



const compareDate = new Date(new Date().setMilliseconds(-1e5)).toISOString(); // now - 1e5 ms


export async function ftpUploader() {

  /*
    filesArray = [[source1, dest1], [source2, dest2]...]
    dir = path to dir to upload
  */

  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PWD,
      secure: false
    });
    // console.log(await client.list());

    // calibre db
    console.log( styleText(['blue'], 'Caricamento calibre metadata.db') );
    await client.uploadFrom(params.db_file, '/htdocs/db/metadata.db');

    // covers
    // NB carica anche DS_Store
    // await client.uploadFromDir(path.resolve(__dirname, '../../../dist/covers'), '/htdocs/calibre-reader/covers');

    // lettura dir covers
    const covers = [];
    fs.readdirSync(params.covers_dir)
      // .filter(f => /\.js$/.test(f))
      .filter(f => f !== '.DS_Store')
      .filter(f => new Date(fs.statSync(`${params.covers_dir}/${f}`).mtimeMs).toISOString() > compareDate)
      .forEach(file => {
        covers.push(file);
      });

    for await (const file of covers) {
      console.log( styleText(['green'], `...caricamento ${file}` ) );
      await client.uploadFrom(
        `${params.covers_dir}/${file}`,
        `/htdocs/calibre-reader/covers/${file}`
      );
    }

    if(!covers.length) {
      console.log( styleText(['cyan'], 'Nessuna copertina da caricare' ) );
    }


  } catch(err) {
    console.log(err);
  }

  client.close();
}

