/* eslint-env node */

import * as fs from 'fs';
import * as path from 'path';
// import { URL } from 'url';

import { params } from './params.mjs';


export function coverHasBeenModified(ebook_dir, check_date) {

  const cover = path.join(params.calibre_dir, ebook_dir, 'cover.jpg');
  if(fs.existsSync(cover)) {

    const stats = fs.statSync(cover);
    if(stats.mtime > check_date) {
      return true;
    }
  }
  return false;
}
