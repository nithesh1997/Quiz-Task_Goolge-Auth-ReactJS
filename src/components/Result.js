import './Result.css'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

function Result(props) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetchData()
    }, [])
    function fetchData() {
        fetch('http://localhost:4000/quiz')
            .then(res => res.json())
            .then(fin => setData(fin))
    }
    const { QuesAns } = props.quiz
    console.log(QuesAns)
    return (
        <div className="container">
            <p class="fs-3">Quiz Application</p>
            <div className="heading">
                <p class="fs-1">Quiz Result</p>
                <button className='btn btn-primary' onClick={() => window.print()}>Print</button>
            </div>
            <br />
            {data.map((e, index) => (
                <>
                    <div className='questions'>
                        <div className='questionContainer'>
                            <p class="fw-bolder">{index + 1}.{e.question}</p>
                            <div className='optionContainer'>
                                {e.option.map((option, i2) => (
                                    <div class="form-check2">
                                        <input class="form-check-input" type="radio" value="" id="flexCheckDefault" checked={option == QuesAns[e.id]} disabled={true} />
                                        <label class="form-check-label" for="flexCheckDefault">
                                            <p class="fst-normal">{option}</p>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {e.answer == QuesAns[e.id] ? <p class="fs-6 success">Your answer is correct</p> : <p class="fs-6 danger">Your answer is worng</p>}

                    </div><br />
                </>
            ))}

            <div class="alert alert-primary" role="alert">
                <h3 class="fs-3">You may close this window now</h3>
            </div>



        </div>
    )
}

const mapStateToProps = (state) => {
    return state
}


export default connect(mapStateToProps)(Result) 