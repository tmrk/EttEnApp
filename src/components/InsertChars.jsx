const InsertChars = (props) => {

  const {characters, searchFieldRef} = props;

  const InsertChar = (character) => {
    const inputField = searchFieldRef.current;
    let startPos = 0;
    let endPos = 0;
    if (inputField.selectionStart || inputField.selectionStart === '0') {
        startPos = inputField.selectionStart;
        endPos = inputField.selectionEnd;
        inputField.value = inputField.value.substring(0, startPos) + character + inputField.value.substring(endPos, inputField.value.length);
    } else inputField.value += character;
    inputField.selectionStart = inputField.selectionEnd = startPos + 1;
    props.doSearch();
  }

  if (characters) {
    return (
      <div id='insertchars'>
        {characters.split('').map((character, index) =>
          <span key={index} title={'Insert ' + character} onPointerDown={() => InsertChar(character)}>
            {character}
          </span>
        )}
      </div>
    );
  } else return;
}

export default InsertChars;