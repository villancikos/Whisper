package com.example.marik.whispermariya;

/**
 * Created by marik on 25/03/2017.
 */

public class User {
    public String name;
    public String userId;
    public String email;

    public User() {
    }

    public User(String name, String email, String userId) {
        this.name = name;
        this.userId = userId;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
