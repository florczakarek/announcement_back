import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'announcements',
  namedPlaceholders: true,
  decimalNumbers:true,
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
});
