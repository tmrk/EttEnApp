import { ReactComponent as SvgClose } from '../assets/close.svg';
import InsertChars from './InsertChars';

const Search = (props) => {
  
  const doSearch = props.doSearch;
  const normalise = props.normalise;

  const clearSearch = () => {
    props.setSearch('');
    props.searchFieldRef.current.focus();
    props.searchFieldRef.current.select();
  }

  return (
    <div id='search'>
      <input 
        id='word' type='text' 
        placeholder='Type a word to look up' 
        onChange={ doSearch } 
        value={ props.search } 
        autoFocus='autofocus'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        ref={ props.searchFieldRef }
      />
      <InsertChars 
        characters='åäö' 
        searchFieldRef={ props.searchFieldRef }
        filteredRef={ props.filteredRef }
        setSelected={props.setSelected}
        setResult={props.setResult}
        setFiltered={props.setFiltered}
        setSearch={props.setSearch}
        normalise={normalise}
        doSearch={doSearch}
      />
      <span id='clear' title='Clear search (esc)' onPointerDown={ clearSearch }>
        <SvgClose />
      </span>
    </div>
  );

}

export default Search;