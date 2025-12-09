const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function resetDatabase() {
  let connection;
  try {
    // Connect without database first
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true,
    });

    console.log('Dropping existing database...');
    await connection.query('DROP DATABASE IF EXISTS cordia_contacts');
    console.log('Database dropped successfully');

    console.log('Creating new database...');
    await connection.query('CREATE DATABASE cordia_contacts');
    console.log('Database created successfully');

    console.log('Creating tables...');
    await connection.query('USE cordia_contacts');

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created');

    // Create contacts table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Contacts table created');

    // Insert sample contacts
    await connection.query(`
      INSERT INTO contacts (name, email, phone) VALUES
      ('John Doe', 'john@example.com', '123-456-7890'),
      ('Jane Smith', 'jane@example.com', '098-765-4321'),
      ('Bob Johnson', 'bob@example.com', '555-123-4567')
    `);
    console.log('Sample contacts inserted');

    console.log('✓ Database reset completed successfully!');
  } catch (error) {
    console.error('Error resetting database:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

resetDatabase();
