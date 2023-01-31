import React, { Children, useEffect, useRef, useState } from 'react'
import Landing__Page from './Landing__Page'
import './css/quiz__page.css'
import LeftArrow from '../assests/LeftArrow.png'
import RightArrow from '../assests/RightArrow.png'
import SkipArrow from '../assests/SkipArrow.png'
import Score__Screening from './Score__Screening'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Time from '../assests/Time.png'
import Modal from 'react-modal';


function Quiz__Page() {

    const navigate = useNavigate();

    // quiz counter
    let [counter, setCounter] = useState(0)

    // quiz inside
    const [question, setQuestion] = useState()
    const [optionOne, setOptionOne] = useState()
    const [optionTwo, setOptionTwo] = useState()
    const [optionThree, setOptionThree] = useState()
    const [optionFour, setOptionFour] = useState()
    let [score, setScore] = useState(0)
    const [hide, setHide] = useState(true)

    let [Sec, setSec] = useState()
    const [Test, setTest] = useState([])



    const [AnimationModal, setAnimationModal] = useState(false)


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 0,
            zIndex: 1,
        },
    };

    let Quiz_Score = localStorage.getItem('QuizScore');

    function openModal() {
        setAnimationModal(true)
        setHide(false)
    }

    // Array-Object of all questions
    // const [Test, setTest] = useState(
    //     [
    //         {
    //             question: 'what is tesla?',
    //             opt1: 'truck',
    //             opt2: 'cycle',
    //             opt3: 'car',
    //             opt4: 'none of these',
    //             correct: 'opt3',
    //         }
    //         ,
    //         {
    //             question: 'what is programming?',
    //             opt1: 'its a coding',
    //             opt2: 'its a game',
    //             opt3: 'its a toy',
    //             opt4: 'none of these',
    //             correct: 'opt3',
    //         }
    //         ,
    //         {
    //             question: 'why we use react js?',
    //             opt1: 'its a single side rendering',
    //             opt2: 'why i tell u..',
    //             opt3: 'we use in cooking',
    //             opt4: 'none of these',
    //             correct: 'opt3',
    //         }
    //         ,
    //         {
    //             question: 'who is elon bhai?',
    //             opt1: 'he is my friend',
    //             opt2: 'he is my teacher',
    //             opt3: 'he is my father',
    //             opt4: 'none of these',
    //             correct: 'opt3',
    //         }
    //         ,
    //         {

    //             question: 'yyy?',
    //             opt1: 'he is my friend',
    //             opt2: 'he is my teacher',
    //             opt3: 'he is my father',
    //             opt4: 'none of these',
    //             correct: 'opt3',
    //         }
    //     ]
    // )

    // default quiz question setup code:

    useEffect(() => {
        ttt()
        localStorage.removeItem('QuizScore');
    }, [])


    const TimerCountdown = () => {
        let timer = count > 0 && setInterval(() => { setCount(count - 1) }, 1000);
        return (() => clearInterval(timer))
    }

    // arr[] = 0,1,2,3 
    // NextQuestion Increment code
    function IncrementQuestions() {
        if (counter <= Test.data?.length) {
            if (counter === Test.data?.length) {
                // console.log('questions are finished brother')background-color: rgba(0, 0, 0, 0.5);
                // navigate('/screenscore');
                openModal()
            }
            else {
                progress();

                if (counter == 0) {
                    counter = counter + 1
                    setCounter(counter);
                    progress();
                }

                // setQuestionNo(Test[counter].no)
                setQuestion(Test.data?.[counter].question)
                setOptionOne(Test.data?.[counter].Options[0])
                setOptionTwo(Test.data?.[counter].Options[1])
                setOptionThree(Test.data?.[counter].Options[2])
                setOptionFour(Test.data?.[counter].Options[3])


                let count = counter + 1;
                if (count == 5) {
                    setCounter(4)
                }
                else {
                    setCounter(count);
                }
            }
        }
        else {
            console.log('this is for testing');
        }
    }


    // PreviousQuestion Decrement code
    function DecrementQuestions() {
        if (counter <= Test.data?.length) {
            if (counter === 0) {
                console.log('this is a question 1');
            }
            else {
                counter = counter - 1;

                setCounter(counter)
                progress();

                setQuestion(Test.data?.[counter].question)
                setOptionOne(Test.data?.[counter].Options[0])
                setOptionTwo(Test.data?.[counter].Options[1])
                setOptionThree(Test.data?.[counter].Options[2])
                setOptionFour(Test.data?.[counter].Options[3])
            }
        }
        else {
            console.log('this is a testing guys');
        }
    }





    // quiz score implementation, 
    function options(e) {

        let final = e.target.innerHTML



        if (counter == Test.data?.length) {
            console.log(e.target.id)
            patch()
            // navigate('/screenscore');
            openModal();

            let ResetCounter = counter = 0
            setCounter(ResetCounter);
        }
        else {

        }

        setQuestion(Test.data?.[counter].question)
        setOptionOne(Test.data?.[counter].Options[0])
        setOptionTwo(Test.data?.[counter].Options[1])
        setOptionThree(Test.data?.[counter].Options[2])
        setOptionFour(Test.data?.[counter].Options[3])

        let dd = counter + 1
        setCounter(dd)
        progress();

        let output = Test.data?.[counter - 1].ans

        if (final == output) {

            setScore(score += 1)
            localStorage.setItem("QuizScore", score)

            // if (score <= Test.data?.length) {    
            //     setScore(scoreInc)
            //     console.log("your final score is =", score)
            // }
            // else {
            //     console.log('out of the box');
            // }
        }
        else {
            // console.log('hjuhgyugyuguy answer');
        }
    }


    let patch = async () => {
        let token = localStorage.getItem('Token');
        let userId = localStorage.getItem('UserId');
        let QuizScore = JSON.parse(localStorage.getItem('QuizScore'));


        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "score": QuizScore,
            "userId": userId
        });


        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        const quiz_score = await fetch(`http://192.168.29.141:3000/quiz/score/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    }



    let mainprogress = document.querySelectorAll('.mainprogress');
    let dd = document.getElementById('progress1');


    // progress bar and nextquestion animation logic here:
    function progress() {
        mainprogress.forEach((element, id) => {
            if (id < counter + 1) {
                element.classList.add('mainprogress_active');
            }
            else {
                element.classList.remove('mainprogress_active');
            }
        })

        const active = document.querySelectorAll('.mainprogress_active');

        dd.style.width = ((active.length - 1) / (mainprogress.length - 1)) * 100 + '%';
    }


    let [count, setCount] = useState(60);
    useEffect(() => {
        {
            if (count == 0) {
                navigate('/screenscore')
            }
            else {
                let timer = count > 0 && setInterval(() => { setCount(count - 1) }, 1000);
                return (() => clearInterval(timer))
            }
        }
    }, [count])


    const ttt = async () => {
        let userId = localStorage.getItem('UserId');
        let token = localStorage.getItem('Token');

        var myHeaders = new Headers();
        myHeaders.append("Authorization", token)
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const fetchData = await fetch(`http://192.168.29.141:3000/quiz/topic-quiz/${userId}`, requestOptions)
        const data = await fetchData.json();

        // set the deafult question and options in quiz app
        setQuestion(data.data?.[counter].question)
        setOptionOne(data.data?.[counter].Options[0])
        setOptionTwo(data.data?.[counter].Options[1])
        setOptionThree(data.data?.[counter].Options[2])
        setOptionFour(data.data?.[counter].Options[3])

        setCounter(counter + 1)

        setTest(data);
    }

    return (
        <>
            {/* NavBar Component */}
            <Landing__Page />

            <div className="Quiz__main__Container container">
                <Modal isOpen={AnimationModal} style={customStyles} >
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
                </Modal >
                <div className="Quiz_Container ">
                    {hide && <div className="QuestionProgressBar">
                        <div className="progress1" id='progress1'></div>
                        <div className="ProgressBar">
                            <div className="mainprogress mainprogress_active"></div>
                            <div className="mainprogress"></div>
                            <div className="mainprogress"></div>
                            <div className="mainprogress"></div>
                            <div className="mainprogress"></div>
                        </div>
                    </div>}
                    <div className="QustionsSection">
                        <span id='Quiz__QuestionsSection'>{question}</span>
                    </div>
                    <div className="AllQuiz__OptionsSection">
                        <input type="radio" id='opt1' name='opt' />  <span className='optionsNo'>A.</span><label id='opt1' onClick={options} className='Option__Style'>{optionOne}</label>
                        <input type="radio" id='opt2' name='opt' /> <span className='optionsNo'>B.</span><label id='opt2' onClick={options} className='Option__Style'>{optionTwo}</label>
                        <input type="radio" id='opt3' name='opt' /> <span className='optionsNo'>C.</span><label id='opt3' onClick={options} className='Option__Style'>{optionThree}</label>
                        <input type="radio" id='opt4' name='opt' /> <span className='optionsNo'>D.</span><label id='opt4' onClick={options} className='Option__Style'>{optionFour}</label>
                    </div>
                    <div className="QuizSubmition__ButtonsAndTimer" >
                        <button onClick={DecrementQuestions} className='QuizQuestionPrevious__Btn'>
                            <img src={LeftArrow} alt="" />
                            Previous
                        </button>
                        {/* <span className='TimerIcon' ><img src={Time}/> */}
                        <span id='timerCount'>{count}</span>
                        {/* </span> */}
                        <div className='Quiz__QuestionprevandnextSection'>
                            <button onClick={IncrementQuestions} className='QuizQuestionNext__Btn' id='NextQuizBtn'>
                                Next
                                <img src={RightArrow} alt="" />
                            </button>
                            <button onClick={IncrementQuestions} className='QuizQuestionSkip__Btn'>
                                Skip
                                <img src={SkipArrow} alt="SkipArrowImg" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Quiz__Page