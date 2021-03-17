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
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DISCOVER_WEEKLY":
      return {
        ...state,
        discover_weekly: action.discover_weekly,
      };
    default:
      return state;
  }
};

export default reducer;