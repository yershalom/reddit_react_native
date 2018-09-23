import React from 'react';
import * as services from '../services/reddit';
import { FlatList, Linking } from 'react-native';
import {View, Card, Text, Colors, LoaderScreen} from 'react-native-ui-lib';

interface IState {
  posts: object[];
}

interface IProps {
  url: string;
}

class PostList extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };

    this.fetchPosts();
  }

  fetchPosts = async () => {
    const resp = await services.getPosts(this.props.url);
    this.setState({posts: resp});
  };

  keyExtractor = (item) => item.url;

  renderPostsList() {
    return (
      <FlatList
        data={this.state.posts}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }

  renderItem = ({item}) => {
    return (
      <Card
        containerStyle={{marginTop: 12}}
        onPress={() => Linking.openUrl(`https://reddit.com${item.url}`)}
      >
        <Card.Section body>
          <Card.Item>
            <Text text50>{item.title}</Text>
          </Card.Item>
        </Card.Section>
        <Card.Section body>
          <Card.Item>
            <Text text70>Score: {item.score}</Text>
          </Card.Item>
        </Card.Section>
      </Card>
    )
  }

  renderLoader() {
    return <LoaderScreen
      loaderColor={Colors.blue30}
      message="Loading Posts"
    />
  }

  render() {
    return (
      <View flex>
        {this.state.posts.length > 0 ? this.renderPostsList() : this.renderLoader()}
      </View>
    )
  }
}

export default PostList;
