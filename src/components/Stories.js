import React, { Component } from 'react';
import moment from 'moment';

const StoryList = props => {
  return (
    <div>
      <Pagination
        nbPages={props.nbPages}
        page={props.page}
        onNextClick={props.onNextClick}
        onPreviousClick={props.onPreviousClick}
      />

      <div className="list-group stories">
        {props.stories
          .filter(story => {
            return story.url !== null;
          })
          .map((story, index) => {
            let dateFromNow = moment(story.created_at).fromNow();
            let title = story.title;
            let url = story.url;
            let keywordTitlePosition = title
              .toLowerCase()
              .search(props.keyword.toLowerCase());
            let keywordUrlPosition = url
              .toLowerCase()
              .search(props.keyword.toLowerCase());
            let newTitle =
              keywordTitlePosition !== -1 ? (
                <h5 className="mb-1">
                  {title.slice(0, keywordTitlePosition)}
                  <span className="highlighted">
                    {title.slice(
                      keywordTitlePosition,
                      keywordTitlePosition + props.keyword.length
                    )}
                  </span>
                  {title.slice(keywordTitlePosition + props.keyword.length)}
                </h5>
              ) : (
                <h5 className="mb-1">{title}</h5>
              );
            let newUrl =
              keywordUrlPosition !== -1 ? (
                <span>
                  {url.slice(0, keywordUrlPosition)}
                  <span className="highlighted">
                    {url.slice(
                      keywordUrlPosition,
                      keywordUrlPosition + props.keyword.length
                    )}
                  </span>
                  {url.slice(keywordUrlPosition + props.keyword.length)}
                </span>
              ) : (
                <span>{url}</span>
              );
            return (
              <a
                key={index}
                href={story.url}
                className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                  {newTitle}
                </div>
                <small>
                  Points: {story.points} | {story.author} | {dateFromNow} |{' '}
                  {story.num_comments} comments | ({newUrl})
                </small>
              </a>
            );
          })}
      </div>
    </div>
  );
};

const Pagination = props => {
  return (
    <div className="clearfix mb-1">
      {props.nbPages > 1 && props.page < props.nbPages && (
        <button className="btn float-right" onClick={props.onNextClick}>
          Next &raquo;{' '}
        </button>
      )}
      {props.page > 0 && (
        <button className="btn float-left" onClick={props.onPreviousClick}>
          &laquo; Previous
        </button>
      )}
    </div>
  );
};

export default class Stories extends Component {
  render() {
    return (
      <div>
        {(this.props.loading && <p>Loading...</p>) ||
          (this.props.stories.length === 0 && <p>No results</p>) ||
          (this.props.stories && (
            <StoryList
              stories={this.props.stories}
              keyword={this.props.keyword}
              page={this.props.page}
              nbPages={this.props.nbPages}
              onNextClick={this.props.onNextClick}
              onPreviousClick={this.props.onPreviousClick}
            />
          ))}
      </div>
    );
  }
}
