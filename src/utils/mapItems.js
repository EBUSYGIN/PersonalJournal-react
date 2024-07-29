export function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((element) => ({
    ...element,
    date: new Date(element.date)
  }));
}
