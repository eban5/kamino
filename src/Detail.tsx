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
  tracks: SpotifyApi.TrackObjectSimplified[];
  releaseYear: string;
  numTracks: number;
  duration: string;
  copyrights: SpotifyApi.CopyrightObject[];
  artwork: string;
}

// interface PlaylistDetails {
//   title: string;
//   ownerName: string;

// }

const PlaylistTrackList = () => {
  return (
  <></>   
  )
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
  // const [tracks, setTracks] = useState<SpotifyApi.TrackObjectSimplified[]>([]);
  const [playlistTracks, setPlaylistTracks] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);
  const [followers, setFollowers] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (spotify) {
      switch (type) {
        case 'playlist':
          spotify
            .getPlaylist(id)
            .then((playlist: SpotifyApi.PlaylistObjectFull) => {
              console.log('playlist', playlist);

              const playlistDuration: number = playlist?.tracks.items.reduce(
                (accumulator: number, track: SpotifyApi.PlaylistTrackObject) =>
                  accumulator + track.track.duration_ms,
                0
              );
              let playlistTrackList: SpotifyApi.TrackObjectFull[] = [];
              spotify
                .getTracks(
                  playlist?.tracks?.items.map(
                    (track: SpotifyApi.PlaylistTrackObject) => track.track.id
                  )
                )
                .then(
                  (
                    multipleTracksResponse: SpotifyApi.MultipleTracksResponse
                  ) => {
                    playlistTrackList = multipleTracksResponse.tracks;
                  }
                );

              setImage(playlist?.images[0].url);
              setTitle(playlist?.name);
              setPlaylistTracks(playlistTrackList);
              setFollowers(playlist?.followers.total);
              setOwner(playlist?.owner.display_name || '');
              setDuration(millisToAlbumDuration(playlistDuration));
            });
          break;
        case 'album':
          spotify.getAlbum(id).then((album: SpotifyApi.AlbumObjectFull) => {
            const artistList: string = album?.artists
              .map((item: SpotifyApi.ArtistObjectSimplified) => item.name)
              .join(', ');

            const albumDuration: number = album?.tracks.items.reduce(
              (accumulator: number, track: SpotifyApi.TrackObjectSimplified) =>
                accumulator + track.duration_ms,
              0
            );

            const albumTracks: SpotifyApi.TrackObjectSimplified[] =
              album?.tracks.items;

            let artistImageUrl: string = '';
            spotify
              .getArtist(album?.artists[0].id)
              .then((artist: SpotifyApi.ArtistObjectFull) => {
                artistImageUrl = artist.images[0].url;
              });

            setAlbumDetails({
              title: album?.name,
              artistName: artistList,
              artistImage: artistImageUrl,
              tracks: albumTracks,
              releaseYear: album?.release_date.substr(0, 4),
              numTracks: album?.tracks.total,
              duration: millisToAlbumDuration(albumDuration),
              copyrights: album?.copyrights,
              artwork: album?.images[0].url,
            });
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
  console.log('TYPE --------', type === 'playlist');

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
            {type === 'album' && (
              <Avatar
                style={{ display: 'inline-flex' }}
                src={albumDetails?.artistImage}
                alt={`Artist image`}
              />
            )}
            <Typography variant="body2" gutterBottom>
              {type === 'album' ? (
                <>
                  <strong>{albumDetails?.artistName}</strong>
                  {' • '}
                  {albumSubtitle}
                </>
              ) : (
                <>
                  <strong>{owner}</strong>
                  {` • ${followers} likes • ${playlistTracks?.length} songs • ${duration}`}
                </>
              )}
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
              {type === 'playlist' &&
                playlistTracks?.map(
                  (
                    playlistTrack: SpotifyApi.TrackObjectFull,
                    index: number
                  ) => {
                    console.log(
                      `playlist track ${playlistTrack.track_number} ${playlistTrack.name}`
                    );

                    return (
                      <TableRow
                        key={index}
                        className="detail-view-tracklist-row"
                      >
                        <TableCell variant="body" size={'small'}>
                          {playlistTrack?.track_number}
                        </TableCell>
                        <TableCell variant="body">
                          {playlistTrack?.name}
                        </TableCell>
                        {type === 'playlist' && (
                          <TableCell variant="body" align="left">
                            {playlistTrack?.album.name}
                          </TableCell>
                        )}
                        <TableCell variant="body" align="right">
                          {millisToMinutesAndSeconds(
                            playlistTrack?.duration_ms
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
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
