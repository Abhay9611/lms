require('dotenv').config();
const db = require('./models');

db.sequelize.authenticate()
  .then(() => console.log('✅ DB Connected Successfully!'))
  .catch((err) => console.error('❌ Failed to connect to DB:', err));

const dns = require('dns');

const hostname = 'db.ojbbucpjfmbrkdjszizv.supabase.co';

dns.resolve4(hostname, (err4, addresses4) => {
  if (err4) {
    console.log(`IPv4 resolution failed: ${err4.message}`);
  } else {
    console.log(`IPv4 addresses: ${addresses4.join(', ')}`);
  }

  dns.resolve6(hostname, (err6, addresses6) => {
    if (err6) {
      console.log(`IPv6 resolution failed: ${err6.message}`);
    } else {
      console.log(`IPv6 addresses: ${addresses6.join(', ')}`);
    }
  });
});
