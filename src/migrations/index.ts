import * as migration_20250116_211420 from './20250116_211420';
import * as migration_20250117_091226 from './20250117_091226';
import * as migration_20250117_093327 from './20250117_093327';

export const migrations = [
  {
    up: migration_20250116_211420.up,
    down: migration_20250116_211420.down,
    name: '20250116_211420',
  },
  {
    up: migration_20250117_091226.up,
    down: migration_20250117_091226.down,
    name: '20250117_091226',
  },
  {
    up: migration_20250117_093327.up,
    down: migration_20250117_093327.down,
    name: '20250117_093327'
  },
];
