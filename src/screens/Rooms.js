import React, { Component } from "react";
import { View, Text, FlatList, Button } from "react-native";
import SendBird from "sendbird";
import stringHash from "string-hash";

class Rooms extends Component {
  static navigationOptions = {
    title: "Rooms"
  };


  state = {
    rooms: []
  };


  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.user_id = navigation.getParam("id");
  }


  async componentDidMount() {
    const sb = SendBird.getInstance();
    const channelListQuery = sb.OpenChannel.createOpenChannelListQuery();

    if (channelListQuery.hasNext) {
      channelListQuery.next((channelList, error) => {
        if (!error) {
          const rooms = channelList.map((item) => {
            return {
              id: stringHash(item.url),
              name: item.name,
              url: item.url
            }
          });

          this.setState({
            rooms
          });
        }
      });
    }
  }


  render() {
    const { rooms } = this.state;
    return (
      <View style={styles.container}>
        {
          rooms &&
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={rooms}
            renderItem={this.renderRoom}
          />
        }
      </View>
    );
  }


  renderRoom = ({ item }) => {
    return (
      <View style={styles.list_item}>
        <Text style={styles.list_item_text}>{item.name}</Text>

        <Button title="Enter" color="#0064e1" onPress={() => {
          this.enterChat(item);
        }} />

      </View>
    );
  }
  //


  goToChatScreen = (room) => {
    this.props.navigation.navigate("Chat", {
      id: this.user_id,
      room_url: room.url,
      room_name: room.name
    });
  }

  //

  enterChat = async (room) => {
    this.goToChatScreen(room);
  }

}

export default Rooms;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  list_item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  list_item_text: {
    marginLeft: 10,
    fontSize: 20,
  }
};