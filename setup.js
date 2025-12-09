const mysql = require('mysql2/promise');
const fs = require('fs');

// Load .env.local if available
try {
  require('dotenv').config({ path: '.env.local' });
} catch (_) {
  // dotenv may not be installed; that's fine if env vars are set by other means
}

const sql = fs.readFileSync('setup.sql', 'utf8');

async function setupDatabase() {
  let connection;
  try {
    // Connect without database first (to run CREATE DATABASE)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    });

    // Execute the SQL (includes CREATE DATABASE/USE/CREATE TABLE/INSERT)
    await connection.query(sql);
    console.log('Database setup completed successfully.');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    if (connection) await connection.end();
  }
}

setupDatabase();
