import lexin from '../assets/lexin';
import React, { useRef } from 'react';

const InsertChars = ({characters, searchFieldRef, setSelected, setResult, setFiltered, setSearch,
    normalise }) => {

  // This is just temporary, needs to be moved upwards
  const handleChange = () => {
    const input = searchFieldRef.current.value;
    setSearch(input);
    const matches = [];
    if (input) for (let i = 0; i < lexin.words.length; i++) {
      const wordForm = lexin.words[i].form.toLowerCase();
      if (normalise(wordForm).startsWith(input.toLowerCase())) matches.push(lexin.words[i]);
    }
    setFiltered(matches);
    const firstWord = matches[0];
    if (firstWord) {
      setSelected(firstWord);
      setResult(firstWord);
      document.getElementById('filtered').scrollTop = 0;
    }
  }

  const insertChar = (character) => {
    const inputField = searchFieldRef.current;
    let startPos = 0;
    let endPos = 0;
    if (inputField.selectionStart || inputField.selectionStart === '0') {
        startPos = inputField.selectionStart;
        endPos = inputField.selectionEnd;
        inputField.value = inputField.value.substring(0, startPos) + character + inputField.value.substring(endPos, inputField.value.length);
    } else inputField.value += character;
    inputField.selectionStart = inputField.selectionEnd = startPos + 1;
    handleChange();
    document.getElementById('filtered').scrollTop = 0;
    inputField.focus();
  }

  if (characters) {
    return (
      <div id='insertchars'>
        {characters.split('').map((character, index) =>
          <span key={index} title={'Insert ' + character} onPointerDown={() => insertChar(character)}>
            {character}
          </span>
        )}
      </div>
    );
  } else return;
}

const Search = (props) => {

  const searchFieldRef = useRef(null);

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
        ref={ searchFieldRef }
      />
      <InsertChars 
        characters='åäö' 
        searchFieldRef={ searchFieldRef }
        setSelected={props.setSelected}
        setResult={props.setResult}
        setFiltered={props.setFiltered}
        setSearch={props.setSearch}
        normalise={normalise}
      />
      <span id='clear' title='Clear search (esc)' onPointerDown={ clearSearch }></span>
    </div>
  );

}

export default Search;