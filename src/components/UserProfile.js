import React, { useEffect, useState } from 'react'
import './css/user__profile.css'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsIcon from '@mui/icons-material/Settings';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

function UserProfile() {
    const navigate = useNavigate();
    const [Username, setUserName] = useState()
    const [pointshide,setPointsHide] = useState()

    let [userProfileAuth, setuserProfileAuth] = useState()

    useEffect(() => {
        let gettingUserAuth = localStorage.getItem('userauth');
        let username = localStorage.getItem('Username')

        setUserName(username);

        if (gettingUserAuth == 'true') {
            setuserProfileAuth(true)
            setPointsHide(true)
        }
        else {
            setuserProfileAuth(false)
        }
    }, [])

    const ChangeAuth = () => {
        localStorage.setItem('userauth', false);
        localStorage.removeItem('Username')

        setUserName('');

        setPointsHide(false)
        // localStorage.removeItem('QuizScore');
        toast.success('😪Successgully LogOut', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        let gettingUserAuth = localStorage.getItem('userauth');

        if (gettingUserAuth == 'true') {
            setuserProfileAuth(true)
            setPointsHide(true)
        }
        else {
            setuserProfileAuth(false)
        }
    }

    const callingLoginPage = () => {
        navigate('/login')
    }


    return (
        <>
            <div className="UserProfile container">
                <div className="UserSection">
                    {/* user profile and follow section */}
                    <div className="userfirstsection">
                        <div className="UserProfileIMG">
                            <div className="Profile"></div>
                        </div>
                        <div className="UserName">{Username}</div>  
                    </div>
                    <div className="usersecondsection">
                        <div className="Profile__detailsLists"> 
                            <ul className='UserProfileLists'>
                                { pointshide && <li onClick={() => navigate('/screenscore')}><span class='UserProfileListsIcon'><LeaderboardIcon /></span><span className='textstyling'>Points</span></li>}
                                <li><span class='UserProfileListsIcon'><LeaderboardIcon /></span><span className='textstyling'>Rank</span></li>
                                <li><span class='UserProfileListsIcon'><SupportAgentIcon /></span><span className='textstyling'>Support</span></li>
                                <li><span class='UserProfileListsIcon'><SettingsIcon /></span><span className='textstyling'>Setting</span></li>
                                <li><span class='UserProfileListsIcon'><CurrencyRupeeIcon /></span><span className='textstyling'>Refer Earn</span></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div id='UserButtonStyling'>
                            {
                                userProfileAuth ? <button className='LogoutBtn' onClick={ChangeAuth}>Log out</button> : <button className='LogoutBtn' onClick={callingLoginPage}>LogIn</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default UserProfile