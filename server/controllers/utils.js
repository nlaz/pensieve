import { REVIEW_TYPE } from '../../client/app/review/ReviewContainer';

//=0.75*EXP(0.8*I2) - 0.75
export function getNextReviewDate(counter) {
  const currentTime = new Date();
  const interval = 0.75 * Math.exp(0.8 * counter) - 0.75;
  // TODO: update next date by interval. Not rounded integer.
  currentTime.setDate(currentTime.getDate() + Math.ceil(interval));
  return currentTime;
}

export function getEF(EF, grade) {
  return Math.max(EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)), 1.3);
}

export function getNewCounter(value, prevCount) {
  switch (value) {
    case REVIEW_TYPE.EASY:
      return prevCount + 1;
    case REVIEW_TYPE.GOOD:
      return prevCount;
    case REVIEW_TYPE.HARD:
      return 0;
  }
  return prevCount;
}

export function getGrade(value) {
  switch (value) {
    case REVIEW_TYPE.EASY:
      return 5;
    case REVIEW_TYPE.GOOD:
      return 3;
    case REVIEW_TYPE.HARD:
      return 0;
  }
  return 3;
}

export function getNextInterval(item, grade) {
  if (grade < 3) {
    return 0;
  }
  if (item.repetitions === 0) {
    return 1;
  } else if (item.repetitions === 1) {
    return 6;
  } else {
    return (item.interval - 1) * item.EF;
  }
}
