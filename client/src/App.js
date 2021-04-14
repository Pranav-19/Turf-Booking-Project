import './App.css';
import NavBar from './components/NavBar'
import store from './store'
import React from 'react'
import { loadUser } from './actions/authActions'
import { getTurfs } from './actions/turfsActions'
import HomePage from './components/pages/HomePage'
import ViewMyTurfsPage from './components/pages/ViewMyTurfsPage'
import AddTurfPage from './components/pages/AddTurfPage'
import ViewMyBookingsPage from './components/pages/ViewMyBookingsPage'
import { Route, Switch } from "react-router-dom"
import { connect } from 'react-redux'


class App extends React.Component {

  componentDidMount(){
    store.dispatch(loadUser());
    store.dispatch(getTurfs());
  }

  render(){
    const {auth} = this.props

    return (
        <div className="App">
          <NavBar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              { auth && auth.isAuthenticated && auth.user.role==="BUSINESS" && <Route exact path="/myTurfs" component={ViewMyTurfsPage} />}
              { auth && auth.isAuthenticated && auth.user.role==="BUSINESS" && <Route exact path="/addTurf" component={AddTurfPage} />}
              { auth && auth.isAuthenticated && auth.user.role==="REGULAR" && <Route exact path="/myBookings" component={ViewMyBookingsPage} />}
            </Switch>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(App);
