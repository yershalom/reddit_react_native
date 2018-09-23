import { Navigation } from 'react-native-navigation';
import TopicList from "./TopicList";
import PostList from "./PostList";

export function registerScreens() {
  Navigation.registerComponent('reddit.TopicList', () => TopicList);
  Navigation.registerComponent('reddit.PostList', () => PostList);
}
