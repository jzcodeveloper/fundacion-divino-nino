const mergeActivities = (currentActivity) => {
  const nextActivity = createActivity(currentActivity.length);

  for (let i = 0; i < nextActivity.length; i++) {
    for (let j = 0; j < currentActivity.length; j++) {
      if (sameDay(nextActivity[i].date, currentActivity[j].date)) {
        nextActivity[i] = { ...currentActivity[j] };
      }
    }
  }

  return nextActivity;
};

const createActivity = (difference) => {
  const today = new Date().getTime();
  const endDate = new Date(today + 1 * 24 * 60 * 60 * 1000);
  const startDate = new Date(endDate - difference * 24 * 60 * 60 * 1000);

  const dates = new Array();
  const date = new Date(startDate);

  while (date < endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates.map((date) => ({ date, total: 0 }));
};

const sameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

module.exports = { mergeActivities, createActivity, sameDay };
