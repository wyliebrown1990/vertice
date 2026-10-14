/**
 * Illustrative benchmark cohort for the S1 Salesforce renewal.
 * Synthetic points that show how evidence supports a decision. Not actual
 * Salesforce quotes, not proprietary Vertice data, and not a statistical sample.
 */
export const BENCHMARK_COHORT = {
  label: 'Illustrative benchmark',
  description: 'Synthetic same-product cohort: Sales Cloud + Einstein, Unlimited tier, 12-month term, 250–900 seats, annual per-seat price.',
}

/** [seats, price per seat per year] */
export const benchmarkPoints: [number, number][] = [
  [260, 1_880], [290, 1_845], [310, 1_905], [340, 1_820], [360, 1_790], [380, 1_860],
  [410, 1_770], [430, 1_735], [450, 1_812], [470, 1_760], [520, 1_745], [540, 1_700],
  [560, 1_782], [600, 1_720], [640, 1_690], [680, 1_742], [720, 1_705], [760, 1_668],
  [800, 1_715], [860, 1_655],
]
