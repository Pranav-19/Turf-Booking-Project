import React,{ Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SportsSoccerSharpIcon from '@material-ui/icons/SportsSoccerSharp'
import Login from './auth/Login'
import Register from './auth/Register'
import Logout from './auth/Logout'
import { ViewMyTurfs, AddTurf, ViewMyBookings } from './NavBarLinks'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginBottom:80
    },
    logoButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }))

  


const NavBar = ({auth, history}) => {
    const classes = useStyles()
    
    const handleLinkClick = (pageURL) => {
      history.push(pageURL)
    }

    const businessLinks = (
      <Fragment>
        <ViewMyTurfs onClick={() => handleLinkClick('/myTurfs')} />
        <AddTurf  />
      </Fragment>
    )
    const regularLinks = (
      <Fragment>
        <ViewMyBookings onClick={() => handleLinkClick('/myBookings')} />
      </Fragment>
    )
    
    const authLinks = (
      <Fragment>
        { auth.isAuthenticated && auth.user.role === "BUSINESS"? businessLinks: regularLinks}
        <Logout />
      </Fragment>
    )
    
    const guestLinks = (
      <Fragment>
        <Register />
        <Login />
      </Fragment>
    )

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                <IconButton edge="start" className={classes.logoButton} color="inherit" aria-label="logo"
                 onClick={() => handleLinkClick('/')} >
                    <SportsSoccerSharpIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title} >
                   Turf Booking
                </Typography>
                { auth.isAuthenticated? authLinks: guestLinks }
                </Toolbar>
             </AppBar>
        </div>
    )
}

const mapStateToProps = (state) => ({
  auth:state.auth
})

export default withRouter(connect(mapStateToProps, null)(NavBar))
