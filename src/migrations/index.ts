import * as migration_20250110_105122 from './20250110_105122';

export const migrations = [
  {
    up: migration_20250110_105122.up,
    down: migration_20250110_105122.down,
    name: '20250110_105122'
  },
];
