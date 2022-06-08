const FilteredWord = (props) => {

  const handleClick = () => {
    props.setResult(props.word);
    props.setSelected(props.word);
  };

  return (
    <li 
      className={ props.word === props.selected ? 'selected' : '' }
      onPointerDown={ handleClick }
    >
      { props.word.form.replace(/[0-9,~]/g, '') }
    </li>
  );

}

export default FilteredWord;