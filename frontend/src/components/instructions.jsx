import React from 'react';

class Instructions extends React.Component {

  render() {
    return (
      <div className="instructions">
        <p>
          welcome to Current! 
        </p>
        <p>
          we are a trending content aggregator. the words in the scrolling bar are today's
          trending topics - click on them to see more! you can search for just about anything in the search bar
          and see the latest content about it from multiple news sites, youtube, imgur, and even
          giphy. 
        </p>
        <p>
          if you search something you like, save it by clicking the + button, and search 
          it again easily from your bookmarks! and you can hit the home button to go back to 
          seeing today's main trends. thanks for visiting!
        </p>
      </div>
    )
  }

}

export default Instructions;