const moment = require("moment");

function dateToString(date, format = "DD/MM/YYYY") {
    return moment(date).format(format);
}

module.exports = {
    dateToString
};