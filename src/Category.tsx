import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { Grid, Typography } from '@material-ui/core';
import Card from './Card';

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
      <Typography variant="h2" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Popular playlists
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
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
      </Grid>
      <Typography variant="h4" gutterBottom>
        New releases
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
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
      </Grid>
    </>
  );
};

export default Category;
