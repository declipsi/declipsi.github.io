import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjectsByTag,
  filterProjectsByKey,
  calculateHorizontalScrollProgress,
  stepSmoothScrollProgress,
  computeSpringPullOffset,
  validateProjectBrief,
  getThreadPointAtProgress,
  getStoryThreadSvgPath,
} from './portfolioLogic';
import { PORTFOLIO_I18N, PROJECTS } from '../data/portfolioData';

test('filterProjectsByKey and filterProjectsByTag work across EN, DE, and RU', () => {
  const enProjects = PORTFOLIO_I18N.en.projects;
  assert.equal(filterProjectsByKey(enProjects, 'all').length, 4);
  assert.equal(filterProjectsByKey(enProjects, 'motion3d').length, 2);
  assert.equal(filterProjectsByKey(enProjects, 'landings').length, 1);

  assert.equal(filterProjectsByTag(PROJECTS, 'Все').length, 4);
  assert.equal(filterProjectsByTag(PROJECTS, 'Motion & 3D').length, 2);
  assert.equal(filterProjectsByTag(PROJECTS, 'Промо-лендинги').length, 1);
});

test('getThreadPointAtProgress follows curve Y variations and exits downward at progress=1', () => {
  const svgPath = getStoryThreadSvgPath();
  assert.ok(svgPath.startsWith('M 95.0 0.0'));

  const startPt = getThreadPointAtProgress(0);
  const midPt1 = getThreadPointAtProgress(0.2);
  const midPt2 = getThreadPointAtProgress(0.45);
  const endPt = getThreadPointAtProgress(1);

  // Verify Y is not constant (the bead follows the wave up and down)
  assert.notEqual(startPt.y, midPt1.y);
  assert.notEqual(midPt1.y, midPt2.y);

  // Verify at progress = 1, the thread curves downward to the bottom edge (y = 500, x = 3475)
  assert.equal(endPt.y, 500);
  assert.equal(endPt.x, 3475);
});

test('stepSmoothScrollProgress smoothly interpolates toward target and snaps when close', () => {
  const mid = stepSmoothScrollProgress(0, 1, 0.2);
  assert.equal(mid, 0.2);

  const snapped = stepSmoothScrollProgress(0.9998, 1, 0.2);
  assert.equal(snapped, 1);
});

test('calculateHorizontalScrollProgress clamps progress and switches active scenes', () => {
  const beforeTrack = calculateHorizontalScrollProgress(100, 500, 3000, 1000, 3);
  assert.equal(beforeTrack.progress, 0);
  assert.equal(beforeTrack.activeSceneIndex, 0);
  assert.equal(beforeTrack.translateXPercent, 0);

  const midTrack = calculateHorizontalScrollProgress(1400, 500, 3000, 1000, 3);
  assert.equal(midTrack.progress, 0.5);
  assert.equal(midTrack.activeSceneIndex, 1);
  assert.ok(Math.abs(midTrack.translateXPercent - -33.3333) < 0.01);

  const endTrack = calculateHorizontalScrollProgress(3000, 500, 3000, 1000, 3);
  assert.equal(endTrack.progress, 1);
  assert.equal(endTrack.activeSceneIndex, 2);
  assert.ok(Math.abs(endTrack.translateXPercent - -66.6667) < 0.01);
});

test('computeSpringPullOffset triggers easter egg when pulled past threshold', () => {
  const restState = computeSpringPullOffset(0, 0);
  assert.equal(restState.shouldShowEasterEgg, false);
  assert.equal(restState.distance, 0);

  const pulledState = computeSpringPullOffset(45, -35);
  assert.equal(pulledState.shouldShowEasterEgg, true);
  assert.ok(pulledState.distance > 24);
  assert.ok(pulledState.stretchScale > 1);
});

test('validateProjectBrief localizes error messages for EN, DE, and RU', () => {
  const emptyEn = validateProjectBrief(
    { name: '', contact: 'invalid', projectType: 'Motion', message: 'short' },
    'en'
  );
  assert.equal(emptyEn.valid, false);
  assert.ok(emptyEn.errors.name?.includes('Please enter your name'));

  const emptyDe = validateProjectBrief(
    { name: '', contact: 'invalid', projectType: 'Motion', message: 'short' },
    'de'
  );
  assert.equal(emptyDe.valid, false);
  assert.ok(emptyDe.errors.name?.includes('Bitte geben Sie Ihren Namen'));

  const validRu = validateProjectBrief(
    {
      name: 'Алексей',
      contact: '@alex_marketing',
      projectType: 'Motion & 3D',
      message: 'Нужна серия из 5 роликов для TikTok с 3D-объектами и промо-лендинг.',
    },
    'ru'
  );
  assert.equal(validRu.valid, true);
});
