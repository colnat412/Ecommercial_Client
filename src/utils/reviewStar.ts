// caculator star => number of star
// input array of account feedback star 1-5
// output number

export const reviewStar = (star: number[]) => {
  let sum = 0;
  for (let i = 0; i < star.length; i++) {
    sum += star[i];
  }
  return sum / star.length;
};
