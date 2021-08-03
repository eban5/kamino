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
              <Link to={`/playlist/${playlist.id}`} key={index}>
                <Card
                  key={index}
                  title={playlist?.name}
                  direction="vertical"
                  image={playlist?.images[0].url}
                />
              </Link>
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
            <Link to={`/artist/${artist.id}`} key={index}>
              <Card
                key={index}
                title={artist?.name}
                direction="vertical"
                image={artist?.images[0].url}
              />
            </Link>
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
        albums.items?.map((item: any, index: number) => {
          return (
            <Link to={`/album/${item?.album.id}`} key={index}>
              <Card
                key={index}
                title={item?.album?.name}
                direction="vertical"
                image={item?.album?.images[0].url}
              />
            </Link>
          );
        })}
    </>
  );
};

const YourLibrary = (props: YourLibraryProps) => {
  const { type } = props;

  //@ts-ignore
  const [{ playlists, top_artists, albums }] = useDataLayerValue();

  return (
    <div className="your-library">
      <Grid container spacing={5}>
        <Grid item xs>
          <div className="menubar-links">
            <Link to="/collections/playlists">
              <h3 className="menubar-links-link">Playlists</h3>
            </Link>
            <Link to="/collections/artists">
              <h3 className="menubar-links-link">Artists</h3>
            </Link>
            <Link to="/collections/albums">
              <h3 className="menubar-links-link">Albums</h3>
            </Link>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs>
          <h2 className="your-library-title">{type}</h2>
        </Grid>
      </Grid>
      <div className="your-library-grid">
        {type === 'playlists' ? (
          <PlaylistGrid playlists={playlists} />
        ) : type === 'artists' ? (
          <ArtistGrid artists={top_artists} />
        ) : type === 'albums' ? (
          <AlbumGrid albums={albums} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default YourLibrary;
