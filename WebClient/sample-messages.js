// Initial Conversaton Data to Test Whisper Database Structure
module.exports = {
    // messages shared inside each conversation
    messages: {
        conversation0001: {
            message000001: {
                sender: 'ramiri01',
                content: "Hey pal, hope you are doing great!",
                typeOfContent: "text",
                timestamp: 1487855066
            },
            message000002: {
                sender: 'jurdini01',
                content: "Hey Ramiri, long time no see. I'm great!",
                typeOfContent: "text",
                timestamp: 1487855080
            },
        },
        conversation0002: {
            message000001: {
                sender: 'lucas02',
                content: "Hey Jurdini. I'm Lucas, do you remember me?",
                typeOfContent: "text",
                timestamp: 1487855001
            },
            message000002: {
                sender: 'jurdini01',
                content: "Lucas! Of course, how you've been mate?",
                typeOfContent: "text",
                timestamp: 1487855120
            },
        }
    }
}