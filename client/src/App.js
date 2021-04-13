import './App.css';
import NavBar from './components/NavBar'
import { Provider } from 'react-redux'
import store from './store'
import React from 'react'
import { loadUser } from './actions/authActions'
import { getTurfs } from './actions/turfsActions'
import HomePage from './components/pages/HomePage'

class App extends React.Component {

  componentDidMount(){
    store.dispatch(loadUser());
    store.dispatch(getTurfs());
  }

  render(){
    return (
      <Provider store={store} >
        <div className="App">
          <NavBar />
          <HomePage />
        </div>
      </Provider>
    )
  }
}

export default App;
