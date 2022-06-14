import FilteredWord from './FilteredWord';

const Filtered = (props) => {
  
  return (
    <ul id='filtered' ref={props.filteredRef}>
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
  
};

export default Filtered;