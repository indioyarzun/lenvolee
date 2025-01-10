import * as migration_20250110_103814 from './20250110_103814';

export const migrations = [
  {
    up: migration_20250110_103814.up,
    down: migration_20250110_103814.down,
    name: '20250110_103814'
  },
];
