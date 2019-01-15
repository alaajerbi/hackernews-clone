import React from 'react';

export default function TagNav(props) {
    let tags = [
      {
        name: 'Front Page',
        query: 'front_page'
      },
      {
        name: 'Latest',
        query: 'story'
      },
      {
        name: 'Show',
        query: 'show_hn'
      }];
    return (
      <ul className="nav tag-nav">
        { tags.map((tag, index) => {
          return (
          <li key={index} className="nav-item">
            <p className={ props.selectedTag === tag.query ? 'nav-link active' : 'nav-link'}
            onClick={ () => { props.onChange(tag.query)} }>
              { tag.name }
            </p>
          </li>)
        })}
      </ul>
    );
  }