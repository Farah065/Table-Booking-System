const availableTimesByDay = {
  'Sunday': ["19:00", "20:00", "21:00"],
  'Monday': ["18:00", "19:00", "20:00", "21:00", "22:00"],
  'Tuesday': ["18:00", "19:00", "20:00", "21:00", "22:00"],
  'Wednesday': ["18:00", "19:00", "20:00", "21:00", "22:00"],
  'Thursday': ["18:00", "19:00", "20:00", "21:00", "22:00"],
  'Friday': ["18:00", "19:00", "20:00", "21:00", "22:00"],
  'Saturday': ["19:00", "20:00", "21:00"]
};

const getDayOfWeek = (date) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIndex = new Date(date).getDay();
  return daysOfWeek[dayIndex];
};

const fetchAPI = (date) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dayOfWeek = getDayOfWeek(date);
      if (availableTimesByDay[dayOfWeek]) {
        resolve(availableTimesByDay[dayOfWeek]);
      } else {
        reject(new Error('No available times for the selected day.'));
      }
    }, 1000);
  });
};

const submitAPI = (formData) => {
  const dayOfWeek = getDayOfWeek(formData.date);

  availableTimesByDay[dayOfWeek] = availableTimesByDay[dayOfWeek].filter(time => time !== formData.time);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData) {
        resolve(true);
      } else {
        reject(new Error('Form submission failed.'));
      }
    }, 1000);
  });
};

export { fetchAPI, submitAPI };
