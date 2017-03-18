let h = {
    createRandomId: () => {
        var messageId = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 22; i++)
            messageId += possible.charAt(Math.floor(Math.random() * possible.length));
        return messageId;
    }
}

export default h;