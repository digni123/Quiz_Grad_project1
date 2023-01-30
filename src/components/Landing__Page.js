import React, { useEffect, useState } from 'react'
import './css/landing__page.css'
import Logo from '../assests/Logo.png'
import Cap from '../assests/cap.png'
import DehazeIcon from '@mui/icons-material/Dehaze';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function Landing__Page() {

    const navigate = useNavigate();
    let gettingUserName = localStorage.getItem('Username');
    const [navbar, setNavbar] = useState()

    const toggleHadnler = () => {
        setNavbar(!navbar)
    }


    // clearing the questions topic form local storage
    const [setting, setsetting] = useState();

    useEffect(() => {
        let final = localStorage.getItem('userauth');
        if (final == 'true') {
            setsetting(final);
        }
        else {
            setsetting(false);
        }
    }, [])

    function test() {
        navigate('/userprofile')
        // setsetting(!setting);
        // localStorage.setItem('userauth', false);
        // localStorage.removeItem('Username');

        // toast.success('😪Successgully LogOut', {
        //     position: "top-right",
        //     autoClose: 1000,
        //     hideProgressBar: true,
        //     closeOnClick: true,
        //     pauseOnHover: true,



            
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });
        
    }


    return (
        <>
            <div className="main__landingPage" id='firstnavbar'>
                <div className="landing__page container">
                    <div className="main__logo">
                        <img src={Logo} alt="MainLogo" />
                    </div>
                    <div className="Toggle__listsIcon">
                        <a href="#">
                            <div className='icon' onClick={toggleHadnler}><DehazeIcon /></div>
                        </a>
                    </div>
                    {navbar && <div className="Toggle__lists">
                        <div className='toggle'>
                            <ul className=''>
                                <li>How it works?</li>
                                <li>Features</li>
                                <li>About us</li>
                            </ul>
                            <div className="LogIn__Btn">
                                {
                                    setting ? <button onClick={test}><PersonIcon /> {gettingUserName} <ArrowDropDownIcon /> </button> : <NavLink to='/login'>
                                        <button id='LogIn__Btn_Text'>LogIn</button>
                                    </NavLink>
                                }
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

            <div className='hidetoggle' id='secondnavbar'>
                <div className="main__landingPage">
                    <div className="landing__page container">
                        <div className="main__logo">
                            <img src={Logo} alt="MainLogo" />
                        </div>
                        <div className="Toggle__listsIcon">
                            <a href="#">
                                <div className='icon'><DehazeIcon /></div>
                            </a>
                        </div>
                        <div className="Toggle__lists">
                            <div className='toggle'>
                                <ul className=''>
                                    <li>How it works?</li>
                                    <li>Features</li>
                                    <li>About us</li>
                                </ul>
                                <div className="LogIn__Btn">
                                    {
                                        setting ? <button onClick={test}><PersonIcon /> {gettingUserName} <ArrowDropDownIcon /> </button> : <NavLink to='/login'>
                                            <button id='LogIn__Btn_Text'>LogIn</button>
                                        </NavLink>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Landing__Page