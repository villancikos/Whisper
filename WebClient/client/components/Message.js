import React from 'react';
/*
    Message Component
    Renders all the messages from a conversation into the DOM
*/
export default class Message extends React.Component {
    componentDidMount() {
        // jQuery to auto scroll to top!!!
        $('#conversationPanel').scrollTop($('#conversationPanel')[0].scrollHeight);
    }
    render() {
        var message_data = this.props.message_data || {};
        if (message_data !== {}) {
        return (
                <div className="speech-whispper">
                    <div className="bubble">
                        <div className="bubble-txt">

                            <p className="bubble-message">{message_data.content}</p>
                            <span className="bubble-timestamp">
                            {message_data.timestamp !== '' 
                            ?
                            <i className="fa fa-clock-o mr-1"></i>
                            :'' }
                            {
                                message_data.timestamp}
                            </span>
                        </div>
                    
                    {this.props.loggedUser === message_data.sender
                    ?
                        <div className="bubble-arrow sender"></div>
                    :
                        <div className="bubble-arrow "></div>}
                </div>
                </div>
        )
    }
}

}


/* Coigo para que salga el nombre norrado

                           {this.props.loggedUser === message_data.sender ?
                            
                            <p className="bubble-name sender">{message_data.sender}</p>
                            :
                            <p className="bubble-name">{message_data.sender}</p>
                            }
*/
