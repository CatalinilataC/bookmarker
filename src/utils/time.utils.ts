export const DAY_IN_MS = 24 * 60 * 60 * 1000;
// working with time can be complicated (timezones, daylight savings etc), hence making the followin simplifications
// anytime during last 24h means "today"
// anytime during last 48h which is not "today" means "yesterday"

export const isToday = (currentMoment: number, timestamp: number) =>
  currentMoment - timestamp < DAY_IN_MS; // should check if it's from future

export const isYesterday = (currentMoment: number, timestamp: number) =>
  !isToday(currentMoment, timestamp) &&
  currentMoment - timestamp < 2 * DAY_IN_MS;

export const isOlderThanYesterday = (
  currentMoment: number,
  timestamp: number
) => currentMoment - timestamp > 2 * DAY_IN_MS;
