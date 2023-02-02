import React, { useState } from 'react'
import Logo from '../assests/Logo.png'
import './css/sign_up_page.css'
import Hands_Graduate from '../assests/Hands_Graduate.png'
import { json, Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function SignUpPage() {
    const[username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [cPassword, set_cPassword] = useState('');

    let navigate = useNavigate();

    // Cpassword section
    const handleChange_cPassword = (event) => {
        set_cPassword(event.target.value);
    }

    // Password section
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    // Email section
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }



    const clickToSignUp = () => {
        let userObj = {
            username: username,
            email: email,
            password: password,
            cPassword: cPassword
        }
        fetch('http://192.168.29.140:3000/sign-up', {   
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })

            .then((data) => {
                return data.json()
            }).then((finaldata) => {
                let usernamestore = finaldata.data.username
                localStorage.setItem('Username', usernamestore)
                if (finaldata.status == 200) {
                    navigate("/login");
                }
                else {
                    toast.error('User Already Exists!', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            })
    }

    return (
        <>
            <div className="containe">
                <div className="AuthenticatE_Page container">
                    <div className="page">
                        <div className="logo">
                            <img src={Logo} alt="" />
                        </div>
                        <div className="Welcome__Message">
                            <p id='textarea'>Welcome  back!</p>
                            <p id='textarea' >Please login/Signup to your account.</p>
                        </div>
                        <div className="Authentication__Details">
                            <div className=''>
                                <div className="Email__Section">
                                    <label htmlFor="usernamelabel" className='InputHover'><div>UserName</div></label><br />
                                    <input id='usernamelabel' className='Email_Style' placeholder='Name' onChange={handleChangeUsername} />
                                </div>

                                <div className="Email__Section">
                                    <label htmlFor="emaillabel" className='InputHover'><div>Email</div></label><br />
                                    <input id='emaillabel' className='Email_Style' type="mail" placeholder='example@123.com' onChange={handleChangeEmail} />
                                    {/* <div>Email Address</div> */}
                                </div>

                                {/* password section */}
                                <div className="password__section">
                                    <label htmlFor="passwordlabel">
                                        <div id='passwordTextStyle'>Password</div></label>
                                    <input id='passwordlabel' className='Password_Style' type="password" placeholder='**********' onChange={handleChangePassword} />
                                </div>

                                {/* confirm password section*/}
                                <div className="password__section">
                                    <label htmlFor="passwordConfirmlabel">
                                        <div id='passwordTextStyle'>Confirm Password</div></label>
                                    <input id='passwordConfirmlabel' className='Password_Style' type="password" placeholder='**********' onChange={handleChange_cPassword} />
                                </div>

                                <div className="some__security">
                                    <div className="checkbox">
                                        <input id='Checkbox_input' type="checkbox" />
                                        <span id='Checkbox__Text'>Remember Me</span>
                                    </div>
                                    <di v className="Password">
                                        <button id='Password'>Forget Password?</button>
                                    </di>
                                </div>
                                <div className="authentication__Btns1" onClick={clickToSignUp}>
                                    {/* <Link to='/favoritetopic'> */}
                                    <button id='Authentication_Btns_1'>Signup</button>
                                    {/* </Link> */}
                                </div>
                                <div className="DifferentPlatforms">
                                    <span>Or Sign Up with</span>
                                    <Link to='/favoritetopic'>
                                        <button id='useDifferentplatform'>Facebook</button>
                                        <button id='useDifferentplatform'>Google</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="CapImg">
                        <img src={Hands_Graduate} alt="CapImg" />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default SignUpPage