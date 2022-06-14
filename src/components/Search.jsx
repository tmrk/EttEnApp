import lexin from '../assets/lexin';
import { ReactComponent as SvgClose } from '../assets/close.svg';
import InsertChars from './InsertChars';

const Search = (props) => {

  // Idea via https://stackoverflow.com/a/15886205/4593394
  const normalise = (str) => {
    return str.replace(
      /([ ~1234567890])|([àáâã])|([çčć])|([èéêë])|([ìíîï])|([ñ])|([òóôõø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, 
      function (str, extrachars, a, c, e, i, n, o, s, u, y, ae) {
        if (extrachars) return '';
        if (a) return 'a';
        if (c) return 'c';
        if (e) return 'e';
        if (i) return 'i';
        if (n) return 'n';
        if (o) return 'o';
        if (s) return 's';
        if (u) return 'u';
        if (y) return 'y';
        if (ae) return 'ae';
      }
    );
  }

  const doSearch = () => {
    const input = props.searchFieldRef.current.value;
    props.setSearch(input);
    const matches = [];
    if (input) for (let i = 0; i < lexin.words.length; i++) {
      const wordForm = lexin.words[i].form.toLowerCase();
      if (normalise(wordForm).startsWith(input.toLowerCase())) matches.push(lexin.words[i]);
    }
    props.setFiltered(matches);
    const firstWord = matches[0];
    if (firstWord) {
      props.setSelected(firstWord);
      props.setResult(firstWord);
      props.filteredRef.current.scrollTop = 0;
    }
    props.searchFieldRef.current.focus(); // doesn't work...
  }

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