export function capitalizeAndSlice(word: string, sliceAt: number) {
  if (!word) return "";
  return (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).slice(
    0,
    sliceAt,
  );
}
