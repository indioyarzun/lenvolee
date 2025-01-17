import * as migration_20250116_211420 from './20250116_211420';
import * as migration_20250117_091226 from './20250117_091226';

export const migrations = [
  {
    up: migration_20250116_211420.up,
    down: migration_20250116_211420.down,
    name: '20250116_211420',
  },
  {
    up: migration_20250117_091226.up,
    down: migration_20250117_091226.down,
    name: '20250117_091226'
  },
];
