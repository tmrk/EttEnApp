import lexin from '../assets/lexin_original';

// Remap the Lexin words database and save it into a new JSON file
const RemapDictionary = () => {

  const accentInsensitive = (str) => {
      str = str.replace(/[ÀÁ]/,"A");
      str = str.replace(/[àá]/,"a");
      str = str.replace(/[ÈÉÊË]/,"E");
      str = str.replace(/[Ç]/,"C");
      str = str.replace(/[ç]/,"c");
      return str.replace(/[^a-z0-9]/gi,''); 
  }

  const words = [];
  for (let i = 0; i < lexin.words.length; i++) {
    const word = lexin.words[i];
    if (!Array.isArray(word.lexeme)) word.lexeme = [ word.lexeme ];
    const newWord = { 
      form: word.form,
      forms: [ word ]
    };
    let includeInWords = true;

    // if ends with number
    if (/[0-9]+$/.test(newWord.form)) {
      const wordFormNumber = Number(newWord.form.match(/[0-9]+$/)[0]);
      const wordFormLength = newWord.form.length - newWord.form.match(/[0-9]+$/)[0].length + 1;
      newWord.form = newWord.form.replace(/ [0-9]+$/, '');

      // if not first form
      if (wordFormNumber > 1) {
        for (let j = 0; j < words.length; j++) {
          if (accentInsensitive(words[j].form.slice(0, wordFormLength))
              === accentInsensitive(newWord.form)) {
            word.form = word.form.replace(/ [0-9]+$/, '');
            words[j].forms.push(word);
          }
        }
        includeInWords = false;
      } else newWord.forms[0].form = newWord.forms[0].form.replace(/ [0-9]+$/, '');
    }
    if (includeInWords) words.push(newWord);
  }
  console.log(words);

  // Create blob and download
  let a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  let blob = new Blob([JSON.stringify({"words": words}, 2, 2)], {type: 'text/plain;charset=utf-8'});
  let url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = 'lexin.json';
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();

};

export default RemapDictionary;