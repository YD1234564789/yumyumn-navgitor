import { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth"
import { googleAuth, provider } from "../config/firebase";
import { login } from "../api/auth"
import { AuthContext } from "../api/auth";

export default function LoginContainer() {
    const { auth, setAuth } = useContext( AuthContext )
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('')
    const navigate = useNavigate();

    const handleClick = async () => {
        if (email.length === 0 || password.length === 0) {
            setError('請輸入電子郵件和密碼');
            return;
        }
        try {
            const { success, token } = await login({
                email,
                password,
            });
            if (success) {
                localStorage.setItem('token', token);
                setAuth(token)
                setError("")
            } else {
                setError('登入失敗，請重試');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('帳號或密碼錯誤，請重新輸入');
        }
    };
    const handleClickGoogle=async() =>{
        const result = await signInWithPopup(googleAuth, provider)
        localStorage.setItem('token', result.user.accessToken);
        setAuth(result.user.accessToken) 
    }
    useEffect(() => {
        if (auth) {
            navigate('/');
        }
    }, [localStorage.token])
    return(
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-5 shadow-lg px-5 py-4 mb-5 bg-white rounded-3">
                    <div className="mb-4 text-center">
                        <h1 className="h3 font-weight-normal mb-4 fw-bold">登入</h1>
                    </div>
                    <div className="form-login">
                        <div className="mb-3">
                            <label className="form-label px-3 text-muted" htmlFor="email">信箱</label>
                            <input className="form-control rounded-pill bg-light" id="email" type="text" name="email" placeholder="name@mail.com" onChange={(emailInput) => setEmail(emailInput.target.value)} required="" />
                        </div>
                        <p>{error}</p>
                        <div className="mb-4">
                            <label className="form-label px-3 text-muted" htmlFor="password">密碼</label>
                            <input className="form-control rounded-pill bg-light" id="password" type="password" name="password" onChange={(passwordInput) => setPassword(passwordInput.target.value)} required="" />
                        </div>
                        <div className="d-grid gap-2 mb-4 ">
                            <button className="btn btn-primary btn-block fw-bold rounded-pill" onClick={handleClick}>提交</button>
                        </div>
                        <hr />
                        <div className="text-center">

                            {/* <button className="btn btn-secondary btn-block btn-sm google-log" onClick={handleClickGoogle}>Google Login</button> */}

                            <a href="/signup" className="btn btn-outline-secondary btn-sm fw-bold">註冊</a>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}