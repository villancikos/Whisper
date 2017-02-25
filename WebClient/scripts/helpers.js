let helpers = {
    formatTime: function (time) {
        var dateObj = new Date(time);
        var now = Date.now();
        var elapsed = now - time;
        var filter = 60 * 60 * 24 * 1000; // one day
        if (elapsed >= filter) {
            return dateObj.getDate() + "/" + dateObj.getMonth() + "/" + dateObj.getFullYear();
        }
        return dateObj.getHours() + ":" + dateObj.getMinutes();
    },

}

export default helpers;
