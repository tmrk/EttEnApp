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
      const linkedWordForm = pos.substr(3);
      const handleClick = () => {
        props.setSearch(linkedWordForm);
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

const Word = (props) => {
  const word = props.word;


  return (
    word ? 
    <div className='word'>
      <header className='row1'>
        <h1>{ word.form ? word.form.replace(/[0-9,~]/g, '') : '' }</h1>
        <WordArticle word={word} />
      </header>
      {word.pronunciation ?
        <div className='pronunciation'>
          {word.pronunciation}
        </div> : ''}

      <Pos 
        pos={word.pos}
        setSearch={props.setSearch}
      />

      {word.inflection ?
        <div className='inflection'>
          {word.inflection}
        </div> : ''}

      {word.lexeme && word.lexeme.definition ?
        <div className='definition'>
          {word.lexeme.definition}
        </div> : ''}

        {word.lexeme && word.lexeme.compound ?
        <div className='compound'>
          {word.lexeme.compound}
        </div> : ''}


      <pre>
        {JSON.stringify(word, 2, 2)}
      </pre>
    </div> : ''
  );

}

export default Word;