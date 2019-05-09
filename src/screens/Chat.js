import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import { GiftedChat, Message } from "react-native-gifted-chat";
import SendBird from "sendbird";

class Chat extends Component {

  state = {
    messages: [],
    show_load_earlier: false
  };


static navigationOptions = ({ navigation }) => {

  const { params } = navigation.state;
    return {
      headerTitle: params.room_name
    };
  };

  //

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.user_id = navigation.getParam("id");
    this.room_url = navigation.getParam("room_url");
  }


  componentWillUnmount() {
    const sb = SendBird.getInstance();
    sb.disconnect();
  }


  componentDidMount() {
    const sb = SendBird.getInstance();
    const channelHandler = new sb.ChannelHandler();

    channelHandler.onMessageReceived = (channel, message) => {
      if (channel.url === this.room_url) {
        this.addMessage(message);
      }
    }

    sb.addChannelHandler(this.room_url, channelHandler);
    sb.OpenChannel.getChannel(this.room_url, (channel, error) => {
      if (!error) {
        this.channel = channel;
        this.channel.enter((response, error) => {
          if (!error) {
            const messageListQuery = this.channel.createPreviousMessageListQuery();
            messageListQuery.limit = 10;
            messageListQuery.load((messageList, error) => {
              if (!error) {
                if (messageList.length >= 10) {
                  this.setState({
                    show_load_earlier: true
                  });
                }

                messageList.forEach((message_data) => {
                  this.addMessage(message_data);
                });
              }
            });
          }
        });
      }
    });
  }


  getMessage = (data) => {
    if (!data.sender) {
      data.sender = {
        userId: '123',
        nickname: 'YOUR NICKNAME',
        profileUrl: 'https://dxstmhyqfqr1o.cloudfront.net/sample/cover/cover_06.jpg'
      }
    }

    const msg_data = {
      _id: data.messageId,
      text: data.message,
      timestamp: data.createdAt,
      createdAt: new Date(data.createdAt),
      user: {
        _id: data.sender.userId,
        name: data.sender.nickname,
        avatar: data.sender.profileUrl
      }
    };

    return msg_data;
  }


  addMessage = (data) => {
    const message = this.getMessage(data);
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, message)
    }));
  }


  render() {
    const { messages, show_load_earlier, is_loading } = this.state;
    return (
      <View style={{flex: 1}}>
        {
          is_loading &&
          <ActivityIndicator size="small" color="#0000ff" />
        }
        <GiftedChat
          messages={messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.user_id
          }}
          loadEarlier={show_load_earlier}
          onLoadEarlier={this.loadEarlierMessages}
        />
      </View>
    );
  }
  //

  loadEarlierMessages = () => {
    this.setState({
      is_loading: true
    });

    const earliest_message_timestamp = Math.min(
      ...this.state.messages.map(m => parseInt(m.timestamp))
    );

    this.channel.getPreviousMessagesByTimestamp(earliest_message_timestamp, false, 10, true, 0, '', (messages, error) => {
      if (!error) {
        this.setState({
          is_loading: false
        });

        if (messages.length) {
          let earlier_messages = [];
          messages.forEach((message_data) => {
            const message = this.getMessage(message_data);
            earlier_messages.push(message);
          });

          this.setState(previousState => ({
            messages: previousState.messages.concat(earlier_messages)
          }));
        } else {
          this.setState({
            show_load_earlier: false
          });
        }
      }
    });

  }

  //

  onSend = ([message]) => {
    this.channel.sendUserMessage(message.text, (message, error) => {
      if (!error) {
        this.addMessage(message);
      }
    });
  }

}

export default Chat;