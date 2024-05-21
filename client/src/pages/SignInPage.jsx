import { useState } from "react";
import Header from '../component/header';
import { login } from "../api/auth"

export default function LoginPage() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const handleClick = async () => {
      if (email.length === 0) {
          return;
      }
      if (password.length === 0) {
          return;
      }  
      const { success, token } = await login({
          email,
          password,
      });
      if (success) {
          localStorage.setItem('token', token);
      }
  };

  return(
    <div id="background">
      <Header />
      <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-5 shadow-lg px-5 py-4 mb-5 bg-white rounded-3">
                    <div className="mb-4 text-center">
                        <h1 className="h3 font-weight-normal mb-4 fw-bold">註冊</h1>
                    </div>
                    <div className="form-login">
                        <div className="mb-3">
                            <label className="form-label px-3 text-muted" htmlFor="email">信箱</label>
                            <input className="form-control rounded-pill bg-light" id="email" type="text" name="email" placeholder="name@mail.com" onChange={(emailInput) => setEmail(emailInput.target.value)} required="" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label px-3 text-muted" htmlFor="password">密碼</label>
                            <input className="form-control rounded-pill bg-light" id="password" type="password" name="password" onChange={(passwordInput) => setPassword(passwordInput.target.value)} required="" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label px-3 text-muted" htmlFor="password">確認密碼</label>
                            <input className="form-control rounded-pill bg-light" id="password" type="password" name="password" onChange={(passwordInput) => setPassword(passwordInput.target.value)} required="" />
                        </div>
                        <div className="d-grid gap-2 mb-4 ">
                            <button className="btn btn-primary btn-block fw-bold rounded-pill" onClick={handleClick}>提交</button>
                        </div>
                        <hr />
                        <div className="text-center">
                            <a href="/auth/google" className="btn btn-secondary btn-block btn-sm google-log">Google Login</a>
                            <a href="/signup" className="btn btn-outline-secondary btn-sm fw-bold">註冊</a>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    </div>
  )
}