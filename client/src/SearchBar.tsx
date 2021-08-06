interface SearchBarProps {
  keyword: string;
  setKeyword: Function;
}

const SearchBar = (props: SearchBarProps) => {
  const { keyword, setKeyword } = props;
  const BarStyling = {
    width: '20rem',
    background: '#F2F1F9',
    border: 'none',
    padding: '0.5rem',
  };
  return (
    <input
      style={BarStyling}
      key="random1"
      value={keyword}
      placeholder={'search'}
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
