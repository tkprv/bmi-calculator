import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BMI from './Page/bmi';

const App = () => {

    return (
        <Router>
            <Switch>
                <Route exact path="/Page/bmi" render={(props) => (<BMI />)}></Route>
                <Redirect to={{ pathname: '/Page/bmi' }} />
            </Switch>
        </Router>
    )
}

export default App
