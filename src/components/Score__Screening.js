import React from 'react'
import './css/score__screening.css'
import Number_Img from '../assests/Number_Img.png'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';


function Score__Screening() {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 0,
        },
    };

    let Quiz_Score = localStorage.getItem('QuizScore');

    return (
        <>
            <div >
                <Modal isOpen={true} style={customStyles}>
                    <div className="Main__ScoreScreen container">
                        <div className="ScreenScore">
                            <div className="Whole__BackgroundImg">
                                <div className='Score_ScreenInner'>
                                    <div className='ScreenScoretext1'>
                                        <p id='ScreenScoretext1'>Your Score</p>
                                    </div>
                                    {/* <img src={Number_Img} alt="ScoreImg" /> */}
                                    <div className='QuizApp__Score'>{Quiz_Score}</div>
                                </div>
                            </div>
                            <Link to='/'>
                                <button id='scorebtn'>Complete</button>
                            </Link>
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default Score__Screening