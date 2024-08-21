import { NavLink } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import "./style.scss";

const Register = () => {
  return (
    <>
      <div className="bodylogin">
        <Header></Header>
        <div className="header-main">
          <h1>Đăng Ký</h1>
          <div className="header-bottom">
            <div className="header-right w3agile">
              <div className="header-left-bottom agileinfo">
                <form action="#" method="post">
                  <input type="text" placeholder="Tên tài khoản" name="name" />
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                  />
                  <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    name="password"
                  />
                  {/* <div className="remember">
                    <label className="checkbox">
                      <input type="checkbox" name="" />
                      Ghi nhớ tôi
                    </label>
                    <div className="forgot">
                      <h6>
                        <a href="#">Quên mật khẩu?</a>
                      </h6>
                    </div>
                    <div className="clear"> </div>
                  </div> */}

                  {/* <input type="submit" value="Login" /> */}
                  <div className="button-login">
                    <NavLink to={"/login"}>
                      <button type="submit">Đăng Nhập</button>
                    </NavLink>
                    <button type="submit">Đăng Ký</button>
                  </div>
                </form>
                <div className="header-left-top">
                  <div className="sign-up">Bạn có thể đăng ký bằng</div>
                </div>
                <div className="header-social wthree">
                  <a href="#" className="face">
                    <h5>Facebook</h5>
                  </a>
                  <a href="#" className="twitt">
                    <h5>Google</h5>
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

export default Register;
