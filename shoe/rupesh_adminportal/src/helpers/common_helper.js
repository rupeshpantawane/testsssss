import moment from 'moment';
export const dateFormat = (date) => {
    return moment(date).format("DD MMM YYYY");
  };

export const dateTimeFormat = (datetime) => {
  return moment(datetime).format("DD MMMM YYYY");
};

export const TimeFormat = (datetime) => {
  return moment(datetime, "hh:mm").format('LT'); //moment(datetime).format("h:mm A UTC");
};
