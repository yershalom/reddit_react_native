import * as _ from 'lodash';

export async function getTopics() {
    const url = "https://www.reddit.com/subreddits/default.json";
    const subredditsRes = await fetch(url);
    const subredditsData = await subredditsRes.json();
    const subreddits = subredditsData.data.children;
    return _parseTopics(subreddits)
}

function _parseTopics(subreddits) {
    return subreddits.map((subreddit) => {
        return {
            url: subreddit.data.url,
            title: subreddit.data.display_name,
            description: subreddit.data.public_description,
            icon_img: (subreddit.data.icon_img)? subreddit.data.icon_img : "https://b.thumbs.redditmedia.com/S6FTc5IJqEbgR3rTXD5boslU49bEYpLWOlh8-CMyjTY.png"
        }
    });
}

export async function getPosts(url) {
    const topicUrl = `https://www.reddit.com${url}hot.json`;
    const postsRes = await fetch(topicUrl);
    const postsData = await postsRes.json();
    const postsAllData = _.get(postsData,'data.children');
    return _parsePosts(postsAllData);
}

function _parsePosts(postsAllData){
    return postsAllData.map(({data}) => {
        return {
            url: data.permalink,
            title: data.title,
            score: data.score
        }
    })
}
