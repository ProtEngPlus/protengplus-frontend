export const HISTOGRAM_BIN_COUNT = 40;
export const DEFAULT_SCORE_RANGE: [number, number] = [-2, 2];
const FIXED_DECIMALS = 8;

export const buildChartLabels = (
  min: number,
  max: number,
  bins: number = HISTOGRAM_BIN_COUNT,
): string[] => {
  if (!isFinite(min) || !isFinite(max) || min >= max) {
    [min, max] = DEFAULT_SCORE_RANGE;
  }
  const width = (max - min) / bins;
  const decimals = width >= 1 ? 0 : width >= 0.1 ? 1 : FIXED_DECIMALS;
  return Array.from({ length: bins }, (_, i) =>
    (min + i * width).toFixed(decimals),
  );
};
