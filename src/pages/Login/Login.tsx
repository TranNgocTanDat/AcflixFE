import Header from "../../Layout/Header/Header";
import "./style.scss";

const Login = () => {
  return (
    <>
      <Header></Header>
      <div className="bodylogin">
        <div className="header-main">
          <h1>classNamey Login Form</h1>
          <div className="header-bottom">
            <div className="header-right w3agile">
              <div className="header-left-bottom agileinfo">
                <form action="#" method="post">
                  <input type="text" value="User name" name="name" />
                  <input type="password" value="Password" name="password" />
                  <div className="remember">
                    <span className="checkbox1">
                      <label className="checkbox">
                        <input type="checkbox" name="" />
                        Remember me
                      </label>
                    </span>
                    <div className="forgot">
                      <h6>
                        <a href="#">Forgot Password?</a>
                      </h6>
                    </div>
                    <div className="clear"> </div>
                  </div>

                  <input type="submit" value="Login" />
                </form>
                <div className="header-left-top">
                  <div className="sign-up">
                    {" "}
                    <h2>or</h2>{" "}
                  </div>
                </div>
                <div className="header-social wthree">
                  <a href="#" className="face">
                    <h5>Facebook</h5>
                  </a>
                  <a href="#" className="twitt">
                    <h5>Twitter</h5>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
