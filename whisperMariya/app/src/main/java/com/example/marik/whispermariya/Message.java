package com.example.marik.whispermariya;

import java.util.Date;

/**
 * Created by marik on 03/03/2017.
 */

public class Message {
    private String tMessage;
    private String user;
    private long timeStamp;

    public Message(String textMessage, String author) {
        this.tMessage = textMessage;
        this.user = author;

        timeStamp = new Date().getTime();

    }

    public Message() {
    }

    public String getTMessage() {
        return tMessage;
    }

    public String getUser() {
        return user;
    }

    public long getTimeStamp() {
        return timeStamp;
    }

    public void setTMessage(String tMessage) {
        this.tMessage = tMessage;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setTimeStamp(long timeStamp) {
        this.timeStamp = timeStamp;
    }
}