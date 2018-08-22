import React, { Component } from 'react';
import axios from 'axios';

class BattleGifs extends Component {
  apiUrl =
    'https://wt-fbf1133d4c0420e5070f01e86112d679-0.sandbox.auth0-extend.com/react-gif';
  state = {
    gifs: null
  };

  componentDidMount() {
    this.getBattleGifs();
  }

  getBattleGifs = async () => {
    const { data } = await axios.get(`${this.apiUrl}/versus`);
    this.setState({ gifs: data });
  };

  voteOnGif = async id => {
    await axios.post(`${this.apiUrl}/vote`, { id });
    alert('YOU JUST VOTED GOOD JOB');
    this.getBattleGifs();
  };

  render() {
    const { gifs } = this.state;

    return (
      <div className="hero is-medium is-dark">
        <div className="hero-body">
          <div className="container">
            <h2 className="title is-3 has-text-centered">Battle Gifs</h2>

            {gifs && (
              <div className="columns">
                {Object.keys(gifs).map(gif => (
                  <div className="column">
                    <div className="box">
                      <div className="gif-container">
                        <div className="figure is-square">
                          <img
                            src={gifs[gif].url}
                            style={{ maxHeight: '100px' }}
                          />
                        </div>
                        <div className="caption">{gifs[gif].caption}</div>
                      </div>
                    </div>

                    <a
                      onClick={() => this.voteOnGif(gifs[gif].id)}
                      className="button is-info is-large is-fullwidth"
                    >
                      VOTE
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BattleGifs;
