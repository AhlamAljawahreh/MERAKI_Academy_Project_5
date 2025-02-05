import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillXCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../reducers/login";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      imgUser: state.loginReducer.imgUser,
    };
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [signuPMessage, setSignupMessage] = useState("");
  const [modalLogin, setModalLogin] = useState(false);

  const toggleModal = () => {
    setModalLogin(!modalLogin);
  };

  /* ************************* */
  const logInUser = async (e) => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        userName,
        password,
      });
      if (res.data.success) {
        setSignupMessage("");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.userId);
        localStorage.setItem("img", res.data.imge);
        dispatch(login({ token: res.data.token, user_id: res.data.userId }));
        navigate("/home");
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setSignupMessage(error.response.data.message);
      }
      setSignupMessage("Error happened while Login, please try again");
    }
  };
  /* *************************** */
  return (
    <div className="container_for_all">
      <div className="container_login">
        <div className="flex_qout">
          <div className="slogan"> Welcome to AAB</div>
          <div className="qout">
            {" "}
            Connect with new friends and get to know a new world
          </div>
        </div>
        <div className="Login">
          <div className="all_input_login">
            <div>
              {" "}
              <input
                className="input_login"
                type="email"
                placeholder="username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div>
              <input
                className="input_login"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <button className="button_login" onClick={logInUser}>
              Login
            </button>
          </div>

          <div className="sperate_style">
            <div className="line_login"></div>
            <button className="craete_new_account" onClick={toggleModal}>
              Craete new account
            </button>
          </div>
        </div>
      </div>

      {modalLogin && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="register">
              <div className="register-content">
                <div className="title_close">
                  <div className="titRegis">Sign Up</div>
                  <BsFillXCircleFill
                    className="icon_close"
                    onClick={toggleModal}
                  />
                </div>
                <div className="gap_inpt_signup">
                  <div className="line_signup"></div>

                  <div>
                    <input //1
                      className="input_signup"
                      type="text"
                      placeholder="userName"
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <input //2
                      className="input_signup"
                      type="email"
                      placeholder="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <input //3
                      className="input_signup"
                      type="date"
                      placeholder="date of birth"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                    />
                  </div>

                  <div className="border_bottom">
                    <input //4
                      className="input_signup"
                      type="text"
                      placeholder="gender"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    />
                  </div>

                  <div className="border_bottom">
                    <input //5
                      className="input_signup"
                      type="text"
                      placeholder="country"
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                  </div>

                  <div>
                    <input //6
                      className="input_signup"
                      type="password"
                      placeholder="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <button
                  className="buttonRegs"
                  onClick={(e) => {
                    axios
                      .post("http://localhost:5000/users/", {
                        userName: userName,
                        email: email,
                        dob: date,
                        gender: gender,
                        country: country,
                        password: password,
                      })
                      .then((result) => {
                        console.log(result.data);

                        e.target.style.background =
                          "linear-gradient(-45deg,#CAC531,#F3F9A7)";
                        e.target.style.color = "black";

                        setSignupMessage(
                          "The user has been created successfully"
                        );
                      })
                      .catch((err) => {
                        e.target.style.background =
                          "linear-gradient(-45deg,#f7797d,#f7797d)";
                        e.target.style.color = "black";
                        setSignupMessage(
                          "Error happened while register, please try again"
                        );
                      });
                  }}
                >
                  sing up
                </button>

                <div className="sing_up_message">{signuPMessage}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
