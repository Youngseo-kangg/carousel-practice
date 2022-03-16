import { Link } from 'react-router-dom';
function Nav() {
  return (
    <nav>
      <Link to='/'>main</Link>
      <Link to='/oneSlider'>one picture slider</Link>
      <Link to='/multipleSlider'>multiple picture slider</Link>
      <Link to='/infiniteCarousel'>infinite carousel</Link>
    </nav>
  );
}
export default Nav;
