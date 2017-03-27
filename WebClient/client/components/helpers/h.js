let h = {
    createRandomId: () => {
        var messageId = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 22; i++)
            messageId += possible.charAt(Math.floor(Math.random() * possible.length));
        return messageId;
    },
    getReceiver: (conversationId, sender, participants) => {
        var receiver = '';
        for (var x in participants[conversationId])
            if (x !== sender)
                receiver = x;
        return receiver;
    },
    formatTime: (time) => {
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

export default h;