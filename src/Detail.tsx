import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Typography } from '@material-ui/core';
import { PlayCircleOutline } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './Detail.css';
import './Controls.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { millisToMinutesAndSeconds, millisToAlbumDuration } from './utils';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar } from '@material-ui/core';

interface DetailProps {
  type?: 'artist' | 'album' | 'playlist';
  match?: any;
  spotify?: SpotifyWebApi.SpotifyWebApiJs;
}

interface AlbumDetails {
  title: string;
  artistName: string;
  artistImage: string;
  tracks: SpotifyApi.AlbumTracksResponse;
  releaseYear: string;
  numTracks: number;
  duration: string;
  copyrights: SpotifyApi.CopyrightObject[];
  artwork: string;
}

const Detail = (props: DetailProps) => {
  const { type, spotify } = props;
  const {
    match: { params },
  } = props;
  const id: string = params.id;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // album
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails>();
  const [tracks, setTracks] = useState<any>([]);
  const [image, setImage] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (spotify) {
      switch (type) {
        case 'playlist':
          spotify.getPlaylist(id).then((playlist: any) => {
            const playlistTracks: any[] = playlist.tracks.items.map(
              (item: any) => item.track
            );
            setImage(playlist?.images[0].url);
            setTitle(playlist?.name);
            setTracks(playlistTracks);
          });
          break;
        case 'album':
          spotify.getAlbum(id).then((album: SpotifyApi.AlbumObjectFull) => {
            const artistList: string = album?.artists
              .map((item: SpotifyApi.ArtistObjectSimplified) => item.name)
              .join(', ');

            // const totalYears = pilots.reduce((acc, pilot) => acc + pilot.years, 0);
            const albumDuration: number = album?.tracks.items.reduce(
              (accumulator: number, track: SpotifyApi.TrackObjectSimplified) =>
                accumulator + track.duration_ms,
              0
            );

            let artistImageUrl: string = '';

            spotify
              .getArtist(album?.artists[0].id)
              .then((artist: SpotifyApi.ArtistObjectFull) => {
                return (artistImageUrl = artist.images[0].url);
              })
              .then((i: any) => {
                artistImageUrl = i;
              });

            setAlbumDetails({
              title: album?.name,
              artistName: artistList,
              artistImage: artistImageUrl,
              tracks: album?.tracks,
              releaseYear: album?.release_date.substr(0, 4),
              numTracks: album?.tracks.total,
              duration: millisToAlbumDuration(albumDuration),
              copyrights: album?.copyrights,
              artwork: album?.images[0].url,
            });
            setTracks(album?.tracks.items);
          });
          break;

        default:
          break;
      }
    }
  }, [type, id, spotify]);

  const handleMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const albumTitle: string =
    type === 'album' ? albumDetails?.title || '' : title || '';

  const albumSubtitle: string =
    type === 'album'
      ? `${albumDetails?.releaseYear} • ${albumDetails?.numTracks} songs • ${albumDetails?.duration}` ||
        ''
      : '';

  console.log('albumDetails', albumDetails);

  return (
    <div className="detail-view">
      <div className="detail-view__header">
        <div className="detail-view__header-info-image">
          <img
            className="detail-view__header-info-image_background"
            src={type === 'album' ? albumDetails?.artwork : image}
            alt="albumart"
          />
        </div>

        <div className="detail-view__header-info-metadata">
          <div className="detail-view__header-info-type">{type}</div>
          {albumTitle.length > 15 ? (
            <h1 className="detail-view__header-info-title-long">
              {albumTitle}
            </h1>
          ) : (
            <h1 className="detail-view__header-info-title">{albumTitle}</h1>
          )}

          <div className="detail-view__header-info-subtitle">
            <Avatar src={albumDetails?.artistImage} alt={`Artist image`} />
            <Typography variant="body2" gutterBottom>
              <strong>{albumDetails?.artistName}</strong>
              {' • '}
              {albumSubtitle}
            </Typography>
          </div>
        </div>
      </div>
      <div className="detail-view__user-controls">
        <Fab color="secondary">
          <PlayCircleOutline fontSize="large" className="" />
        </Fab>
        <FavoriteIcon fontSize="large" style={{ marginLeft: '15px' }} />
        <Button onClick={handleMore}>
          <MoreHorizIcon fontSize="large" style={{ marginLeft: '15px' }} />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            style={{ backgroundColor: 'gray', color: 'white' }}
            onClick={handleClose}
          >
            Account
          </MenuItem>
          <MenuItem
            style={{ backgroundColor: 'gray', color: 'white' }}
            onClick={handleClose}
          >
            Profile
          </MenuItem>
          <MenuItem
            style={{ backgroundColor: 'gray', color: 'white' }}
            onClick={handleClose}
          >
            Log out
          </MenuItem>
        </Menu>
      </div>
      <div className="detail-view__user-list">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">#</TableCell>
                <TableCell variant="head">Title</TableCell>
                {type === 'playlist' && (
                  <TableCell variant="head" align="left">
                    Album
                  </TableCell>
                )}
                <TableCell variant="head" align="right">
                  <AccessTimeIcon fontSize="small" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks &&
                tracks.map((item: any, index: number) => {
                  const trackNum: number = index + 1;
                  return (
                    <TableRow key={index} className="detail-view-tracklist-row">
                      <TableCell variant="body" size={'small'}>
                        {trackNum}
                      </TableCell>
                      <TableCell variant="body">{item?.name}</TableCell>
                      {type === 'playlist' && (
                        <TableCell variant="body" align="left">
                          Album title
                        </TableCell>
                      )}
                      <TableCell variant="body" align="right">
                        {millisToMinutesAndSeconds(item.duration_ms)}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        {albumDetails?.copyrights.map(
          (i: SpotifyApi.CopyrightObject, idx: number) => {
            return (
              <>
                <Typography variant="subtitle2" gutterBottom>
                  {i.text}
                </Typography>
                <br />
              </>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Detail;
