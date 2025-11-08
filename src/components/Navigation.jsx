import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎓 총학생회
        </Link>
        <div className="nav-links">
          <Link 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
          >
            행사 & 공모전
          </Link>
          <Link 
            to="/community" 
            className={location.pathname === '/community' ? 'active' : ''}
          >
            동아리 & 소모임
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
