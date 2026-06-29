// Single source of truth for Ray's engineering tenure.
// Career start (first shipped production software): 2014.
// Used to compute "{years}+ yrs engineering" so the number stays correct
// automatically as time passes — no annual copy edits needed.
export const CAREER_START_YEAR = 2014;

/** Whole years of engineering experience as of now (floored). */
export function yearsEngineering(now: Date = new Date()): number {
  return now.getFullYear() - CAREER_START_YEAR;
}

/**
 * Replace the {years} token in any locale string with the live computed value.
 * Keeps the "+" suffix that already follows the token in the copy.
 */
export function fillYears(text: string, now?: Date): string {
  return text.replaceAll('{years}', String(yearsEngineering(now)));
}
