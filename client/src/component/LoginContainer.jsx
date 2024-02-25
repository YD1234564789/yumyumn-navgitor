import { useState } from "react";
import { login } from "../api/auth"

export default function LoginContainer() {
    /*目前沒用到
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleClick = async () => {
        if (username.length === 0) {
            return;
        }
        if (password.length === 0) {
            return;
        }
       
        const { success, authToken } = await login({
            username,
            password,
        });
        if (success) {
            localStorage.setItem('authToken', authToken);
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }*/

    return(
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-5 shadow-lg px-5 py-4 mb-5 bg-white rounded-3">
                    <div className="mb-4 text-center">
                        <h1 className="h3 font-weight-normal mb-4 fw-bold">登入</h1>
                    </div>
                    <form className="form-login" action="/login" method="POST">
                        <div className="mb-3">
                            <label className="form-label px-3 text-muted" htmlFor="email">信箱</label>
                            <input className="form-control rounded-pill bg-light" id="email" type="text" name="email" placeholder="name@mail.com" required="" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label px-3 text-muted" htmlFor="password">密碼</label>
                            <input className="form-control rounded-pill bg-light" id="password" type="password" name="password" required="" />
                        </div>
                        <div className="d-grid gap-2 mb-4 ">
                            <button className="btn btn-primary btn-block fw-bold rounded-pill" type="submit">提交</button>
                        </div>
                        <hr />
                        <div className="text-center">
                            <a href="/auth/google" className="btn btn-secondary btn-block btn-sm google-log">Google Login</a>
                            <a href="/signup" className="btn btn-outline-secondary btn-sm fw-bold">註冊</a>
                        </div>
                    </form>
                </div>
            </div>  
        </div>
    )
}