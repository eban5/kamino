import './Login.css';
import kaminoBrand from './images/kamino-brand.png';
import { loginUrl } from './spotify';

const Login = () => {
  return (
    <div className="login">
      <img src={kaminoBrand} alt="Kamino logo" height={80} />
      <a href={loginUrl}>Login With Spotify</a>
    </div>
  );
};
export default Login;
