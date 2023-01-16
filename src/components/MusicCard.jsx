import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false,
  };

  handleFavorite = async ({ target }) => {
    const { trackName } = this.props;
    this.setState({ loading: true, favorite: true });
    if (target.checked) {
      await addSong(trackName);
    } else {
      await removeSong(trackName);
    }
    this.setState({ loading: false });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, favorite } = this.state;
    if (loading) { return <h4>Carregando...</h4>; }
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorite-input">
          Favorita
          <input
            type="checkbox"
            id="favorite-input"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.handleFavorite }
            checked={ favorite }
          />
        </label>
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
