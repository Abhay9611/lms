const dns = require('dns');
const net = require('net');
const https = require('https');

// Test internet by resolving a DNS record
function testInternetConnection() {
  return new Promise((resolve, reject) => {
    dns.lookup('google.com', (err) => {
      if (err) {
        reject('❌ No internet connection (DNS lookup failed)');
      } else {
        resolve('✅ Internet connection is working (DNS resolved google.com)');
      }
    });
  });
}

// Test outbound connection by opening a TCP socket
function testOutboundConnection(host = '8.8.8.8', port = 53) {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.setTimeout(3000);

    socket.on('connect', () => {
      socket.destroy();
      resolve(`✅ Outbound connection to ${host}:${port} is working`);
    });

    socket.on('timeout', () => {
      socket.destroy();
      reject(`❌ Outbound connection to ${host}:${port} timed out`);
    });

    socket.on('error', (err) => {
      socket.destroy();
      reject(`❌ Outbound connection to ${host}:${port} failed: ${err.message}`);
    });

    socket.connect(port, host);
  });
}

// Test HTTPS connection to www.google.com
function testHttpsConnection() {
  return new Promise((resolve, reject) => {
    https
      .get('https://www.google.com', (res) => {
        if (res.statusCode === 200) {
          resolve('✅ HTTPS connection to www.google.com succeeded');
        } else {
          reject(`❌ HTTPS connection to www.google.com returned status ${res.statusCode}`);
        }
      })
      .on('error', (err) => {
        reject(`❌ HTTPS connection to www.google.com failed: ${err.message}`);
      });
  });
}

// Test connection to a Supabase HTTPS endpoint
function testSupabaseHttpsConnection(host = 'db.ojbbucpjfmbrkdjszizv.supabase.co') {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'HEAD',
      hostname: host,
      port: 443,
      path: '/',
    };

    const req = https.request(options, (res) => {
      resolve(`✅ HTTPS connection to ${host} succeeded with status ${res.statusCode}`);
    });

    req.on('error', (e) => {
      reject(`❌ HTTPS connection to ${host} failed: ${e.message}`);
    });

    req.end();
  });
}

// Test TCP connection to Supabase database on port 5432
function testSupabasePostgresPort(host = 'db.ojbbucpjfmbrkdjszizv.supabase.co', port = 5432) {
  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.setTimeout(3000);

    socket.on('connect', () => {
      socket.destroy();
      resolve(`✅ TCP connection to ${host}:${port} (Postgres) succeeded`);
    });

    socket.on('timeout', () => {
      socket.destroy();
      reject(`❌ TCP connection to ${host}:${port} (Postgres) timed out`);
    });

    socket.on('error', (err) => {
      socket.destroy();
      reject(`❌ TCP connection to ${host}:${port} (Postgres) failed: ${err.message}`);
    });

    socket.connect(port, host);
  });
}

// Run all tests
async function runTests() {
  console.log('Running connection tests...\n');

  const tests = [
    testInternetConnection,
    testOutboundConnection,
    testHttpsConnection,
    // testSupabaseHttpsConnection,
    testSupabasePostgresPort
  ];

  for (const test of tests) {
    try {
      const result = await test();
      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

  console.log('\nTest complete.');
}

runTests();
