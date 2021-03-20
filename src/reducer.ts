// taken from https://medium.com/cleverprogrammer/spotify-clone-using-reactjs-the-ultimate-guide-2a47977a1e4f

export const initialState = {
  user: null,
  token: null,
  playlists: [],
  playing: false,
  item: null,
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
    default:
      return state;
  }
};

export default reducer;
