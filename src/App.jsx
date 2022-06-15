import './App.scss';
import lexin from './assets/lexin';
import { useState, useEffect, useRef } from 'react';
import Search from './components/Search';
import Filtered from './components/Filtered';
import Result from './components/Result';
import { Wrapper, Main, Header, Footer } from './components/Layout';
import { isMobile } from 'react-device-detect';

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
              if (liSelected.nextSibling.getBoundingClientRect().bottom 
                - ulFiltered.getBoundingClientRect().height - 80 >= 0) {
                  ulFiltered.scrollTop = liSelected.nextSibling.offsetTop 
                  - ulFiltered.getBoundingClientRect().height;
                }
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
              if (liSelected.previousSibling.offsetTop - 75 <= ulFiltered.scrollTop) ulFiltered.scrollTop = liSelected.previousSibling.offsetTop - 75;
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
    const input = searchFieldRef.current.value;
    setSearch(input);
    const matches = [];
    if (input) for (let i = 0; i < lexin.words.length; i++) {
      const wordForm = lexin.words[i].form.toLowerCase();
      if (normalise(wordForm).startsWith(normalise(input).toLowerCase())) matches.push(lexin.words[i]);
    }
    setFiltered(matches);
    const firstWord = matches[0];
    if (firstWord) {
      setSelected(firstWord);
      setResult(firstWord);
      filteredRef.current.scrollTop = 0;
    }
    searchFieldRef.current.focus(); // doesn't work...
  }

  const filteredRef = useRef(null);
  const searchFieldRef = useRef(null);

  return (
    <Wrapper className={ 
      (isMobile ? 'touch' : 'notouch') + 
      (search ? ' on' : '') 
    }>
      <Header />
      <Search 
        search={search} 
        setSearch={setSearch}
        setFiltered={setFiltered}
        setSelected={setSelected}
        setResult={setResult}
        searchFieldRef={searchFieldRef}
        filteredRef={filteredRef}
        doSearch={doSearch}
      />
      <Main className={ filtered.length ? '' : 'noresult' }>
        <Filtered 
          filtered={filtered} 
          setFiltered={setFiltered}
          setResult={setResult}
          setSelected={setSelected}
          selected={selected}
          filteredRef={filteredRef}
        />
        <Result 
          result={ result } 
          setSearch={setSearch}
          doSearch={doSearch}
          searchFieldRef={searchFieldRef}
        />
      </Main>
      <Footer />
    </Wrapper>
  );

}

export default App;
