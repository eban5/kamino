import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { millisToMinutesAndSeconds } from './utils/utils';

interface TracklistProps {
  tracks?: SpotifyApi.TrackObjectFull[];
  type?: 'album' | 'playlist';
}

const HeaderRow = (props: { type?: 'album' | 'playlist' }) => {
  const { type } = props;

  if (type === 'album') {
    return (
      <TableHead>
        <TableRow style={{ color: 'gray' }}>
          <TableCell variant="head">#</TableCell>
          <TableCell variant="head" style={{ textTransform: 'uppercase' }}>
            Title
          </TableCell>
          <TableCell variant="head" align="right">
            <AccessTimeIcon fontSize="small" />
          </TableCell>
        </TableRow>
      </TableHead>
    );
  } else {
    return (
      <TableHead>
        <TableRow style={{ color: 'gray' }}>
          <TableCell
            style={{ fontSize: '0.8em', textTransform: 'uppercase' }}
            variant="head"
          >
            #
          </TableCell>
          <TableCell
            style={{ fontSize: '0.8em', textTransform: 'uppercase' }}
            variant="head"
          >
            Title
          </TableCell>

          <TableCell
            style={{ fontSize: '0.8em', textTransform: 'uppercase' }}
            variant="head"
          >
            Album
          </TableCell>
          <TableCell
            style={{ fontSize: '0.8em', textTransform: 'uppercase' }}
            variant="head"
          >
            Date Added
          </TableCell>

          <TableCell
            style={{ fontSize: '0.8em', textTransform: 'uppercase' }}
            variant="head"
            align="right"
          >
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
                <TableRow
                  key={index}
                  style={{ padding: '0' }}
                  className="detail-view-tracklist-row"
                >
                  <TableCell
                    variant="body"
                    style={{ width: '10px', fontSize: '1.1em' }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    style={{ color: 'white' }}
                    className="detail-view-tracklist-cell"
                    variant="body"
                  >
                    <Link to={`/album/${track?.album.id}`}>
                      <img
                        className="detail-view-tracklist-art"
                        src={track?.album.images[0].url}
                        alt={`Album art ${track?.name}`}
                      />
                    </Link>
                    <div>
                      <div className="detail-view-tracklist-track-name">
                        <Link to={`/album/${track?.album.id}`}>
                          {track?.name}
                        </Link>
                      </div>
                      <div className="detail-view-tracklist-track-artist">
                        <Link to={`/artist/${track?.artists[0].id}`}>
                          {track?.artists[0].name}
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  {type === 'playlist' && (
                    <>
                      <TableCell variant="body" align="left">
                        <Link to={`/album/${track?.album.id}`}>
                          {track?.album.name}
                        </Link>
                      </TableCell>
                      <TableCell variant="body" align="left">
                        {track?.album.name}
                      </TableCell>
                    </>
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
