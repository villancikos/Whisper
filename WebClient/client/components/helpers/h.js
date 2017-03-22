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
    }
}

export default h;