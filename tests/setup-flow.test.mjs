import assert from 'node:assert/strict';
import test from 'node:test';
import { canOpen, changeProvider, demoSetup, initialSetup, isReady, validateSection } from '../src/model.js';

test('signal and account dependencies block downstream setup and activation', () => {
  const setup = initialSetup();
  assert.equal(canOpen(setup, 0), true);
  for (let i = 1; i < 7; i++) assert.equal(canOpen(setup, i), false);
  setup.signalConnected = true;
  assert.equal(canOpen(setup, 1), true);
  assert.equal(canOpen(setup, 2), false);
  setup.brokerConnected = true;
  assert.equal(canOpen(setup, 2), false);
  setup.account = 'Demo account';
  assert.equal(canOpen(setup, 2), true);
  assert.equal(isReady(setup, 6), false);
  setup.reviewed = { trading: true, goals: true, risk: true, filters: false };
  assert.equal(isReady(setup, 6), false);
  setup.reviewed.filters = true;
  assert.equal(isReady(setup, 6), true);
});

test('changing provider invalidates authenticated account, settings review, and active bot', () => {
  const setup = changeProvider({ ...demoSetup(), active: true }, 'MT5');
  assert.equal(setup.provider, 'MT5');
  assert.equal(setup.signalConnected, false);
  assert.equal(setup.brokerConnected, false);
  assert.equal(setup.account, '');
  assert.equal(setup.active, false);
  assert.equal(Object.values(setup.reviewed).some(Boolean), false);
  assert.equal(isReady(setup, 6), false);
});

test('invalid amounts, targets, and risk limits cannot pass review', () => {
  const setup = demoSetup();
  for (let i = 2; i < 6; i++) assert.equal(validateSection(setup, i), '');
  for (const invalid of ['0', '-10', 'NaN', '']) {
    assert.ok(validateSection({ ...setup, amount: invalid }, 2));
    assert.ok(validateSection({ ...setup, takeProfit: invalid }, 3));
    assert.ok(validateSection({ ...setup, dailyLoss: invalid }, 4));
    assert.ok(validateSection({ ...setup, spread: invalid }, 5));
  }
  assert.ok(validateSection({ ...setup, leverage: '101' }, 2));
  assert.ok(validateSection({ ...setup, name: ' ' }, 2));
});
