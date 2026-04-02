import assert from 'node:assert/strict';
import { ratioPadding, filterByQuery } from '../src/shared/media.js';
import { media } from '../server/data/seed.mjs';

const ratios = Object.keys(ratioPadding).sort();
assert.deepEqual(ratios, ['1:1', '2:3', '3:4', '9:16']);

assert.ok(filterByQuery(media, 'soweto').length > 0);
assert.ok(filterByQuery(media, 'mandela').length > 0);
assert.ok(filterByQuery(media, '1955').length > 0);

console.log('core flow checks passed');
