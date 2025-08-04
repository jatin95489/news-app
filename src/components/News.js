import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }
  articles = [
      {
        "source": {
          "id": "axios",
          "name": "Axios"
        },
        "author": "Rebecca Falconer, Andrew Freedman",
        "title": "Cyclone Alfred leaves thousands in eastern Australia without power ahead of rare landfall - Axios",
        "description": "Thousands of residents have been ordered to evacuate ahead of the storm's expected hit near Brisbane, Australia's 3rd-largest city.",
        "url": "https://www.axios.com/2025/03/07/cyclone-alfred-australia-brisbane-queensland-nsw",
        "urlToImage": "https://images.axios.com/hr773Y6eCvL1Ep7qB3eIfPCnWKw=/0x0:8004x4502/1366x768/2025/03/07/1741329952059.jpg",
        "publishedAt": "2025-03-07T12:45:00Z",
        "content": "Thousands of residents in eastern Australia were ordered to evacuate, as Tropical Cyclone Alfred's heavy rains and powerful winds blast ... [+3637 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "TechSpot"
        },
        "author": "Steven Walton",
        "title": "AMD Radeon RX 9070 Review - TechSpot",
        "description": "AMD impressed us with the Radeon 9070 XT, but now we turn to its cheaper sibling, the RX 9070. Priced at $550, it competes with Nvidia's RTX...",
        "url": "https://www.techspot.com/review/2962-amd-radeon-9070/",
        "urlToImage": "https://www.techspot.com/articles-info/2962/images/2025-03-06-image-10.jpg",
        "publishedAt": "2025-03-07T10:18:00Z",
        "content": "AMD looks to have hit it out of the park with the Radeon 9070 XT. Reviews have been universally positive, and reception from gamers has been even better. Now, AMD just needs to follow through with th… [+15756 chars]"
      },
      {
        "source": {
          "id": "axios",
          "name": "Axios"
        },
        "author": "Sareen Habeshian",
        "title": "SpaceX Starship rocket explodes after launch for second time this year - Axios",
        "description": "Debris from the rocket caused flight delays in cities across the U.S., including Miami and Philadelphia, FAA data show.",
        "url": "https://www.axios.com/2025/03/07/spacex-explosion-today-starship-rocket",
        "urlToImage": "https://images.axios.com/koVj4GrDnQnSO2X_Mf1hACRmHkY=/0x0:8256x4644/1366x768/2025/03/07/1741308191824.jpg",
        "publishedAt": "2025-03-07T19:50:04Z",
        "content": "SpaceX's Starship rocket exploded minutes after it launched from Texas Thursday. \r\nThe big picture: Debris from the rocket caused flight delays in cities across the U.S., including Miami and Philadel… [+1411 chars]"
      },
      {
        "source": {
          "id": null,
          "name": "TVLine"
        },
        "author": "Vlada Gelman",
        "title": "Ghosts Adds a (Familiar) New Spirit — and Sets the Stage for a Helluva Deal? - TVLine",
        "description": "'Ghosts' adds a (familiar) new spirit in this week's episode — and sets the stage for a helluva deal that could mean big trouble for [spoiler]?",
        "url": "https://tvline.com/recaps/ghosts-recap-season-4-episode-15-chris-stripper-dies-1235416748/",
        "urlToImage": "https://tvline.com/wp-content/uploads/2025/03/ghosts-recap.jpg?w=650",
        "publishedAt": "2025-03-07T18:18:39Z",
        "content": "Warning: The following contains spoilers for Thursday’sGhosts. Proceed at your own risk!\r\nSam and Jay may want to hire a publicist — just don’t let it be Elias Woodstone! — because Ghosts’ B&amp;B is… [+1782 chars]"
      },
    ]

  // Function to fetch news articles
  async updateNews() {
    
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9da8df716125459baf97bd2037802fdc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      const data = await fetch(url);
      const parsedData = await data.json();

      // Ensure parsedData.articles is valid
     
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false,
        });
      
      this.props.setProgress(100);
    }
  
  // Fetch more data for infinite scrolling
  fetchMoreData = async () => {
    
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9da8df716125459baf97bd2037802fdc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ page: this.state.page + 1 });
      const data = await fetch(url);
      const parsedData = await data.json();

      // Ensure parsedData.articles is valid
      
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
        });
    
    
  };

  // Lifecycle method to fetch news on component mount
  componentDidMount() {
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-8">
        <h1 className="text-center">Top Headlines</h1>
        {this.state.loading && <Loading />}
        <InfiniteScroll
          dataLength={this.state.articles ? this.state.articles.length : 0} // Ensure articles is not undefined
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading />}
        >
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-4 my-1" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;