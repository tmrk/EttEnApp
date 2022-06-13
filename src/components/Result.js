import Word from './Word';

const Result = (props) => {
	
	const result = props.result;
	return (
	  <div id='result'>
		{result && result.forms && result.forms.length ? result.forms.map(
			(word, index) => 
			<Word 
				word={ word } 
				setSearch={ props.setSearch }
				key={ index }
				formNumber={ result.forms.length > 1 && index + 1 } // pass the form number only if there is more than one form
			/>
		) : ''}
			{/* { <pre style={{marginTop: 10 + 'px', padding: 20 + 'px', color: '#888'}}>
				<b>Debug:</b><br />
				{JSON.stringify(result, 2, 2)}
			</pre> } */}
	  </div>
	);

  }

  export default Result;