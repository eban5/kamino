import { useEffect, useState } from 'react';
import { Button, Typography, Menu, MenuItem } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';

import { PlayCircleOutline } from '@material-ui/icons';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './Detail.css';
import './Controls.css';
import Tracklist from './Tracklist';

import { getPlaylistDuration, millisToAlbumDuration } from './utils';

interface DetailProps {
  type?: 'album' | 'playlist';
  match?: any;
  spotify?: SpotifyWebApi.SpotifyWebApiJs;
}

interface AlbumDetails {
  title: string;
  artistName: string;
  artistImage: string;
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

  const [tracklist, setTracklist] = useState<SpotifyApi.TrackObjectFull[]>([]);

  // album
  const [albumDetails, setAlbumDetails] = useState<AlbumDetails>();
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
              const playlistDuration: number = getPlaylistDuration(
                playlist?.tracks.items
              );

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
                    setTracklist(multipleTracksResponse.tracks);
                  }
                );

              setImage(playlist?.images[0].url);
              setTitle(playlist?.name);

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

            const albumTrackIds: string[] = album?.tracks.items.map(
              (track: SpotifyApi.TrackObjectSimplified) => track.id
            );

            spotify
              .getTracks(albumTrackIds)
              .then(
                (multipleTracksResponse: SpotifyApi.MultipleTracksResponse) => {
                  setTracklist(multipleTracksResponse.tracks);
                }
              );

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
                  {` • ${followers} likes • ${tracklist?.length} songs • ${duration}`}
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
        <Tracklist type={type} tracks={tracklist} />
      </div>
      <div className="detail-view__copyrights">
        {albumDetails?.copyrights.map(
          (i: SpotifyApi.CopyrightObject, idx: number) => {
            return (
              <>
                <Typography variant="subtitle2" gutterBottom key={idx}>
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
