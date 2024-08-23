import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../Layout/Header/Header";
import "./style.scss";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { authenticate, getUserInfo } from "../../services/authApi";
import api from "../../services/api";
import UserInfo from "../../model/UserInfo";
import { useAppDispatch, useAuthAction } from "../../redux/store";

interface LoginResponse {
  token: string;
}

interface UserState {
  user: UserInfo;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispath = useAppDispatch();
  const { setPrinciple } = useAuthAction();
  const navigator = useNavigate();

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    authenticate(email, password)
      .then((res) => {
        console.log(res);

        api.setDefaultHeader("Authorization", "Bearer " + res.accessToken);
        // luu accessToken vo localstorage
        localStorage.setItem("accessToken", res.accessToken);
        return getUserInfo();
      })
      .then((info) => {
        // luu user info vao redux
        dispath(setPrinciple(info));
        navigator("/");
      });
  };

  return (
    <>
      <div className="bodylogin">
        <Header></Header>
        <div className="header-main">
          <h1>Đăng Nhập</h1>
          <div className="header-bottom">
            <div className="header-right w3agile">
              <div className="header-left-bottom agileinfo">
                <form onSubmit={handleSubmit} action="#" method="post">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="remember">
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
                  </div>

                  <div className="button-login">
                    <NavLink to={"/register"}>
                      <button type="submit">Đăng Ký</button>
                    </NavLink>
                    <button type="submit">Đăng Nhập</button>
                  </div>
                </form>
                <div className="header-left-top">
                  <div className="sign-up">Bạn có thể đăng nhập bằng</div>
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

export default Login;
