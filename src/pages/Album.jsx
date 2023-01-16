import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import searchAlbumsApi from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    artist: '',
    tracksList: [],
    // loading: true,
  };

  componentDidMount() {
    this.loadingTracks();
  }

  loadingTracks = async () => {
    const { match: { params: { id } } } = this.props;
    const tracks = await searchAlbumsApi(id);
    const infoAlbum = tracks[0];
    const songs = tracks.slice(1);
    this.setState({
      artist: infoAlbum,
      tracksList: songs,
    //   loading: false,
    });
    console.log(infoAlbum);
    console.log(songs);
  };

  render() {
    const { tracksList, artist } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        { tracksList.length > 0 && (
          <section>
            <div data-testid="artist-name">
              Artista
              { artist.artistName }
            </div>
            <div data-testid="album-name">
              Album
              { artist.collectionName }
            </div>
            { tracksList.map((song) => (
              <MusicCard
                key={ song.trackId }
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
              />
            ))}
          </section>
        )}

      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};
