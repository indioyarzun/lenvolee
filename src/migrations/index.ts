import * as migration_20250116_211420 from './20250116_211420';

export const migrations = [
  {
    up: migration_20250116_211420.up,
    down: migration_20250116_211420.down,
    name: '20250116_211420'
  },
];
