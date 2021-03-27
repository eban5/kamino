import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { millisToMinutesAndSeconds } from './utils';

interface TracklistProps {
  tracks?: SpotifyApi.TrackObjectFull[];
  type?: 'album' | 'playlist';
}

const HeaderRow = (props: { type?: 'album' | 'playlist' }) => {
  const { type } = props;

  if (type === 'album') {
    return (
      <TableHead>
        <TableRow>
          <TableCell variant="head">#</TableCell>
          <TableCell variant="head">Title</TableCell>
          <TableCell variant="head" align="right">
            <AccessTimeIcon fontSize="small" />
          </TableCell>
        </TableRow>
      </TableHead>
    );
  } else {
    return (
      <TableHead>
        <TableRow>
          <TableCell variant="head">#</TableCell>
          <TableCell variant="head">Title</TableCell>

          <TableCell variant="head" align="left">
            Album
          </TableCell>

          <TableCell variant="head" align="right">
            <AccessTimeIcon fontSize="small" />
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
};
const Tracklist = (props: TracklistProps) => {
  const { tracks, type } = props;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <HeaderRow type={type} />
          <TableBody>
            {tracks?.map((track: SpotifyApi.TrackObjectFull, index: number) => {
              return (
                <TableRow key={index} className="detail-view-tracklist-row">
                  <TableCell variant="body" size={'small'}>
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className="detail-view-tracklist-cell"
                    variant="body"
                  >
                    <img
                      className="detail-view-tracklist-art"
                      src={track?.album.images[0].url}
                      alt={`Album art ${track?.name}`}
                    />
                    <div>
                      <div className="detail-view-tracklist-track-name">
                        {track?.name}
                      </div>
                      <div className="detail-view-tracklist-track-artist">
                        {track?.artists[0].name}
                      </div>
                    </div>
                  </TableCell>
                  {type === 'playlist' && (
                    <TableCell variant="body" align="left">
                      {track?.album.name}
                    </TableCell>
                  )}
                  <TableCell variant="body" align="right">
                    {millisToMinutesAndSeconds(track?.duration_ms)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Tracklist;
