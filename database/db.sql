import mysql from 'mysql';

const pool = mysql.createPool({
  host: 'localhost',       // Host de tu base de datos (puede variar)
  user: 'root',      // Nombre de usuario de MySQL
  password: '', // Contraseña de MySQL
  database: 'pruebas' // Nombre de tu base de datos
});

export { pool };


-- to show all tables
show tables;

-- to describe table
describe customer;