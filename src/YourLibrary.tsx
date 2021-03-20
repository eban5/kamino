import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from './Card';
import SpotifyWebApi from 'spotify-web-api-js';
import { Link } from 'react-router-dom';
import { useDataLayerValue } from './DataLayer';
import './YourLibrary.css';

interface YourLibraryProps {
  spotify: SpotifyWebApi.SpotifyWebApiJs;
  type?: 'artists' | 'albums' | 'playlists';
  match?: any;
}

interface PlaylistGridProps {
  playlists: SpotifyApi.ListOfUsersPlaylistsResponse;
}

interface ArtistGridProps {
  artists: SpotifyApi.UsersTopArtistsResponse;
}

interface AlbumGridProps {
  albums: SpotifyApi.UsersSavedAlbumsResponse;
}

const PlaylistGrid = (props: PlaylistGridProps) => {
  const { playlists } = props;
  return (
    <>
      {playlists &&
        playlists.items?.map(
          (playlist: SpotifyApi.PlaylistBaseObject, index: number) => {
            return (
              <Grid item lg={3}>
                <Link to={`/playlist/${playlist.id}`}>
                  <Card
                    key={index}
                    title={playlist?.name}
                    direction="vertical"
                    image={playlist?.images[0].url}
                  />
                </Link>
              </Grid>
            );
          }
        )}
    </>
  );
};

const ArtistGrid = (props: ArtistGridProps) => {
  const { artists } = props;
  return (
    <>
      {artists &&
        artists.items?.map((artist: any, index: number) => {
          return (
            <Grid item lg={3}>
              <Link to={`/artist/${artist.id}`}>
                <Card
                  key={index}
                  title={artist?.name}
                  direction="vertical"
                  image={artist?.images[0].url}
                />
              </Link>
            </Grid>
          );
        })}
    </>
  );
};

const AlbumGrid = (props: AlbumGridProps) => {
  const { albums } = props;
  return (
    <>
      {albums &&
        albums.items?.map((album: any, index: number) => {
          return (
            <Grid item lg={3}>
              <Link to={`/album/${album.id}`}>
                <Card
                  key={index}
                  title={album?.name}
                  direction="vertical"
                  image={album?.images[0].url}
                />
              </Link>
            </Grid>
          );
        })}
    </>
  );
};

const YourLibrary = (props: YourLibraryProps) => {
  const { type } = props;
  const {
    match: { params },
  } = props;

  //@ts-ignore
  const [{ playlists, top_artists, albums }] = useDataLayerValue();

  return (
    <Container className="your-library" disableGutters={true} maxWidth={false}>
      <Grid container spacing={5}>
        <Grid item xs>
          <h3 className="your-library-title">{type}</h3>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        {type === 'playlists' ? (
          <PlaylistGrid playlists={playlists} />
        ) : type === 'artists' ? (
          <ArtistGrid artists={top_artists} />
        ) : type === 'albums' ? (
          <AlbumGrid albums={albums} />
        ) : (
          ''
        )}
      </Grid>
    </Container>
  );
};

export default YourLibrary;
