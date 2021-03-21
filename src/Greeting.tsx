export const greeting = () => {
  const now = new Date();
  const currentHour: number = now.getHours();
  const term: string =
    currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening';
  return `Good ${term}`;
};
