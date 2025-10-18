const jwt = require('jsonwebtoken');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE2YWJlNDI4LTU5MjItNGFjZi1iNWI1LWIwYjFhNzQ4ZWI0MCIsImVtYWlsIjoidGVzdDJAZXhhbXBsZS5jb20iLCJyb2xlIjoiQ1VTVE9NRVIiLCJpYXQiOjE3NjA3ODgyNjcsImV4cCI6MTc2MDc5MTg2N30.tNXflMU9KzOwoLD92vgZsli0I0Ge2W408FO1s2q_Oss';
const secret = 'your-super-secret-jwt-key-change-this-in-production-12345';

try {
  const decoded = jwt.verify(token, secret);
  console.log('✅ Token hợp lệ!');
  console.log('Payload:', decoded);
} catch (err) {
  console.error('❌ Token không hợp lệ:', err.message);
}