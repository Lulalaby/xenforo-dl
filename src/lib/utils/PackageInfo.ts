import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ObjectHelper from './ObjectHelper.js';

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
  author: string;
  repository: string;
  banner: string;
}

let info: PackageInfo | null = null;

export function getPackageInfo() {
  if (info === null) {
    try {
      const packagePaths: string[] = [];

      try {
        const packageURL = new URL('../../../package.json', import.meta.url);
        packagePaths.push(fileURLToPath(packageURL));
      }
      catch {
      }

      packagePaths.push(path.resolve(process.cwd(), 'package.json'));

      if ((process as NodeJS.Process & { pkg?: unknown }).pkg) {
        packagePaths.push(path.resolve(path.dirname(process.execPath), 'package.json'));
        packagePaths.push(path.resolve('/snapshot', 'package.json'));
      }

      const packagePath = packagePaths.find((candidate) => candidate && fs.existsSync(candidate));
      if (!packagePath) {
        throw new Error('Unable to locate package.json');
      }

      const json = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
      info = {
        name: json.name || '',
        version: json.version || '',
        description: json.description || '',
        author: json.author || '',
        repository: ObjectHelper.getProperty(json, 'repository.url') || '',
        banner: json.name && json.version && json.description ?
          `${json.name} v${json.version} ${json.description}` : ''
      };
    }
    catch {
      info = {
        name: '',
        version: '',
        description: '',
        author: '',
        repository: '',
        banner: ''
      };
    }
  }
  return info;
}
