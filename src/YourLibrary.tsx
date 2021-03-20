import Grid from '@material-ui/core/Grid';
import Card from './Card';
import SpotifyWebApi from 'spotify-web-api-js';

import { useDataLayerValue } from './DataLayer';

interface YourLibraryProps {
  spotify: SpotifyWebApi.SpotifyWebApiJs;
}

const YourLibrary = (props: YourLibraryProps) => {
  // const { spotify } = props;

  //@ts-ignore
  const [{ playlists }] = useDataLayerValue();
  return (
    <div style={{ flexGrow: 1 }} className="your-library">
      <Grid container spacing={5}>
        {playlists &&
          playlists.items?.map((playlist: SpotifyApi.PlaylistBaseObject) => {
            return (
              <Grid item lg={3}>
                <Card
                  title={playlist.name}
                  direction="vertical"
                  image={playlist.images[0].url}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default YourLibrary;
