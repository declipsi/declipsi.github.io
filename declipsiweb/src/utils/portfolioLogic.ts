import {
  Locale,
  PORTFOLIO_I18N,
  ProjectCase,
  ProjectCategoryKey,
} from '../data/portfolioData';

export interface HorizontalScrollState {
  progress: number; // 0 to 1
  activeSceneIndex: 0 | 1 | 2;
  translateXPercent: number; // 0 to -66.6667 (for 3 panels)
}

export interface SpringPullState {
  clampedX: number;
  clampedY: number;
  distance: number;
  rotationDeg: number;
  stretchScale: number;
  shouldShowEasterEgg: boolean;
}

export interface ProjectBriefInput {
  name: string;
  contact: string;
  projectType: string;
  message: string;
}

export interface BriefValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    contact?: string;
    message?: string;
  };
}

export interface ThreadPoint {
  x: number;
  y: number;
  angleDeg: number;
  drawnLength: number;
  totalLength: number;
}

interface CubicBezierSegment {
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  p3: [number, number];
}

/**
 * Piecewise Cubic Bezier definition of the continuous story thread in 3600x500 coordinate space.
 * - Starts from top (95, 0) entering Scene 1 from the Hero section above
 * - Waves smoothly across Scene 1 (0..1200), Scene 2 (1200..2400), and Scene 3 (2400..3600)
 * - Curves downward at (3470, 500) inside Scene 3 so the thread exits through the bottom of the screen
 *   into the vertical Process Loop section instead of disappearing off the right edge.
 */
const THREAD_SEGMENTS: CubicBezierSegment[] = [
  // Segment 0: Enter from top of Scene 1 down into the horizontal flow
  {
    p0: [95, 0],
    p1: [95, 130],
    p2: [140, 255],
    p3: [260, 265],
  },
  // Segment 1: Wave through Scene 1 (Rabbit Holes 1–6)
  {
    p0: [260, 265],
    p1: [520, 285],
    p2: [680, 175],
    p3: [960, 245],
  },
  // Segment 2: Transition from Scene 1 into Scene 2 (Heart Pillars 1–3)
  {
    p0: [960, 245],
    p1: [1260, 320],
    p2: [1520, 165],
    p3: [1840, 250],
  },
  // Segment 3: Wave across Scene 2 into Scene 3 (Timeline 2019–2026)
  {
    p0: [1840, 250],
    p1: [2160, 335],
    p2: [2480, 175],
    p3: [2820, 250],
  },
  // Segment 4: Across Scene 3 cards toward the right side of Scene 3
  {
    p0: [2820, 250],
    p1: [3060, 305],
    p2: [3220, 215],
    p3: [3370, 265],
  },
  // Segment 5: Smooth 90-degree curve DOWNWARD to the bottom of Scene 3 (y = 500)
  {
    p0: [3370, 265],
    p1: [3455, 290],
    p2: [3475, 375],
    p3: [3475, 500],
  },
];

function evaluateCubicBezier(seg: CubicBezierSegment, t: number): [number, number] {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  const x =
    uuu * seg.p0[0] +
    3 * uu * t * seg.p1[0] +
    3 * u * tt * seg.p2[0] +
    ttt * seg.p3[0];
  const y =
    uuu * seg.p0[1] +
    3 * uu * t * seg.p1[1] +
    3 * u * tt * seg.p2[1] +
    ttt * seg.p3[1];
  return [x, y];
}

interface SampledThreadTable {
  points: { x: number; y: number; cumLength: number; angleDeg: number }[];
  totalLength: number;
  svgPathData: string;
}

const SAMPLED_THREAD: SampledThreadTable = (() => {
  const samplesPerSegment = 90;
  const rawPoints: [number, number][] = [];

  THREAD_SEGMENTS.forEach((seg, segIdx) => {
    const startStep = segIdx === 0 ? 0 : 1;
    for (let i = startStep; i <= samplesPerSegment; i++) {
      const t = i / samplesPerSegment;
      rawPoints.push(evaluateCubicBezier(seg, t));
    }
  });

  const points: { x: number; y: number; cumLength: number; angleDeg: number }[] = [];
  let cumLength = 0;

  for (let i = 0; i < rawPoints.length; i++) {
    const [x, y] = rawPoints[i];
    if (i > 0) {
      const [px, py] = rawPoints[i - 1];
      cumLength += Math.hypot(x - px, y - py);
    }
    const nextIdx = Math.min(rawPoints.length - 1, i + 1);
    const prevIdx = Math.max(0, i - 1);
    const dx = rawPoints[nextIdx][0] - rawPoints[prevIdx][0];
    const dy = rawPoints[nextIdx][1] - rawPoints[prevIdx][1];
    const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

    points.push({ x, y, cumLength, angleDeg });
  }

  const svgPathData = points
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`)
    .join(' ');

  return {
    points,
    totalLength: cumLength,
    svgPathData,
  };
})();

/**
 * Returns the SVG path string for the horizontal story thread.
 */
export function getStoryThreadSvgPath(): string {
  return SAMPLED_THREAD.svgPathData;
}

/**
 * Computes the exact (x, y) position on the story thread for a given scroll progress [0, 1],
 * ensuring the yellow bead follows the curve accurately and matches the drawn stroke tip.
 */
export function getThreadPointAtProgress(progress: number): ThreadPoint {
  const clamped = Math.max(0, Math.min(1, progress));
  // Start with a visible lead-in (8% drawn at progress=0) and reach 100% (bottom exit) at progress=1
  const drawnRatio = 0.08 + clamped * 0.92;
  const targetLen = drawnRatio * SAMPLED_THREAD.totalLength;
  const pts = SAMPLED_THREAD.points;

  // Binary search in cumulative arc-length table
  let low = 0;
  let high = pts.length - 1;
  while (low < high - 1) {
    const mid = (low + high) >> 1;
    if (pts[mid].cumLength <= targetLen) {
      low = mid;
    } else {
      high = mid;
    }
  }

  const p0 = pts[low];
  const p1 = pts[high];
  const segLen = Math.max(1e-6, p1.cumLength - p0.cumLength);
  const alpha = Math.max(0, Math.min(1, (targetLen - p0.cumLength) / segLen));

  const x = p0.x + (p1.x - p0.x) * alpha;
  const y = p0.y + (p1.y - p0.y) * alpha;

  return {
    x: Math.round(x * 100) / 100,
    y: Math.round(y * 100) / 100,
    angleDeg: Math.round(p0.angleDeg * 10) / 10,
    drawnLength: targetLen,
    totalLength: SAMPLED_THREAD.totalLength,
  };
}

/**
 * Filters portfolio projects by language-agnostic category key ('all' | 'motion3d' | 'ai' | 'reels' | 'landings').
 */
export function filterProjectsByKey(
  projects: ProjectCase[],
  categoryKey: ProjectCategoryKey
): ProjectCase[] {
  if (categoryKey === 'all') {
    return projects;
  }
  return projects.filter((project) => project.categoryKeys.includes(categoryKey));
}

/**
 * Backward-compatible filter by category label or key.
 */
export function filterProjectsByTag(
  projects: ProjectCase[],
  category: string
): ProjectCase[] {
  if (category === 'Все' || category === 'All' || category === 'Alle' || category === 'all') {
    return projects;
  }
  const keyMap: Record<string, ProjectCategoryKey> = {
    'Motion & 3D': 'motion3d',
    'AI-Креативы': 'ai',
    'AI Creatives': 'ai',
    'KI-Creatives': 'ai',
    'Reels / TikTok': 'reels',
    'Промо-лендинги': 'landings',
    'Promo Landings': 'landings',
    'Promo-Landings': 'landings',
  };
  const mappedKey = keyMap[category] as ProjectCategoryKey | undefined;
  if (mappedKey) {
    return filterProjectsByKey(projects, mappedKey);
  }
  return projects.filter((project) => project.categories?.includes(category));
}

/**
 * Smoothly interpolates current scroll progress toward target progress using exponential damping (lerp).
 */
export function stepSmoothScrollProgress(
  currentProgress: number,
  targetProgress: number,
  dampingFactor = 0.11
): number {
  const clampedTarget = Math.max(0, Math.min(1, targetProgress));
  const diff = clampedTarget - currentProgress;
  if (Math.abs(diff) < 0.0004) {
    return clampedTarget;
  }
  const next = currentProgress + diff * dampingFactor;
  return Math.max(0, Math.min(1, next));
}

/**
 * Computes horizontal scroll progress and active scene from vertical scroll coordinates.
 * Includes a bottom dwell buffer so Scene 3 reaches 100% completion before the sticky viewport unsticks.
 */
export function calculateHorizontalScrollProgress(
  scrollY: number,
  trackTop: number,
  trackHeight: number,
  viewportHeight: number,
  panelCount = 3
): HorizontalScrollState {
  // Use 90% of scrollable distance for horizontal travel so the last 10% acts as a clean dwell buffer on Scene 3
  const effectiveScrollable = Math.max(1, (trackHeight - viewportHeight) * 0.9);
  const rawProgress = (scrollY - trackTop) / effectiveScrollable;
  const progress = Math.max(0, Math.min(1, rawProgress));

  let activeSceneIndex: 0 | 1 | 2 = 0;
  if (progress >= 0.66) {
    activeSceneIndex = 2;
  } else if (progress >= 0.33) {
    activeSceneIndex = 1;
  }

  const maxTranslatePercent = ((panelCount - 1) / panelCount) * 100;
  const translateXPercent = progress === 0 ? 0 : -(progress * maxTranslatePercent);

  return {
    progress,
    activeSceneIndex,
    translateXPercent,
  };
}

/**
 * Converts a normalized [0, 1] damped progress value into HorizontalScrollState.
 */
export function progressToHorizontalState(
  dampedProgress: number,
  panelCount = 3
): HorizontalScrollState {
  const progress = Math.max(0, Math.min(1, dampedProgress));
  let activeSceneIndex: 0 | 1 | 2 = 0;
  if (progress >= 0.66) {
    activeSceneIndex = 2;
  } else if (progress >= 0.33) {
    activeSceneIndex = 1;
  }
  const maxTranslatePercent = ((panelCount - 1) / panelCount) * 100;
  const translateXPercent = progress === 0 ? 0 : -(progress * maxTranslatePercent);

  return {
    progress,
    activeSceneIndex,
    translateXPercent,
  };
}

/**
 * Computes elastic spring displacement and easter-egg trigger for the footer cutout sticker.
 */
export function computeSpringPullOffset(
  deltaX: number,
  deltaY: number,
  maxRadius = 110,
  triggerThreshold = 24
): SpringPullState {
  const rawDistance = Math.hypot(deltaX, deltaY);
  if (rawDistance === 0) {
    return {
      clampedX: 0,
      clampedY: 0,
      distance: 0,
      rotationDeg: 0,
      stretchScale: 1,
      shouldShowEasterEgg: false,
    };
  }

  const dampedDistance =
    rawDistance <= maxRadius
      ? rawDistance
      : maxRadius + Math.log1p(rawDistance - maxRadius) * 14;

  const finalDistance = Math.min(maxRadius * 1.25, dampedDistance);
  const scaleRatio = finalDistance / rawDistance;

  const clampedX = Math.round(deltaX * scaleRatio * 100) / 100;
  const clampedY = Math.round(deltaY * scaleRatio * 100) / 100;
  const rotationDeg = Math.max(-22, Math.min(22, clampedX * 0.18));
  const stretchScale = 1 + Math.min(0.18, finalDistance / 550);

  return {
    clampedX,
    clampedY,
    distance: Math.round(finalDistance * 100) / 100,
    rotationDeg: Math.round(rotationDeg * 100) / 100,
    stretchScale: Math.round(stretchScale * 1000) / 1000,
    shouldShowEasterEgg: rawDistance >= triggerThreshold,
  };
}

/**
 * Validates the "Discuss Project" brief inquiry form with localized error messages.
 */
export function validateProjectBrief(
  input: ProjectBriefInput,
  locale: Locale = 'en'
): BriefValidationResult {
  const errors: BriefValidationResult['errors'] = {};
  const errCopy = PORTFOLIO_I18N[locale].brief.errors;
  const trimmedName = input.name.trim();
  const trimmedContact = input.contact.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = errCopy.name;
  }

  if (
    trimmedContact.length < 3 ||
    (!trimmedContact.includes('@') &&
      !trimmedContact.startsWith('@') &&
      !/\d{5,}/.test(trimmedContact))
  ) {
    errors.contact = errCopy.contact;
  }

  if (trimmedMessage.length < 10) {
    errors.message = errCopy.message;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
