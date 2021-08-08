import './Login.css';
import kaminoBrand from './images/kamino-brand.png';
import { loginUrl } from './utils/spotify';

const Login = () => {
  return (
    <div className="login">
      <img className="login-brand" src={kaminoBrand} alt="Kamino logo" />
      <a href={loginUrl}>Login With Spotify</a>
    </div>
  );
};
export default Login;
