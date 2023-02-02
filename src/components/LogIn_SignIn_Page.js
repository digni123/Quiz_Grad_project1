import React, { useEffect } from 'react'
import Logo from '../assests/Logo.png'
import './css/login_signin_page.css'
import Hands_Graduate from '../assests/Hands_Graduate.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal'
import OTPInput, { ResendOTP } from "otp-input-react";


function LogIn_SignIn_Page() {
    const [email, setemail] = useState();
    const [password, setpassword] = useState()
    const [authentication, setAuthentication] = useState();
    const [forgetpassModal, setforgetpassModal] = useState(false);
    const [codeModal, setcodeModal] = useState(false)
    const [newPass, setNewpass] = useState(false)
    const [OTP, setOTP] = useState();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [userData, setUserData] = useState({
        u_email: '',
        u_token: '',
    })

    let navigate = useNavigate();

    function emaillogin(e) {
        let email = e.target.value;
        setemail(email);
    }

    function passwordlogin(e) {
        let password = e.target.value;
        setpassword(password);
    }

    let forgetpassFun = () => {
        setforgetpassModal(true)
    }

    const emailCodeFunc = () => {
        let Email = document.getElementById('EmailAddress').value
        let token = localStorage.getItem('Token');

        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": Email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://192.168.29.140:3000/sign-up/otp-send", requestOptions)
            .then(response => response.text())
            .then((otp) => {
                localStorage.setItem('forgetPassData', otp);
            })
            .catch(error => console.log('error', error));

        setcodeModal(true)
    }

    const NewPasswordSetupFunc = (e) => {
        let forgetPassData = localStorage.getItem('forgetPassData');
        forgetPassData = JSON.parse(forgetPassData)

        let Otp = forgetPassData.OTP;
        let Id = forgetPassData.data._id;

        localStorage.setItem('IDforgetpass', Id);

        console.log(forgetPassData, "datadayafatyaf");

        if (OTP == Otp) {
            setNewpass(true)
        }
        else {
            toast.error('❌Enter Code Properly', {
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
    }

    const handleChange = (otp) => this.setState({ otp });

    function Login() {

        // console.log(email, password, '<===>');
        let url = 'http://192.168.29.140:3000/sign-up/login';

        let items = {
            email: email,
            password: password,
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(items)
        }).then((data) => {
            return data.json()
        }).then((finaldata) => {
            if (finaldata.status == 200) {
                localStorage.setItem('Username', finaldata.Data.username);
                localStorage.setItem('UserId', finaldata.Data._id);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
                setemail(email)
                localStorage.setItem('Email', finaldata.Data.email)
                localStorage.setItem('Token', finaldata.token)
                toast.success('Successfully Logged In!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                localStorage.setItem('userauth', true);
            }
            else {
                toast.error('❌User Not Matching!!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                localStorage.setItem('userauth', false);
            }
            // console.log('dfdfhdkfjdfkdhfkdhf======',finaldata.Data.email ,'()()',finaldata.token  );
        })

        // fetch('http://192.168.29.140:3000/sign-up/login').then((data) => {   
        //     return data.json()
        // }).then((finaldata) => {
        //     console.log(finaldata);
        // })
    }

    const [passwordGett, setpasswordGett] = useState()
    const [CpasswordGett, setCpasswordGett] = useState()

    const ResetPasswordFunc = async () => {
        let passwordGetting = document.getElementById('newpassword').value
        let cpasswordGetting = document.getElementById('confirmnewpassword').value

        setpasswordGett(passwordGetting)
        setCpasswordGett(cpasswordGetting)

        let Id = localStorage.getItem('IDforgetpass');

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "password": passwordGetting,
            "cPassword": cpasswordGetting
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(`http://192.168.29.140:3000/sign-up/reset-password/${Id}`, requestOptions)
            .then(response => response.text())
            .then((final) => {
                final = JSON.parse(final)

                if(final.status == 200)
                {
                    setforgetpassModal(false)
                    setcodeModal(false)
                    setNewpass(false)
            
                    toast.success('Successfully Password Set!', {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });

                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
            })
            .catch(error => console.log('error', error));
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
                                    <label htmlFor="emaillabel" className='InputHover'><div>Email</div></label><br />
                                    <input id='emaillabel' className='Email_Style' type="mail" placeholder='example@123.com' onChange={emaillogin} />
                                    {/* <div>Email Address</div> */}
                                </div>
                                <div className="password__section">
                                    <label htmlFor="passwordlabel">
                                        <div id='passwordTextStyle'>Password</div></label>
                                    <input id='passwordlabel' onChange={passwordlogin} className='Password_Style' type="password" placeholder='**********' />
                                </div>
                                <div className="some__security">
                                    <div className="checkbox">
                                        <input id='Checkbox_input' type="checkbox" />
                                        <span id='Checkbox__Text'>Remember Me</span>
                                    </div>
                                    <div className="Password">
                                        <button id='Password' onClick={forgetpassFun}>Forget Password?</button>
                                    </div>
                                    {
                                        <Modal isOpen={forgetpassModal} style={customStyles}>
                                            <div className="confirmingEmail">
                                                <div className="email">
                                                    <h1 id='forgetpassemailtext'>Continue With Email</h1>

                                                    <label htmlFor="EmailAddress" id='emaillabelid'>Enter Email Address</label>
                                                    <input type="text" id='EmailAddress' placeholder='Type here' className='emailaddress' />

                                                    <button className='emailcontinuebtn' id='Emailcontinuebtn' onClick={emailCodeFunc}>Continue</button>
                                                </div>
                                            </div>
                                        </Modal>
                                    }
                                    {
                                        <Modal isOpen={codeModal} style={customStyles}>
                                            <div className="emailCode">
                                                <h1 id='verifyourEmail'>Verify Your Email</h1>

                                                <span id='codeSendmessgaeEmail'>Verification code sent to your email</span>
                                                <div className="codefunc">
                                                    <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure={false} inputStyles={{ width: 55 }} id="inputvalue" />
                                                </div>
                                                <span id='codeQueryText'>Didn’t receive code<span id='codeResendBtn'>? Resend OTP</span></span>

                                                <button id='forgetCodeSubmitBtn' onClick={NewPasswordSetupFunc}>Continue</button>
                                            </div>
                                        </Modal>
                                    }
                                    {
                                        <Modal isOpen={newPass} style={customStyles}>
                                            <div className="setupNewpassword">
                                                <div className="Settingpassword">
                                                    <h1 id='settingNewPasswodText'>Set New Password</h1>

                                                    <label htmlFor="newpassword" id='newpasswordText'>New Password</label>
                                                    <input id='newpassword' type="text" placeholder='Type here' />

                                                    <label htmlFor="confirmnewpassword" id='confirmPasswordText'>Confirm Password</label>
                                                    <input id='confirmnewpassword' type="text" placeholder='Type here' />

                                                    <button id='ResetcodepasswordButton' onClick={ResetPasswordFunc}>Reset Password</button>
                                                </div>
                                            </div>
                                        </Modal>
                                    }
                                </div>
                                <div className="AuthenticationBtn">
                                    <div className="authentication__Btns" onClick={Login}>
                                        {/* <Link to='/favoritetopic'> */}
                                        <button id='Authentication_Style'>Login</button>
                                        {/* </Link> */}
                                    </div>
                                    <div className="authentication__Btns">
                                        <Link to='/signup'>
                                            <button id='Authentication_Btns_2'>Signup</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="DifferentPlatforms">
                                    <span>Or Login with</span>
                                    {/* <Link to='/favoritetopic'> */}
                                    <button id='useDifferentplatform'>Facebook</button>
                                    <button id='useDifferentplatform'>Google</button>
                                    {/* </Link> */}
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

export default LogIn_SignIn_Page