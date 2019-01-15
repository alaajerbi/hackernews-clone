import React, { Component } from 'react';


export default class Navbar extends Component {
  WAIT_INTERVAL = 1000;
  ENTER_KEY = 13;

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.triggerChange = this.triggerChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

  }

    componentWillMount() {
      this.timer = null;
    }

  handleChange(event) {
    let value = event.target.value;
    clearTimeout(this.timer);
    this.setState({ value: value });
    this.timer = setTimeout(this.triggerChange, this.WAIT_INTERVAL);
  }

   handleKeyDown(e) {
        if (e.keyCode === this.ENTER_KEY) {
            this.triggerChange();
        }
    }

    triggerChange() {
        let keyword = this.state.value;

        this.props.onChange(keyword);
    }

  render() {
    return (
      <nav className="navbar">
        <span className="navbar-brand mb-0">HN Clone</span>
        <div className="form-inline search-bar-container">
          <input className="form-control mr-sm-2 search-bar" type="search" placeholder="Search" aria-label="Search"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}/>
        </div>
        <span className="navbar-text">
          Made with love by <a href="https://github.com/alaajerbi">Alaa Jerbi</a>
        </span>
      </nav>
    );
  }
}
