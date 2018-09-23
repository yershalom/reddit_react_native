import React from 'react';
import * as services from '../services/reddit';
import {Colors, View, Text, Card, LoaderScreen} from 'react-native-ui-lib';
import {Navigation} from "react-native-navigation";
import {FlatList} from "react-native";

interface IState {
  topics: object[];
}

class TopicList extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = {
      topics: []
    };
    this.fetchTopics();
  }

  fetchTopics = async () => {
    const resp = await services.getTopics();
    this.setState({topics: resp});
  };

  renderLoader() {
    return <LoaderScreen
      loaderColor={Colors.blue30}
      message="Loading Topics"
    />
  }

  keyExtractor = (item) => item.url;

  renderItem = ({item}) => {
    return (
      <Card
        row
        containerStyle={{margin: 12}}
        onPress={() => this.showPostsScreen(item)}
      >
        <Card.Image
          imageSource={{uri: item.icon_img}}
          width={96}
        />
        <Card.Section body>
          <Card.Item>
            <Text text50 red10>{item.title}</Text>
          </Card.Item>
          <Card.Item>
            <Text text70>{this.trimText(item.description)}</Text>
          </Card.Item>
        </Card.Section>
      </Card>
    )
  };

  trimText = (text) => (text.length > 60)? text.substring(0, 60) + "..." : text

  showPostsScreen = (topic) => {
    const {title, url} = topic;
    Navigation.push(`Component2`, {
      component: {
        name: 'reddit.PostList',
        passProps: {
          url
        },
        options: {
          topBar: {
            title: {
              text: `Posts from ${title}`
            }
          }
        }
      },
    })
  };

  renderList = () => {
    return (
      <FlatList
        data={this.state.topics}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }

  render() {
    return (
      <View flex>
        {this.state.topics.length > 0 ? this.renderList() : this.renderLoader()}
      </View>
    )
  }
}

export default TopicList;
