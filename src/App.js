import './App.scss';
import lexin from './assets/lexin';
import { ReactComponent as SvgCC } from './assets/cc.svg';
import { ReactComponent as SvgCCby } from './assets/cc-by.svg';
import { ReactComponent as SvgCCsa } from './assets/cc-sa.svg';
import { useState } from 'react';

const Search = ({ search, setSearch, setFiltered, indexOfSelected, setIndexOfSelected }) => {

  const handleInput = (e) => {
    const input = e.target.value;
    setSearch(input);
    const matches = [];
    if (input) for (let i = 0; i < lexin.words.length; i++) {
      const wordForm = lexin.words[i].form.toLowerCase().replace(/[0-9,~, ]/g, '');
      if (wordForm.startsWith(input.toLowerCase())) matches.push(lexin.words[i]);
    }
    setIndexOfSelected(0);
    if (matches[indexOfSelected]) matches[indexOfSelected].selected = true;
    setFiltered(matches);
  }

  const clearSearch = () => setSearch('');

  return (
    <div id='search'>
      <input 
        id='word' type='text' 
        placeholder='Type a word to look up' 
        onChange={ handleInput } 
        value={ search } 
        autoFocus='autofocus'
        autoComplete='false'
      />
      <span id='clear' title='Clear search (esc)' onClick={ clearSearch }></span>
    </div>
  );

}

const Filtered = ({ filtered, setResult }) => {
  return (
    <ul id='filtered'>
      {(filtered.length) ? 
        filtered.map((word, index) => (
          <li 
            key={ index } 
            className={ word.selected ? 'selected' : '' }
            onClick={ setResult(word) }
          >
            { word.form.replace(/[0-9,~, ]/g, '') }
          </li>
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
    </div>
  );
}

const Result = ({ result }) => {
  return (
    <div id='result'>
      <Word word={ result } />
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState({});
  const [indexOfSelected, setIndexOfSelected] = useState(0);

  document.addEventListener('keydown', function(e) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        filtered[indexOfSelected].selected = false;
        filtered[indexOfSelected + 1].selected = true;
        setFiltered(filtered);
        setIndexOfSelected(indexOfSelected + 1);

        break;
      case 'ArrowUp':
        e.preventDefault();

        break;
      case 'Escape':
        e.preventDefault();
        setSearch('');
        break;
    }
  });

  return (
    <div id='wrapper' className={ search ? 'on notouch' : 'notouch' }>
      <header>
        <h1>Quick Swedish Wordbook</h1>
      </header>
      <Search 
        search={search} 
        setSearch={setSearch}
        setFiltered={setFiltered}
        indexOfSelected={indexOfSelected}
        setIndexOfSelected={setIndexOfSelected}
      />
      <div id='main' className={ filtered.length ? '' : 'noresult' }>
        <Filtered 
          filtered={filtered} 
          setFiltered={setFiltered}
          setResult={setResult}
        />
        <Result result={ result } setResult={ setResult } />
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
