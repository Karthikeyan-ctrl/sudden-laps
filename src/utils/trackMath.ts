export interface Point3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Generates closed 3D points for an aerodynamic "Lap" loop.
 * Features a stadium oval with gentle 3D vertical undulation so it has true spatial depth.
 */
export function generateLapCurvePoints(
  pointCount: number = 80,
  radius: number = 2.4,
  straightLength: number = 2.0,
  elevationAmplitude: number = 0.55
): Point3D[] {
  const points: Point3D[] = [];
  const totalPoints = Math.max(12, pointCount);

  for (let i = 0; i < totalPoints; i++) {
    const t = (i / totalPoints) * Math.PI * 2;

    // Oval base with continuous curvature
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);

    // Asymmetric stadium track with smooth 3D rollercoaster elevation
    const x = (straightLength / 2) * Math.sign(cosT) * Math.pow(Math.abs(cosT), 0.8) + radius * cosT;
    const y = radius * 0.75 * sinT;
    // 3D elevation undulation that loops seamlessly (harmonic frequency 2 so t=0 and t=2pi match)
    const z = Math.sin(t * 2) * elevationAmplitude;

    points.push({ x, y, z });
  }

  return points;
}

/**
 * Calculates position along the lap curve at progress normalized 0..1.
 */
export function getLapPositionAtProgress(
  progress: number,
  points: Point3D[]
): Point3D {
  if (points.length === 0) return { x: 0, y: 0, z: 0 };
  const normalized = ((progress % 1) + 1) % 1;
  const exactIndex = normalized * points.length;
  const indexA = Math.floor(exactIndex) % points.length;
  const indexB = (indexA + 1) % points.length;
  const fraction = exactIndex - Math.floor(exactIndex);

  const pA = points[indexA];
  const pB = points[indexB];

  return {
    x: pA.x + (pB.x - pA.x) * fraction,
    y: pA.y + (pB.y - pA.y) * fraction,
    z: pA.z + (pB.z - pA.z) * fraction,
  };
}

/**
 * Checks if the curve is a closed continuous loop.
 */
export function isCurveContinuous(points: Point3D[], tolerance: number = 0.35): boolean {
  if (points.length < 3) return false;
  const first = points[0];
  const last = points[points.length - 1];

  const dx = first.x - last.x;
  const dy = first.y - last.y;
  const dz = first.z - last.z;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

  // The step from last point to first should be comparable to average step size
  return distance <= tolerance;
}
