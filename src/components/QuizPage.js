import './Quiz.css'
import { useEffect, useState } from 'react'
import { andQues, showResult } from '../Redux-toolkit/QuizSlice'
import { connect } from 'react-redux';
import axios from 'axios'
import { authStatus } from '../Redux-toolkit/AuthSlice';

function QuizPage(props) {
    const [data, setData] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const [timer, setTimer] = useState(0)
    const [disableInput, setDsiableInput] = useState([])
    const [SubmitTimer, setSubmitTimer] = useState(false)
    const [listAuth, setListAuth] = useState(null)
    let EndTimerInSec = 20
    const { user } = props.auth.authData
    const { alredyAuth } = props.auth
    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        fetch('http://localhost:4000/quiz')
            .then(res => res.json())
            .then(fin => setData(fin))
    }

    let count = 1
    let paginationData = data.reduce((acc, cur, index) => {
        if (index % 1 == 0 && index != 0) {
            count += 1
            acc[count] = cur
        } else {
            acc[count] = cur
        }
        return acc
    }, {})



    useEffect(() => {
        if (data.length) {
            const handleTimer = setInterval(timerShow, 1000)
            if (timer == EndTimerInSec) {
                setDsiableInput([...disableInput, pageCount])
                setPageCount(pageCount + 1)
                setTimer(0)
            }
            if (timer == EndTimerInSec && Object.keys(paginationData).length == pageCount) {
                clearInterval(handleTimer)
                props.showResultDispatch()
            }
            if (SubmitTimer == true) {
                clearInterval(handleTimer)
            }
            return () => clearInterval(handleTimer)
        } else {
            setTimer(0)
        }
    }, [timer, data])


    function timerShow() {
        setTimer(timer + 1)
    }


    function handlePageCount(count) {
        if (count == 'last') {
            setPageCount(Object.keys(paginationData).length)
        } else if (count == 'prev') {
            setPageCount(pageCount - 1)
        } else if (count == 'next') {
            setTimer(0)
            setPageCount(pageCount + 1)
            setDsiableInput([...disableInput, parseInt(count), parseInt(pageCount)])
        } else {

            setDsiableInput([...disableInput, parseInt(count), parseInt(pageCount)])
            setPageCount(parseInt(count))
            setTimer(0)
        }
    }

    function handleAnswer(value, id) {
        props.addAnsDispatch({ [id]: value })
    }

    function handleSubmit() {
        if (window.confirm("Are you Sure to submit")) {
            setSubmitTimer(true)
            props.showResultDispatch()
        }

    }
    const { QuesAns } = props.quiz
    return (
        <div className="container">
            <div className='profile'>
                <p class="fs-3 mb-3">Welcome - {user.displayName}</p>
                <img className='photoURL' src={user.photoURL} alt="" />
            </div>
            <hr />
            <p class="fs-2 mb-3 text-center">Asp.Net Quiz</p>
            <h2 className='timer'>Timer: <span className={timer <= EndTimerInSec - 5 ? 'timerPrimery' : 'timerEnd'}>{timer < 10 ? '0' + timer : timer} Sec</span></h2>
            <hr />
            <span class="badge text-bg-warning fw-bold">Question {data.length ? pageCount : 0} of {paginationData ? Object.keys(paginationData).length : '?'}</span>
            {paginationData[pageCount] &&
                (<div className='main'>
                    <p class="fs-1">{pageCount}.{paginationData[pageCount]['question']}</p>
                    <div class='options'>
                        {paginationData[pageCount]['option'].map((e, index) => (
                            <div class="form-check">
                                <input class="form-check-input" name='question' type="radio" value={`${e}`} id={'question' + paginationData[pageCount]['id'] + index} onClick={() => handleAnswer(e, paginationData[pageCount]['id'])} checked={QuesAns[paginationData[pageCount]['id']] == e ? true : false} />
                                <label class="form-check-label" for={'question' + paginationData[pageCount]['id'] + index}>
                                    <p class="fw-bolder">{e}</p>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>)
            }
            <hr />
            {data.length ?
                (<div className='button-main'>
                    <button className='btn btn-default' onClick={() => handlePageCount(1)} disabled={disableInput.includes(1)}>First</button>
                    <button className='btn btn-default' onClick={() => handlePageCount('prev')} disabled={disableInput.includes(1)}>Prev</button>
                    <button className='btn btn-default' onClick={() => handlePageCount('next')} disabled={pageCount == Object.keys(paginationData).length ? true : false}>Next</button>
                    <button className='btn btn-default' onClick={() => handlePageCount('last')} disabled={disableInput.includes(Object.keys(paginationData).length)}>Last</button>
                </div>)
                :
                (<h3 className='errorMess'>Server not available</h3>)
            }
            <div className='mt-3 mb-3'>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        {paginationData &&
                            <>
                                {Object.keys(paginationData).map(e => (
                                    <li class="page-item" onClick={disableInput.includes(parseInt(e)) ? '' : () => handlePageCount(e)} ><a class="page-link" href="#">{e}</a></li>
                                ))}
                            </>
                        }
                    </ul>
                </nav>
            </div>
            <hr />
            <div className='button-footer'>
                <button className='btn btn-default'>Quiz</button>
                <button className='btn btn-default'>Review</button>
                <button className='btn btn-default' disabled={!data.length} onClick={handleSubmit}>Submit Quiz</button>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAnsDispatch: (data) => dispatch(andQues(data)),
        showResultDispatch: () => dispatch(showResult()),
        authStatusDispatch: (state) => dispatch(authStatus(state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);
