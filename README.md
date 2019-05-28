# RNSendbirdToChatkit
A sample React Native chat app showing how to migrate from Sendbird to Chatkit.

The tutorial is available at: [https://pusher.com/tutorials/migrating-sendbird-chatkit](https://pusher.com/tutorials/migrating-sendbird-chatkit)

The app has the following features:

- Sending a message.
- Loading older messages.
- Joining public rooms.

This repo has the following branches

- `sendbird` - contains the Sendbird chat app.
- `chatkit` - contains the Chatkit version of the Sendbird chat app.
- `master` - latest code (after tutorial changes, if any).


### Prerequisites

-   React Native development environment
-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/en/)
-   [Chatkit app instance](https://pusher.com/chatkit)
-   [ngrok account](https://ngrok.com/)

## Getting Started

1.  Clone the repo:

```
git clone https://github.com/anchetaWern/RNSendbirdToChatkit.git
cd RNSendbirdToChatkit
```

2. Switch to either the `sendbird` or `chatkit` branch.

3.  Install the app dependencies:

```
yarn
```

4.  Eject the project (re-creates the `ios` and `android` folders):

```
react-native eject
```

5.  Link the packages:

```
react-native link react-native-gesture-handler
```

6. If you're on the `chatkit` branch, update the `server/index.js` with your Chatkit credentials. 

7. If you're on the `chatkit` branch, update the `src/screens/Chat.js` with your Chatkit credentials. 
8. If you're on the `sendbird` branch, update the `src/screens/Login.js` with your Sendbird app ID.

9. If you're on the `chatkit` branch, run the server and expose it to the internet using ngrok:

```
cd server
yarn start
./ngrok http 5000
```

10. If you're on the `chatkit` branch, update `src/screens/Rooms.js` with the ngrok HTTPS URL.

11. Run the app:

```
react-native run-android
react-native run-ios
```


## Built With

-   [React Native](http://facebook.github.io/react-native/)
-   [Chatkit](https://pusher.com/chatkit)

## Donation

If this project helped you reduce time to develop, please consider buying me a cup of coffee :)

<a href="https://www.buymeacoffee.com/wernancheta" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
