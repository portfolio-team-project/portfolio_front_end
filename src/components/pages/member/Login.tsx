import { Fragment } from "react";
import kakaoImg from "../../../assets/image/kakao4.png";
import ez2 from "../../../assets/image/ez2.png";

function Login() {
  return (
    <Fragment>
      
      <div className="container-fluid">
        <div className="row main-content bg-success text-center">

        
          <div className="col-md-4 text-center company__info">
            <span className="company__logo">
              <h2>
                <span className="fa fa-android"></span>
              </h2>
            </span>

              <div className="hero-wrap">
                <img src={ez2} alt="ez2" className="hero-img" />
              </div>

          </div>
          
          <div className="col-md-8 col-xs-12 col-sm-12 login_form">
            <div className="container-fluid">

              <div className="row">
                <h2>로그인</h2>
              </div>

              <div className="row">
                <form className="form-group">

                  <div className="row">
                    <input  type="text" className="form__input" placeholder="Username" />
                  </div>

                  <div className="row">
                    <input type="password" className="form__input" placeholder="Password"/>
                  </div>
                   
                  <div className="row">
                    <input type="submit" value="로그인" className="login-btn" />
                    
                  </div>

                    <button className="kakao-btn">
                      <img src={kakaoImg} alt="kakao" />
                  </button>
                </form>
              </div>
              

            </div>
          </div>

        </div>
      </div>

    </Fragment>
  );
}

export default Login;