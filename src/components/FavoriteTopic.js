import { style } from '@mui/system'
import React, { useEffect, useState } from 'react'
// import './css/favorite__topic.css'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';


function FavoriteTopic(props) {
    // const [Modal, setmodal] = useState();
    const [item, setItem] = useState([]);

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


        // final array for quiz app
        localStorage.setItem('QuizArray', arr);
        // removing the every single quiz topic from local storage after putting into an one array..
        localStorage.removeItem(id);
    }

    useEffect(() => {
        localStorage.removeItem('QuizArray');
        // test()
    }, [])




    const userId = ''
    const Topic = ["Modern Technologies", "Music", "History", "Modern Technologies", "Science"]


    function test(e) {
        let parent = e.target;
        parent.parentElement.parentElement.children[0].children[0].style.backgroundColor = 'green'

        let target = e.target
        target.style.visibility = 'hidden';

        let dddd = localStorage.getItem('QuizArray');
        console.log(dddd, "errorrrrrrrrrrrrrrrrrrrrrrr");

        // let innerTopicgetting = e.target
        // innerTopicgetting =  innerTopicgetting.parentElement.parentElement
        // arr.splice(arr.findIndex(e => e === innerTopicgetting),1);
        // localStorage.setItem('QuizArray', arr);

        // console.log(innerTopicgetting, "this is inner value of quiz topic");
    }

    const email_id = localStorage.getItem('Email')
    const token = localStorage.getItem('Token')


    // let arr = [];

    function startQuiz() {
        let token = localStorage.getItem('Token');
        let userId = localStorage.getItem('UserId');

        const gettingValue = localStorage.getItem('QuizArray');
        // let arr = []
        arr.push(gettingValue);

        // console.log(arr);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            Topic: arr,
            userId: userId,
        });


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch(`http://192.168.29.141:3000/quiz/topic-quiz/${userId}`, requestOptions)

            .then(response => response.json())
        // .then(result => console.log(result,"result"))
        // .catch(error => console.log('error', error));
    }

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

    return (
        <>
            <Modal isOpen={true} style={customStyles}>
                <div className="Main__ChoiceTopic container">
                    <div className="Choice__Topics container">
                        <div className="ChoiceText">
                            <div className="CancelPageIcon" >
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
                            <div className="StartQuizBtn" onClick={startQuiz}>
                                <Link to='/quiz' >
                                    <button id='StartQuizBtnId' >Start Quiz</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default FavoriteTopic