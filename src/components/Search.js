import lexin from '../assets/lexin';

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

  const handleChange = (e) => {
    const input = e.target.value;
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
      document.getElementById('filtered').scrollTop = 0;
    }
  }

  const clearSearch = () => {
    props.setSearch('');
    document.getElementById('word').focus();
    document.getElementById('word').select();
  }

  return (
    <div id='search'>
      <input 
        id='word' type='text' 
        placeholder='Type a word to look up' 
        onChange={ handleChange } 
        value={ props.search } 
        autoFocus='autofocus'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
      />
      <span id='clear' title='Clear search (esc)' onClick={ clearSearch }></span>
    </div>
  );

}

export default Search;