const WordArticle = ({ word }) => {
  if (word.pos === 'subst.' && word.inflection) {
    const article = word.inflection.split(' ')[0].slice(-1)[0] === 'n' ? 
      'en' : 'ett';
    return (
      <div className="article">
        <span>{ article }</span>
      </div>
    );
  } else return;
}

const Pos = (props) => {
  const pos = props.pos;
  let formattedPos;
  if (pos) {
    if (pos.substr(0,3) === 'se ') {
      let linkedWordForm = pos.substr(3);
      ['pron.', 'subst.', 'verb', 'adj.'].forEach(str => {
        if (linkedWordForm.endsWith(' ' + str)) linkedWordForm = linkedWordForm.slice(0, -(str.length + 1))
      });

      const handleClick = () => {
        props.searchFieldRef.current.value = linkedWordForm;
        props.doSearch();
      };
      
      formattedPos = (
        <>
          <span>se </span>
          <span className='link' onClick={handleClick}>{ linkedWordForm }</span>
        </>
      )
    } else formattedPos = pos;

    return (<div className='pos'>{formattedPos}</div>);
  } else return;
};

const Lex = ({ lex }) => {
  return (
    <div className='lex'>

      {lex.definition &&
      <div className='definition'>
        {lex.definition}
      </div>
      }

      {lex.usage ?
      <div className='usage'>
        {lex.usage}
      </div> : ''
      }

      {lex.example && 
      <div className='example'>
        {/* <h2>Examples</h2> */}
        <ul>
          {lex.example.map((example, index) =>
            <li key={index}>{example}</li>
          )}
        </ul>
      </div>
      }

      {lex.idiom && 
      <div className='idiom'>
        {/* <h2>Idioms</h2> */}
        <ul>
          {lex.idiom.map((idiom, index) =>
            <li key={index}>{idiom}</li>
          )}
        </ul>
      </div>
      }

      {lex.compound && 
      <div className='compound'>
        {/* <h2>Compounds</h2> */}
        <ul>
          {lex.compound.map((compound, index) =>
            <li key={index}>{compound}</li>
          )}
        </ul>
      </div>
      }

    </div>
    );
}

const Word = (props) => {
  const word = props.word;

  return (
    word && 
    <div className='word'>
      <header className='row1'>
        <h1>{ word.form ? word.form.replace(/[0-9,~]/g, '') : '' }{props.formNumber && <sup>{props.formNumber}</sup>}</h1>
        <WordArticle word={word} />
      </header>
      {word.pronunciation ?
        <div className='pronunciation'>
          {word.pronunciation}
        </div> : ''}

      <Pos 
        pos={word.pos}
        setSearch={props.setSearch}
        doSearch={props.doSearch}
        searchFieldRef={props.searchFieldRef}
      />

      {word.inflection ?
        <div className='inflection'>
          {word.inflection}
        </div> : ''}
      
      {word.lexeme && word.lexeme[0] && word.lexeme[0].definition ? 
        <div className='lexeme'>
        {word.lexeme.map(
          (lex, index) => 
          <Lex lex={ lex } key={ index } />
        )}
      </div> : ''
      }


    </div>
  );

}

export default Word;