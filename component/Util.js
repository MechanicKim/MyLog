export function timeID() {
  const now = new Date();
  const h = now.getHours();
  const min = now.getMinutes();

  return {
    id: now.getTime(),
    time: `${h}시 ${min}분`,
  };
}
