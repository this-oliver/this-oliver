export function useTime() {
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toDateString();
  }

  return { formatDate };
}
