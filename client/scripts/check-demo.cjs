const assert = require('node:assert/strict');
const db = require('../src/demo/data.json');
let count = 0;
for (const [name, rows] of Object.entries(db)) {
  assert.equal(new Set(rows.map(row => row.id)).size, rows.length, name);
  for (const row of rows) {
    if ('date' in row) assert.ok(Number.isFinite(Date.parse(row.date)), name);
  }
  count += rows.length;
}
for (const order of db.orders) {
  assert.ok(db.contragents.some(row => row.id === order.seller_id));
  assert.ok(db.contragents.some(row => row.id === order.buyer_id));
}
console.log(`Validated ${count} demo records`);
