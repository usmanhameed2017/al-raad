import moment from "moment";
export const getTime = (time) => {
    return moment.utc(time).add(5, 'hours').format("DD-MMMM-YYYY, hh:mm:ss a");
};