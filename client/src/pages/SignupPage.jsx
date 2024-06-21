import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Header from '../component/header';
import { signup } from "../api/auth"

export default function SignupPage() {
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordCheck, setPasswordCheck ] = useState('');
    const navigate = useNavigate()

    const handleClick = async () => {
        if (name.length === 0 || email.length === 0 || password.length === 0 || passwordCheck.length === 0 ) {
            alert('所有欄位都是必填的')
            return;
        } else {
            try {
                const response = await signup({
                    name,
                    email,
                    password,
                    passwordCheck,
                });
                if (response.status === 'success') {
                    alert(response.message)
                    navigate('/login')
                } else {
                    alert('註冊失敗，請稍後再試')
                }
            } catch (error) {
                console.log('註冊失敗', error)
            }
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
                                <label className="form-label px-3 text-muted" htmlFor="email">名稱</label>
                                <input className="form-control rounded-pill bg-light" type="text" name="name" placeholder="name" onChange={(nameInput) => setName(nameInput.target.value)} required="" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label px-3 text-muted" htmlFor="email">信箱</label>
                                <input className="form-control rounded-pill bg-light" id="email" type="text" name="email" placeholder="name@mail.com" onChange={(emailInput) => setEmail(emailInput.target.value)} required="" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label px-3 text-muted" htmlFor="password">密碼</label>
                                <input className="form-control rounded-pill bg-light" id="password" type="password" name="password" onChange={(passwordInput) => setPassword(passwordInput.target.value)} required="" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label px-3 text-muted" htmlFor="passwordCheck">確認密碼</label>
                                <input className="form-control rounded-pill bg-light" id="passwordCheck" type="password" name="passwordCheck" onChange={(passwordCheckInput) => setPasswordCheck(passwordCheckInput.target.value)} required="" />
                            </div>
                            <div className="d-grid gap-2 mb-4 ">
                                <button className="btn btn-primary btn-block fw-bold rounded-pill" onClick={handleClick}>提交</button>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    )
}