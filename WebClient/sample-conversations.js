// Initial Conversaton Data to Test Whisper Database Structure
module.exports = {
    // Conversations. Still not sure if we need to add something else.
    conversations: {
        conversation0001: {
            'test':'test working'
        },
        conversation0002: {
            'test':'test working'
        },
        conversation0003: {
            'test':'test working'
        },
    },
    // Participants, to keep a record of the participants of each chat.
    participants: {
        conversation0001: {
            ramiri01: true,
            jurdin01: true
        },
        conversation0002: {
            lucas02: true,
            jurdini01: true
        },
    },
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
    },

    // Users available on our system.
    users: {
        ramiri01: {
            name: "Ramiri Wohasah",
            email: "ramiri@gmail.com",
            profile_pic: "ramiri_img.jpg"
        },
        jurdini01: {
            name: "Jurdi Nisa",
            email: "jurdini@gmail.com",
            profile_pic: "jurdini_pics.jpg"
        },
        lucas02: {
            name: "Lucas Goodwill",
            email: "lucasg@gmail.com",
            profile_pic: "lucas-mugshot.jpg"
        }
    }
};