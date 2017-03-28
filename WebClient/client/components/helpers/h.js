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
    trunctateText: (text) =>{
        if (text.length > 30)
            return text.substring(0, 30)+"...";
        else
            return text;
    },
    getRandomProfilePic: () =>{
        let profile_pics = [
            'http://i.imgur.com/KH5Q9wG.png',
            'http://i.imgur.com/OqU1H7U.png',
            'http://i.imgur.com/s6z9dJq.png',
            'http://i.imgur.com/qBnSKMz.png',
            'http://i.imgur.com/Ydb83IP.png',
            'http://i.imgur.com/fUqFxe7.png',
            'http://i.imgur.com/8N4iQ85.png',
        ]
        return profile_pics[Math.floor((Math.random() * 7))];
    },
}

export default h;