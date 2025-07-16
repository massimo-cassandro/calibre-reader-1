/* eslint-env node */

import { URL } from 'url';
import * as path from 'path';
import os from 'node:os';


const current_dir = new URL('.', import.meta.url).pathname;

const params = {
  // calibre_dir: path.resolve(current_dir, '../../../../../../Google Drive/ebook-calibre'),
  calibre_dir: path.join(os.homedir(), '/Library/Mobile Documents/com~apple~CloudDocs/ebook-calibre'),
  last_import_file: path.resolve(current_dir, '../covers-last-import.json'),
  last_import: null,
  covers_dir: path.resolve(current_dir, '../covers'),
  cover_minia_width: 90,
  cover_width: 560,
};

params.db_file = path.join(params.calibre_dir, 'metadata.db');

// console.log(current_dir);
// console.log(params);

export { params };
