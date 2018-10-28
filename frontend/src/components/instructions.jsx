import React from 'react';

class Instructions extends React.Component {

  render() {
    return <div className="instructions">
        <p>Welcome to Current!</p>
        <br />
        <p>
          Current is a trending content aggregator. The words in the
          scrolling bar are today's trending topics - click on one to see
          the latest content about the topic from multiple news sites, Youtube, and
          Giphy! You can also search for a topic of your choice using the search
          bar.
        </p>
        <br />
        <p>
          If you find a search you like, save it by clicking the + button,
          and search it again easily from your bookmarks! You can hit the
          home button to go back to seeing today's main trends. Thanks for
          visiting! :)
        </p>
      </div>;
  }

}

export default Instructions;