![alt text](https://github.com/echurilov/current/blob/master/logo.png)
# Current
---

[Visit Current Now](https://whats-current.herokuapp.com)

Current is a trending content aggregator, where you can explore the top trending daily topics, and search any of your favorite topics to see trending news stories, youtube videos, imgur and tumblr posts, and even gifs about them.

___

## Technologies

This MERN project was built with Mongoose and MongoDB to store data, used Express for backend routing, and NodeJS server. React and Redux were used on the frontend to make it a single-page application with seamless navigation and dynamic updating.

Current was built using 6 different APIs:

* [GoogleTrendsAPI](https://www.npmjs.com/package/google-trends-api) - Used to fetch daily trends and related search terms
* [NewsAPI](https://newsapi.org/) - Used to fetch top news results from multiple sources
* [YoutubeDataAPI](https://developers.google.com/youtube/v3/) - Used to fetch popular youtube videos
* [imgurAPI](https://api.imgur.com/) - Used to fetch popular imgur image posts
* [giphyAPI](https://developers.giphy.com/) - Used to fetch popular gifs
* [tumblrAPI](https://www.tumblr.com/docs/en/api/v2) - Used to fetch popular tumblr posts

---

## Features

- Users can view the top 15 trending topics of the day, and click on them to see current information about them
- Users can search for any topic to see trending posts and images about it
- Users can create an account to bookmark their favorite topics, and search them quickly from their bookmarks tab
- Users can refine searches to only see results from specific sources

---

### Daily Trends

When a user first goes to the Current site, the top 15 daily trending topics are scrolling across the page. When the user searches a topic, the trending related topics scroll across the screen instead.

This feature used the Google Trends API to request the top daily trends, or would pass the same API a search term to find the related topics. These were stored in the redux state, so when a user searched for a term, the results and the related trends would be fetched. If there were related trends in the redux state, they would be displayed instead of the general trends.

![alt text](http://g.recordit.co/RRZDoAJCo3.gif)
![alt text](http://g.recordit.co/tv2Fo7R9SL.gif)

---

### Search 

The search functionality was achieved by creating one backend route that hit 5 different APIs, waited for a promise from all of them, and then sent back the information under the keys of 'news', 'imgur', etc, so they could be sent into different reducers on the frontend. 

``` javascript
  const youtubeCallback = () => {

    if (filters.youtube === 'true') {
      const options = {
        part: 'snippet, id',
        q: processedQuery,
        type: 'video',
        maxResults: 10,
        order: 'viewCount',
        publishedAfter: twoWeeksAgo + "T00:00:00Z",
        safeSearch: "strict",
        videoEmbeddable: "true",
        relevanceLanguage: "en"
      };

      return youtubeSearch(keys.youtubeId, options)
        .then(res => {
          return { data: res.items };
        })
        .catch(err => {
          return err;
        });
    } else {
      return Promise.resolve();
    }
    
  };
  // inserting information into key to be returned by axios promise
  let youtubeData = [];
  if (value[2]) {
    youtubeData = value[2].data;
  }
```

There are different slices of state for the responses from each API, which are mapped to in the Search Results component. In that component, each element in each slice of state is mapped to the corresponding index item:

``` javascript

// get information from state
const mapStateToProps = state => ({
  giphy: state.entities.giphy,
  news: state.entities.news,
  imgur: state.entities.imgur,
  youtube: state.entities.youtube
});

// map information to index item components
let youtubeItems;
if (youtube.length > 0) {
  youtubeItems = [];
  this.props.youtube.forEach(
    (video) => (youtubeItems.push((<YoutubeIndexItem key={video.id.videoId} video={video} />)))
  )
} else {
  youtubeItems = [];
};
    
// shuffle results to display them
const results = shuffle(giphyItems.concat(newsItems).concat(youtubeItems).concat(imgurItems));

```

![alt text](https://github.com/echurilov/current/blob/master/random-search-results.png)

--- 

### Bookmarks

Users can save search terms as bookmarks by clicking the plus sign when they search something they want to save, and these get persisted into the database saved under the current users id. By clicking on the bookmarks button, the user can see their saved bookmarks and by clicking on any of them, they can see the most recent posts/information about those topics again. 

![alt text](https://github.com/echurilov/current/blob/master/bookmarks.png)

### Filtering

Users can filter which sources they want to see information from by checking or unchecking them from the dropdown before making a search. 

![alt text](filter_dropdown.png)

This is accomplished by initially setting all boxes to true and triggering an event to change the value in the state whenever the box is checked.

```js
//setup appearance and set checked based on the state
<li className="dropdown-item">
  <label className="dropdown-item-label">
    giphy
    <input onChange={this.toggleFilter("giphy")} type="checkbox" value="giphy" checked={this.state.giphy ? true : ""} />
    <span className="checkmark" />
  </label>
</li>

//toggle the current value in state when clicked
toggleFilter(value){
      return () => {
          if (this.state[value]) {
              this.setState({ [value]: false })
          } else {
              this.setState({ [value]: true })
          }
      }   
  }
```

----

## Team 

  * Elena Churilov - [Github](https://github.com/echurilov) | [LinkedIn](https://www.linkedin.com/in/elenachurilov/) | [Portfolio](http://elena-churilov.com/)
  * Sam McClure - [Github](https://github.com/sam-mcclure) | [LinkedIn](https://www.linkedin.com/in/sam-mcclure-developer/) | [Portfolio](https://www.sam-mcclure.com/)
  * Riya Kulkarni - [Github](https://github.com/amanpriya-k) | [LinkedIn](https://www.linkedin.com/in/amanpriyakulkarni/) | [Portfolio](https://helloriya.com/)
  * Wade Coufal - [Github](https://github.com/wadecoufal) | [LinkedIn](https://www.linkedin.com/in/wade-coufal/) | [Portfolio](https://www.wadecoufal.com/)


