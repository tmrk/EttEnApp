import { ReactComponent as Logo } from '../assets/ettapp-logo.svg';
import { ReactComponent as SvgCC } from '../assets/cc.svg';
import { ReactComponent as SvgCCby } from '../assets/cc-by.svg';
import { ReactComponent as SvgCCsa } from '../assets/cc-sa.svg';

const Wrapper = props => <div id='wrapper' className={props.className}>{props.children}</div>;
const Main = props => <div id='main' className={props.className}>{props.children}</div>;

const Header = () => {

  return (
    <header>
      <div id="logo">
        <Logo />
      </div>
      <h1>Quick <br />Swedish <br />Wordbook</h1>
    </header>
  );

}

const Footer = () => {

  return (
    <footer>
      <a id="cclicense" rel="license" href="https://creativecommons.org/licenses/by-sa/4.0/" title="Creative Commons License BY-SA 4.0">
        <SvgCC />
        <SvgCCby />
        <SvgCCsa />
      </a>
      <span>EttApp (2022) is based on <a href="https://spraakbanken.gu.se/resource/lexin" rel="dct:source">LEXIN Second Edition</a></span>
    </footer>
  );

}

export { Wrapper, Main, Header, Footer };