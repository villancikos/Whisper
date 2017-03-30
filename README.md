# Whisper 

![Whisper App Logo](http://i.imgur.com/Z9ifBdN.jpg)

This is a King's College of London project for the Group Project Class.
Our team is conformed of people of three continents with different native languages.

Our background differs ranging from Statistics and Civil Engineering to Information Technologies, as such, this is the firs time we create a Software Development project from scratch.

The app is intended to be a Messaging Application just like others in the market (Whatsapp, Viber, Telegram, etc).
Our focus is more oriented towards speed and realtime updates. Most of today's apps already focus on this, but it is the first time we are creating such an ambitious application.

# Back-End
We decided to go with Firebase as our back-end. Firebase is widely used in the industry. Companies like Shazam, Viber, Skyscanner, etc, use different parts of it.
Firebase uses a NoSQL database, the benefit of this is the speed. The only tradeoff is more writes on the client because the strucutre is flatter.


# Clients
We did three clients for our chat application. iOS, Android and Web. 

## iOS
The iOS client is created using macOS and Xcode. 
CocoaPods and UI KIT. In order to start the project you need to have latest Xcode installed and run it.

## Android
The Android Client is created using Android Studio with Java as the main programming Language

## Web Client

### Node JS and React
Our web client runs using some of the most popular technologies in the Front-End Development domain. 
Node JS basically is a JavaScript runtine built that uses Google Chrome V8 JavaScript Engine. Is very fast and lightweight, plus it contains a really good package manager called Node Package Manager to let you install all the tools needed.

In order to run the application and pretending that you are in a Unix System.
1. Install NodeJs and/or npm.
2. Clone this repository (use `git clone` inside the Terminal).
3. Go to the folder where you cloned this repository using Terminal with `cd` to change directories until you are there (quick tip, use "~/" to reference your user's folder).
4. When in the folder, type `npm install` (this will take a while as we use different packages for the Whisper Web Client).
5. When done, run `npm start` and pay attention to the messages inside the terminal.
6. This will start a lightweight server in your machine accessible (by default) through the address:
```sh
127.0.0.1:7770
```

When running, it will use our Firebase config settings for the database. So please register using 

```sh
127.0.0.1:7770/
```
And when logged in if you are not redictioned, go to 
```sh
127.0.0.1:7770/web
```

### Technologies used

#### HTML, CSS and JavaScript
As all the web apps out there, our Web Client uses the main web technologies to render the messages, conversations and authentication settings. However, we also use powerful frameworks and addons such as:

#### Facebook's React
Facebook created [React] as way to accelerate their development cycles inside the company. They push so many features so fast that they needed a way to agilize that. Plus, learning React opens a lot of doors in the future thanks to other projects like [React Native] and the promising [React VR] that powers Oculus Rift Development Team.

#### React Router
[React-Router] is the defacto component for React and React Native applications for users who want to control the routes inside their app. We use it because is faster than manually creating the routes.

#### React Redux
[Redux] is basically 

Thanks for reading.
--Triple A Team.

[React]: <https://facebook.github.io/react>
[React-Router]: <https://reacttraining.com/react-router/>
[React Native]: <https://facebook.github.io/react-native/>
[React VR]: <https://developer.oculus.com/blog/introducing-the-react-vr-pre-release/>
[Redux]: <https://github.com/reactjs/react-redux>
