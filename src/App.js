import './App.scss';
import lexin from './assets/lexin';
import { ReactComponent as SvgCC } from './assets/cc.svg';
import { ReactComponent as SvgCCby } from './assets/cc-by.svg';
import { ReactComponent as SvgCCsa } from './assets/cc-sa.svg';
import { useState, useEffect } from 'react';

const Search = (props) => {

  const handleInput = (e) => {
    const input = e.target.value;
    props.setSearch(input);
    const matches = [];
    if (input) for (let i = 0; i < lexin.words.length; i++) {
      const wordForm = lexin.words[i].form.toLowerCase().replace(/[0-9,~, ]/g, '');
      if (wordForm.startsWith(input.toLowerCase())) matches.push(lexin.words[i]);
    }
    props.setFiltered(matches);
    const firstWord = matches[0];
    if (firstWord) {
      props.setSelected(firstWord);
      props.setResult(firstWord);
    }
  }

  const clearSearch = () => props.setSearch('');

  return (
    <div id='search'>
      <input 
        id='word' type='text' 
        placeholder='Type a word to look up' 
        onChange={ handleInput } 
        value={ props.search } 
        autoFocus='autofocus'
        autoComplete='false'
      />
      <span id='clear' title='Clear search (esc)' onClick={ clearSearch }></span>
    </div>
  );

}

const FilteredWord = (props) => {
  const showWord = () => {
    props.setResult(props.word);
    props.setSelected(props.word);
  };
  return (
    <li 
      className={ props.word === props.selected ? 'selected' : '' }
      onClick={ showWord }
    >
      { props.word.form.replace(/[0-9,~, ]/g, '') }
    </li>
  );
}

const Filtered = (props) => {
  return (
    <ul id='filtered'>
      {(props.filtered.length) ? 
        props.filtered.map((word, index) => (
          <FilteredWord 
            key={index} 
            word={word}
            setResult={props.setResult}
            setSelected={props.setSelected}
            selected={props.selected}
          />
        )
      ) : ''}
    </ul>
  );
}

const Word = ({ word }) => {
  return (
    <div className='word'>
      <span className='row1'>
        <h1>{ word.form }</h1>
      </span>
      <span className='row2'>
        {JSON.stringify(word, 2, 2)}
      </span>
    </div>
  );
}

const Result = ({ result }) => {
  return (
    <div id='result'>
      {result ? <Word word={ result } /> : ''}
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState({});
  const [selected, setSelected] = useState({});


  const handleKeydown = (event) => {
    if (['ArrowDown', 'ArrowUp', 'Escape'].includes(event.key)) {
      const indexOfSelected = filtered.indexOf(selected);
      const ulFiltered = document.getElementById('filtered');
      const liSelected = document.getElementsByClassName('selected')[0];
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          if (indexOfSelected > -1) {
            const nextWord = filtered[indexOfSelected + 1];
            if (nextWord) {
              setSelected(nextWord);
              setResult(nextWord);
              if (liSelected.nextSibling.getBoundingClientRect().bottom - ulFiltered.getBoundingClientRect().height - 80 >= 0) ulFiltered.scrollTop = liSelected.nextSibling.offsetTop - ulFiltered.getBoundingClientRect().height - liSelected.nextSibling.getBoundingClientRect().height - 7;
            }
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (indexOfSelected > -1) {
            const prevWord = filtered[indexOfSelected - 1];
            if (prevWord) {
              setSelected(prevWord);
              setResult(prevWord);
              if (liSelected.previousSibling.offsetTop - 80 <= ulFiltered.scrollTop) ulFiltered.scrollTop = liSelected.previousSibling.offsetTop - 80;
            }
          }
          break;
        case 'Escape':
          event.preventDefault();
          setSearch('');
          break;
        default: return;
      }
    }
  };

  // Add & remove eventListener upon mount & unmount
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  return (
    <div id='wrapper' className={ search ? 'on notouch' : 'notouch' }>
      <header>
        <h1>EttApp</h1>
      </header>
      <Search 
        search={search} 
        setSearch={setSearch}
        setFiltered={setFiltered}
        setSelected={setSelected}
        setResult={setResult}
      />
      <div id='main' className={ filtered.length ? '' : 'noresult' }>
        <Filtered 
          filtered={filtered} 
          setFiltered={setFiltered}
          setResult={setResult}
          setSelected={setSelected}
          selected={selected}
        />
        <Result 
          result={ result } 
        />
      </div>
      <footer>
        <a id="cclicense" rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" title="Creative Commons License BY-SA 4.0">
          <SvgCC />
          <SvgCCby />
          <SvgCCsa />
        </a>
        <span>Quick Swedish Wordbook v2 (2022) is based on <a href="https://spraakbanken.gu.se/resource/lexin" rel="dct:source">LEXIN Second Edition</a></span>
      </footer>
    </div>
  );
}

export default App;
