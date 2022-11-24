import './SignPage.css'
import googleImg from './google.png'
import examImg from './conceptOnlineExam.png'
import { projectAuth, provider } from '../Firebase/Config';
import { connect } from 'react-redux'
import { addAuth, againAuth, errorAuth } from '../Redux-toolkit/AuthSlice';

function SignPage(props) {
    function handleSigninPopup() {
        projectAuth.signInWithPopup(provider)
            .then(res => props.authSignDispatch(res))
            .then(err => props.errorAuthDispatch(err))
        props.againAuthDispatch(true)
    }

    if (props.alert) {
        alert(props.alert)
    }

    return (
        <div class="maindiv">
            <img src={googleImg} alt="Google" className='Google' />
            <h1>Sign in</h1>
            <img className='examImage' src={examImg} />
            <div className='signBtn'>
                <h2>Continue to Gmail</h2>
                <button onClick={handleSigninPopup}><ion-icon name="logo-google"></ion-icon> Sign in with Google</button>
            </div>
        </div>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        authSignDispatch: (data) => dispatch(addAuth(data)),
        errorAuthDispatch: (data) => dispatch(errorAuth(data)),
        againAuthDispatch: (state) => dispatch(againAuth(state)),
    }
}

export default connect(null, mapDispatchToProps)(SignPage)