import './App.scss';
import lexin from './assets/lexin';
import { ReactComponent as SvgCC } from './assets/cc.svg';
import { ReactComponent as SvgCCby } from './assets/cc-by.svg';
import { ReactComponent as SvgCCsa } from './assets/cc-sa.svg';
import { useState } from 'react';

const Search = ({ search, setSearch, filtered, setFiltered }) => {

  const handleInput = (e) => {
    const input = e.target.value;
    setSearch(input);
    const matches = [];
    if (input) for (let i = 0; i < lexin.words.length; i++) {
      const wordForm = lexin.words[i].form.toLowerCase().replace(/[0-9,~, ]/g, '');
      if (wordForm.startsWith(input.toLowerCase())) matches.push(lexin.words[i]);
    }
    setFiltered(matches);
  }

  return (
    <div id='search'>
      <input id='word' type='text' placeholder='Type a word to look up' onInput={ handleInput } value={ search } />
    </div>
  );

}

const FilteredLi = ({ word }) => {
  return (
    <li>{ word.form.replace(/[0-9,~, ]/g, '') }</li>
  );
}

const Filtered = ({ filtered }) => {
  return (
    <ul id='filtered'>
      {(filtered.length) ? 
        filtered.map((word, index) => (
          <FilteredLi key={index} word={word} />
        )
      ) : ''}
    </ul>
  );
}

const Result = () => {
  return (
    <div id='result'>
      Result
    </div>
  );
}

function App() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState({});

  document.addEventListener('keydown', function(e) {
    let selected = document.getElementsByClassName('selected')[0],
    filtered = document.getElementById('filtered');
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (selected && selected.nextSibling) {
          selected.classList.remove('selected');
          selected.nextSibling.classList.add('selected');
        if (selected.nextSibling.getBoundingClientRect().bottom - filtered.getBoundingClientRect().height - 80 >= 0) filtered.scrollTop = selected.nextSibling.offsetTop - filtered.getBoundingClientRect().height - selected.nextSibling.getBoundingClientRect().height - 7;
          //setResult(findWord(selected.nextSibling.innerHTML));
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (selected && selected.previousSibling) {
          selected.classList.remove('selected');
          selected.previousSibling.classList.add('selected');
        if (selected.previousSibling.offsetTop - 80 <= filtered.scrollTop) filtered.scrollTop = selected.previousSibling.offsetTop - 80;
          //setResult(findWord(selected.previousSibling.innerHTML));
        }
        break;
      case 'Escape':
        e.preventDefault();
        setSearch('');
        break;
    }
  });

  return (
    <div id='wrapper' className={ search ? 'on' : '' }>
      <header>
        <h1>Quick Swedish Wordbook</h1>
      </header>
      <Search 
        search={search} setSearch={setSearch}
        filtered={filtered} setFiltered={setFiltered}
      />
      <div id='main' className={ filtered.length ? '' : 'noresult' }>
        <Filtered filtered={filtered} setFiltered={setFiltered} />
        <Result />
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
