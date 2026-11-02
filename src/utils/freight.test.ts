import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateQuoteForm,
  generateQuoteReferenceId,
  calculateEstimatedRate,
  QuoteFormData,
} from './freight';

test('validateQuoteForm flags incomplete form with descriptive errors', () => {
  const result = validateQuoteForm({});
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.businessEmail);
  assert.ok(result.errors.companyName);
  assert.ok(result.errors.phoneNumber);
  assert.ok(result.errors.originLocation);
  assert.ok(result.errors.destinationLocation);
  assert.ok(result.errors.freightType);
  assert.ok(result.errors.cargoType);
  assert.ok(result.errors.approxWeightLbs);
  assert.ok(result.errors.dimensionsOrPallets);
  assert.ok(result.errors.preferredDate);
});

test('validateQuoteForm passes when all required fields are valid', () => {
  const validData: QuoteFormData = {
    fullName: 'David Vance',
    businessEmail: 'david.vance@apexsupply.com',
    companyName: 'Apex Industrial Supply',
    phoneNumber: '3125550198',
    originLocation: 'Port of Long Beach, Pier J, CA',
    destinationLocation: 'Chicago Rail Ramp / Bolingbrook DC, IL',
    freightType: 'intermodal-rail',
    cargoType: 'standard-dry',
    approxWeightLbs: 38500,
    dimensionsOrPallets: '1x 40ft High-Cube (22 Pallets)',
    preferredDate: '2026-11-15',
    liftgateRequired: false,
    appointmentRequired: true,
  };

  const result = validateQuoteForm(validData);
  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('generateQuoteReferenceId returns unique format starting with BCS-Q', () => {
  const id1 = generateQuoteReferenceId();
  const id2 = generateQuoteReferenceId();
  assert.ok(id1.startsWith('BCS-Q-'));
  assert.ok(id2.startsWith('BCS-Q-'));
  assert.notEqual(id1, id2);
});

test('calculateEstimatedRate reflects higher carbon reduction for intermodal rail', () => {
  const railRate = calculateEstimatedRate({
    freightType: 'intermodal-rail',
    approxWeightLbs: 35000,
  });

  const ftlRate = calculateEstimatedRate({
    freightType: 'ftl',
    approxWeightLbs: 35000,
  });

  assert.ok(railRate.carbonReductionPercent > ftlRate.carbonReductionPercent);
  assert.ok(railRate.estimatedCostMin > 0);
  assert.ok(railRate.estimatedCostMax > railRate.estimatedCostMin);
});
