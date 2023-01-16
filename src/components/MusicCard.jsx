import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false,
    favArray: [],
  };

  async componentDidMount() {
    const { trackId } = this.props;
    const getFavSongs = await getFavoriteSongs();

    this.setState({
      favArray: getFavSongs.some((music) => music.trackId === trackId),
    });
  }

  handleFavorite = async ({ target }) => {
    const { trackName } = this.props;
    this.setState({ loading: true, favorite: true });
    if (target.checked) {
      const resultado = await getMusics(trackName);
      await addSong(resultado[0]);
    } else {
      await removeSong(trackName);
    }
    this.setState({ loading: false });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, favorite, favArray } = this.state;
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
            checked={ favorite || favArray }
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
