import QuizPage from "./components/QuizPage"
import Result from "./components/Result"
import { connect } from 'react-redux'
import SignPage from "./components/SignPage"

function App(props) {
  const { authData } = props.auth
  const { result } = props.quiz

  return (
    <div>
      {authData ?
        (result ? <Result /> : <QuizPage />) : (<SignPage />)
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(App)