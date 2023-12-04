export function convertTimestampToDate(timestamp: number) {
  return new Date(timestamp).toISOString().split('T')[0];
}
