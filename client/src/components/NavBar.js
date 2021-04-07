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
import { connect } from 'react-redux'


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


const authLinks = (
  <Fragment>
    <Logout />
  </Fragment>
)

const guestLinks = (
  <Fragment>
    <Register />
    <Login />
  </Fragment>
)


const NavBar = ({auth}) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                <IconButton edge="start" className={classes.logoButton} color="inherit" aria-label="logo">
                    <SportsSoccerSharpIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
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

export default connect(mapStateToProps, null)(NavBar)
