const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Default database configuration
const defaultConfig = {
  host: 'localhost',
  user: 'aspirin3_learnify',
  password: '',
  database: 'aspirin3_learnify_db'
};

async function setupDatabase() {
  try {
    // Create connection without database
    const connection = await mysql.createConnection({
      host: defaultConfig.host,
      user: defaultConfig.user,
      password: defaultConfig.password
    });

    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${defaultConfig.database}`);
    console.log(`✅ Database '${defaultConfig.database}' created or already exists`);

    // Create .env file if it doesn't exist
    const envPath = path.join(__dirname, '../.env');
    if (!fs.existsSync(envPath)) {
      const envContent = `# Database Configuration
DB_NAME=${defaultConfig.database}
DB_USER=${defaultConfig.user}
DB_PASSWORD=${defaultConfig.password}
DB_HOST=${defaultConfig.host}

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=1d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_REFRESH_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development`;

      fs.writeFileSync(envPath, envContent);
      console.log('✅ Created .env file with default configuration');
    } else {
      console.log('ℹ️ .env file already exists');
    }

    await connection.end();
    console.log('✅ Setup completed successfully');
  } catch (error) {
    console.error('❌ Error during setup:', error);
    process.exit(1);
  }
}

setupDatabase(); 