import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Grid } from '@material-ui/core';
import Card from './Card';
import './Category.css';

const Category = (props: {
  match: any;
  spotify: SpotifyWebApi.SpotifyWebApiJs;
}) => {
  const {
    spotify,
    match: { params },
  } = props;
  const id: string = params.id;

  const [name, setName] = useState<string>('');
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >();
  useEffect(() => {
    if (spotify) {
      spotify
        .getCategory(id)
        .then((category: SpotifyApi.CategoryObject) => setName(category.name));

      spotify
        .getCategoryPlaylists(id)
        .then((playlists: SpotifyApi.CategoryPlaylistsResponse) =>
          setPlaylists(playlists.playlists.items)
        );
    }
  }, [id, spotify]);

  return (
    <>
      <h1 className="category-header">{name}</h1>
      <h3 className="category-header-grid-title">Popular playlists</h3>
      <div className="category-grid">
        {playlists &&
          playlists.map(
            (playlist: SpotifyApi.PlaylistObjectSimplified, index: number) => {
              return (
                <Grid item key={index}>
                  <Card
                    id={playlist.id}
                    direction="vertical"
                    title={playlist.name}
                    subtitle={playlist.description || ''}
                    image={playlist.images[0].url}
                  />
                </Grid>
              );
            }
          )}
      </div>
      <h3 className="category-header-grid-title">New releases</h3>
      <div className="category-grid">
        {playlists &&
          playlists.map(
            (playlist: SpotifyApi.PlaylistObjectSimplified, index: number) => {
              return (
                <Grid item key={index}>
                  <Card
                    id={playlist.id}
                    direction="vertical"
                    title={playlist.name}
                    subtitle={playlist.description || ''}
                    image={playlist.images[0].url}
                  />
                </Grid>
              );
            }
          )}
      </div>
    </>
  );
};

export default Category;
