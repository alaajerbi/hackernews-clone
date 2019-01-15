import React, { Component } from 'react';
import Navbar from './Navbar.js';
import TagNav from './TagNav.js';
import Stories from './Stories.js';
import * as api from '../utils/api.js';

class App extends Component {

  state = {
    stories: null,
    loading: true,
    keyword: '',
    tag: 'front_page',
    page: 0,
    nbPages: null
  }

  constructor(props) {
    super(props);

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }

  componentDidMount() {
    const tag = this.state.tag;
    const page = this.state.page;

    //get the front page stories upon mounting
    api.fetchStoriesByTag(tag, page)
    .then(data => {
      this.setState({
        stories: data.hits,
        loading: false,
        nbPages: data.nbPages
      });
    });
  }

  handleNextClick() {
    let page = this.state.page;
    const tag = this.state.tag;
    const keyword = this.state.keyword;

    this.setState({
      page: page + 1,
      loading: true,
    }, () => {
      if (keyword === "") {
        api.fetchStoriesByTag(tag, this.state.page)
        .then(data => {
          this.setState({
            stories: data.hits,
            loading: false,
            nbPages: data.nbPages,
          })
        });
      }
      else {
        api.fetchStoriesByKeyword(keyword, this.state.page)
        .then(data => {
          this.setState({
            stories: data.hits,
            loading: false,
            keyword: keyword,
            nbPages: data.nbPages
          });
        });
      }
      
    });
  }

  handlePreviousClick() {
    const page = this.state.page;
    const tag = this.state.tag;
    const keyword = this.state.keyword;
    
    this.setState({
      page: page - 1,
      loading: true,
    }, () => {
      if (keyword === "") {
        api.fetchStoriesByTag(tag, this.state.page)
        .then(data => {
          this.setState({
            stories: data.hits,
            loading: false,
            nbPages: data.nbPages,
          })
        });
      }
      else {
        api.fetchStoriesByKeyword(keyword, this.state.page)
        .then(data => {
          this.setState({
            stories: data.hits,
            loading: false,
            keyword: keyword,
            nbPages: data.nbPages
          });
        });
      }
    });

    
  }

  handleSearchChange(keyword) {
     //set the stories to null and loading to true before we do any fetching
     this.setState({
        stories: null,
        loading: true,
      });

    if( keyword === "") {
      //save the tag query to restore the previous stories in case the keyword is empty
      const tag = this.state.tag;
      const page = this.state.page;
      //restore results of the last tag query
      api.fetchStoriesByTag(tag)
      .then(data => {
        this.setState({
          stories: data.hits,
          loading: false,
          keyword: '',
          page: page,
          nbPages: data.nbPages
        })
      });
    }
    else {
        api.fetchStoriesByKeyword(keyword)
        .then(data => {
        this.setState({
          stories: data.hits,
          loading: false,
          keyword: keyword,
          page: 0,
          nbPages: data.nbPages
        });
      })
    }
  }

  handleTagChange(tag) {
    this.setState({
        stories: null,
        loading: true,
        keyword: '',
        tag: tag,
        page: 0
        });

    api.fetchStoriesByTag(tag)
    .then(data => {
      this.setState({
        stories: data.hits,
        loading: false,
        nbPages: data.nbPages,
      })
    });
  }



  render() {
    let stories = this.state.stories;
    let loading = this.state.loading;
    let keyword = this.state.keyword;
    return (
      <div className="container">
        <Navbar onChange={this.handleSearchChange}/>
        <TagNav selectedTag={ this.state.tag }
        onChange={ this.handleTagChange }/>
        <Stories loading={ loading }
        stories={ stories }
        keyword={ keyword }
        page={this.state.page}
        nbPages={ this.state.nbPages }
        onNextClick= { this.handleNextClick }
        onPreviousClick= { this.handlePreviousClick }/>
      </div>
      
    );
  }
}

export default App;
