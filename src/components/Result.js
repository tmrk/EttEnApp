import Word from './Word';

const Result = (props) => {
	
	const result = props.result;
	return (
	  <div id='result'>
		{result ? <Word 
			word={ result } 
			setSearch={ props.setSearch }
		/> : ''}
	  </div>
	);

  }

  export default Result;