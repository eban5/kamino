// taken from https://medium.com/cleverprogrammer/spotify-clone-using-reactjs-the-ultimate-guide-2a47977a1e4f

export interface CurrentlyPlaying {
  artist: string;
  track: string;
  albumArt: string;
  duration: string;
}

export interface KaminoState {
  user: any;
  token: string | null;
  playlists: any[];
  playback: 'READY' | 'PLAYING' | 'PAUSED' | 'COMPLETE';
  currently_playing: CurrentlyPlaying | null;
}

export const initialState: KaminoState = {
  user: null,
  token: null,
  playlists: [],
  playback: 'READY',
  currently_playing: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_BG_COLOR':
      return {
        ...state,
        bg_color: action.bg_color,
      };
    case 'SET_CURRENTLY_PLAYING':
      return {
        ...state,
        currently_playing: action.currently_playing,
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };
    case 'SET_DISCOVER_WEEKLY':
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    case 'SET_RECENTLY_PLAYED':
      return {
        ...state,
        recently_played: action.recently_played,
      };
    case 'SET_TOP_ARTISTS':
      return {
        ...state,
        top_artists: action.top_artists,
      };
    case 'SET_SAVED_ALBUMS':
      return {
        ...state,
        albums: action.albums,
      };
    case 'SET_TOP_TRACKS':
      return {
        ...state,
        top_tracks: action.top_tracks,
      };
    case 'SET_DEVICES':
      return {
        ...state,
        devices: action.devices,
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.categories,
      };

    case 'SET_PLAYBACK':
      return {
        ...state,
        playback: action.playback,
      };

    default:
      return state;
  }
};

export default reducer;
