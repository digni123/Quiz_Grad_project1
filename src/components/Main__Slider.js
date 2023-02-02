import React, { useEffect, useState } from 'react'
import './css/main__slider.css'
import TagLine from '../assests/TagLine.png'
import Sub from '../assests/Sub Tagline.png'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Slider_Img from '../assests/Slider_img.png'
import Line from '../assests/line.png'
import { NavLink } from 'react-router-dom';
import FavoriteTopic from './FavoriteTopic';
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import ClearIcon from '@mui/icons-material/Clear';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import './css/favorite__topic.css'



function Main__Slider() {
    const navigate = useNavigate()


    const [Popup, setPopup] = useState()
    const [AnimationModal, setAnimationModal] = useState(false)

    const [color, setColor] = useState([
        {
            id: 1,
            personalid: 'first',
            Topic: 'Modern Technologies'
        },

        {
            id: '2',
            personalid: 'second',
            Topic: 'Science'
        },

        {
            id: '3',
            personalid: 'third',
            Topic: 'Music'
        },

        {
            id: '4',
            personalid: 'fourth',
            Topic: 'History'
        },

        {
            id: '5',
            personalid: 'fifth',
            Topic: 'Modern Technologies'
        },

        {
            id: '6',
            personalid: 'sixth',
            Topic: 'Music'
        },

        {
            id: '7',
            personalid: 'seven',
            Topic: 'History'
        },

        {
            id: '8',
            personalid: 'eight',
            Topic: 'Modern Technologies'
        },

        {
            id: '9',
            personalid: 'nine',
            Topic: 'Science'
        },

        {
            id: '10',
            personalid: 'ten',
            Topic: 'History'
        },

        {
            id: '11',
            personalid: 'eleven',
            Topic: 'Modern Technologies'
        },

        {
            id: '12',
            personalid: 'twelve',
            Topic: 'Science'
        },

        {
            id: '13',
            personalid: 'thirdteen',
            Topic: 'Music'
        },

        {
            id: '14',
            personalid: 'fourteen',
            Topic: 'History'
        },

        {
            id: '15',
            personalid: 'fiftheen',
            Topic: 'Music'
        },

        {
            id: '16',
            personalid: 'sixteen',
            Topic: 'Science'
        },
    ]);

    useEffect(() => {
        popupanimation()
        Modal.setAppElement('#yourAppElement');
    }, [])

    function popupanimation() {
        let UserAuth = localStorage.getItem('userauth')

        if (UserAuth == 'true') {
            setPopup(true)
        }
        else {
            setPopup(false)
        }
    }

    function openModal() {
        setAnimationModal(true)
    }

    function handleCloseModal() {
        setAnimationModal(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 0,
            // padding: 0,
        },
    };

    let Quiz_Score = localStorage.getItem('QuizScore');

    const arr = [];


    function ColorChange(e) {
        e.target.style.background = '#FCC822'
        e.target.parentElement.parentElement.children[1].children[0].style.visibility = 'visible';

        let final = e.target
        final = final.parentElement.children[0].innerHTML

        let id = e.target.parentElement.id

        // setItem((olditems) => {
        //     return [...olditems, final];
        // });

        JSON.stringify(localStorage.setItem(id, final))
        let gettingvalue = localStorage.getItem(id);

        arr.push(gettingvalue)
        // console.log(arr, "arrrrrrrrrrrrrrrrrrrrrrrrrrrrs");

        // pushing the all quiztopic in single array

        // final array for quiz app
        localStorage.setItem('QuizArray', arr);
        // removing the every single quiz topic from local storage after putting into an one array..
        localStorage.removeItem(id);
    }

    useEffect(() => {
        localStorage.removeItem('QuizArray');
        // test()
    }, [])

    function test(e) {  
        let parent = e.target;
        parent.parentElement.parentElement.children[0].children[0].style.backgroundColor = '#D1D1D1'

        let target = e.target
        target.style.visibility = 'hidden';

        let remove = e.target
        remove = remove.parentElement.parentElement.children[0].children[0].innerHTML
    }

    return (
        <>
            <div className="contain">
                <div className="Main__Slider container">
                    <div className="Slider">
                        <div className='SliderDup'>
                            <div className="Slider__text">
                                <img src={TagLine} alt="" />
                            </div>
                            <div className="Another__Text">
                                <div className="text">
                                    <img src={Sub} alt="SomeText" />
                                </div>
                            </div>
                            <div className="Slider__Btns" onClick={popupanimation}>
                                <div>
                                    {
                                        Popup ?
                                            <NavLink onClick={openModal} className="Slider_First_Btn">
                                                <button id='Slider_Btn_Style1'>Start Solving</button>
                                            </NavLink>
                                            : <NavLink to='/login' className="Slider_First_Btn">
                                                <button id='Slider_Btn_Style1' >Start Solving</button>
                                            </NavLink>
                                    }
                                </div>
                                <Modal isOpen={AnimationModal} style={customStyles}>
                                    <div className="Main__ChoiceTopic container">
                                        <div className="Choice__Topics">
                                            <div className="ChoiceText">
                                                <div className="CancelPageIcon" onClick={() => setAnimationModal(!AnimationModal)}>
                                                    <ClearIcon />
                                                </div>
                                                <span id='FavoriteTopic_MainText'>Choose your favorite topic</span>
                                                <span id='FavoriteTopic_SubText'>Select more than 5 topics to start quiz</span>
                                                <div className="Topics__Lists">
                                                    {
                                                        color.map((items) => {
                                                            return (<>  
                                                                <div className="topicMain_Container">
                                                                    <div className="Lists" id={items.personalid} onClick={ColorChange}>
                                                                        <div id='topic'>{items.Topic}</div>
                                                                    </div>
                                                                    <div className='CancelIcons' onClick={test} style={{ visibility: 'hidden', cursor: 'pointer' }}>
                                                                        <div className='wrongicon' id={items.personalid}>
                                                                            x
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>)
                                                        })
                                                    }
                                                </div>
                                                <div className="StartQuizBtn" onClick={test}>
                                                    <Link to='/quiz' >
                                                        <button id='StartQuizBtnId' >Start Quiz</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal>

                                <div className="Slider_Second_Btn">
                                    <button id='Slider_Btn_Style2'>
                                        <ArrowDropDownIcon />
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className="Slider__Img">
                            <div className="SliderImg">
                                <img src={Slider_Img} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="LineStyle">
                    <img src={Line} alt="" />
                </div>
            </div>
            <div id="yourAppElement" style={{display:'none'}} className="yourClass"></div>
        </>
    )
}

export default Main__Slider