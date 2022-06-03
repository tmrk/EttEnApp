import './App.scss';
import { ReactComponent as Logo } from './assets/ettapp-logo.svg';
import { ReactComponent as SvgCC } from './assets/cc.svg';
import { ReactComponent as SvgCCby } from './assets/cc-by.svg';
import { ReactComponent as SvgCCsa } from './assets/cc-sa.svg';
import { useState, useEffect } from 'react';

import Search from './components/Search';
import Filtered from './components/Filtered';
import Result from './components/Result';

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
        <div id="logo">
          <Logo />
        </div>
        <h1>Quick Swedish Wordbook</h1>
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
          setSearch={setSearch}
        />
      </div>
      <footer>
        <a id="cclicense" rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" title="Creative Commons License BY-SA 4.0">
          <SvgCC />
          <SvgCCby />
          <SvgCCsa />
        </a>
        <span>EttApp (2022) is based on <a href="https://spraakbanken.gu.se/resource/lexin" rel="dct:source">LEXIN Second Edition</a></span>
      </footer>
    </div>
  );

}

export default App;
