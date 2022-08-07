export default class TimeHelper {
    static getTwoDigit = (text) => {
        return ("0" + text).slice(-2);
    }
    static getFormattedDateFromDB = (dateAsString) => {
        var date = new Date(dateAsString),
            now_utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()),
            utc = new Date(now_utc);
        return utc.getFullYear() + "-" + TimeHelper.getTwoDigit(utc.getMonth() + 1) + "-" + TimeHelper.getTwoDigit(utc.getDate()) + "T" + TimeHelper.getTwoDigit(utc.getHours()) + ":" + TimeHelper.getTwoDigit(utc.getMinutes()) + ":" + TimeHelper.getTwoDigit(utc.getSeconds());
    }
}