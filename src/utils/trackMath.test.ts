import test from 'node:test';
import assert from 'node:assert/strict';
import { generateLapCurvePoints, getLapPositionAtProgress, isCurveContinuous } from './trackMath.ts';

test('generates expected number of points', () => {
  const points = generateLapCurvePoints(64, 2.0, 1.5, 0.4);
  assert.equal(points.length, 64);
});

test('lap curve forms a smooth closed continuous loop', () => {
  const points = generateLapCurvePoints(80);
  assert.equal(isCurveContinuous(points, 0.35), true);
});

test('interpolates valid 3D coordinates along the lap', () => {
  const points = generateLapCurvePoints(80, 2.5, 2.0, 0.5);
  const posStart = getLapPositionAtProgress(0, points);
  const posMid = getLapPositionAtProgress(0.5, points);
  const posFull = getLapPositionAtProgress(1.0, points);

  // Position at 0 and 1.0 should match perfectly due to modulo loop
  assert.ok(Math.abs(posStart.x - posFull.x) < 0.0001);
  assert.ok(Math.abs(posStart.y - posFull.y) < 0.0001);
  assert.ok(Math.abs(posStart.z - posFull.z) < 0.0001);

  // Mid point should be well separated
  assert.notEqual(posStart.x, posMid.x);
});
