import React, { Component } from 'react';
import axios from 'axios';

class CreatGif extends Component {
  apiUrl =
    'https://wt-fbf1133d4c0420e5070f01e86112d679-0.sandbox.auth0-extend.com/react-gif';
  state = {
    gif: null,
    caption: ''
  };

  componentDidMount() {
    this.getGif();
  }

  handleChange = e => this.setState({ caption: e.target.value });

  getGif = async () => {
    const { data } = await axios.get(`${this.apiUrl}/random`);
    this.setState({ gif: data });
  };

  createGif = async e => {
    e.preventDefault();

    await axios.post(
      this.apiUrl,
      {
        ...this.state.gif,
        caption: this.state.caption
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
      }
    );

    this.setState({ caption: '' });
    this.getGif();
  };

  render() {
    const { gif, caption } = this.state;

    return (
      <div className="hero is-medium is-info">
        <div className="hero-body">
          <div className="container">
            <h2 className="title is-3 has-text-centered">Create a Gif</h2>

            {gif && (
              <form
                className="box"
                onSubmit={this.createGif}
                style={{ maxWidth: '400px', margin: '0 auto' }}
              >
                {/* show the gif */}
                <div className="gif-container">
                  <img src={gif.url} />
                  <div className="caption">{caption}</div>
                </div>

                {/* input box */}
                <input
                  type="text"
                  className="input"
                  value={caption}
                  onChange={this.handleChange}
                />

                {/* submit button */}
                <button type="submit" className="button is-danger is-fullwidth">
                  Create the Gif
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CreatGif;
