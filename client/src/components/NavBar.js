import React,{ Fragment, useState } from 'react'
import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SportsSoccerSharpIcon from '@material-ui/icons/SportsSoccerSharp'
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }))

  


const NavBar = ({auth, history}) => {
    const classes = useStyles()
    const [searchText, setSearchText] = useState(null)
    
    const handleLinkClick = (pageURL) => {
      history.push(pageURL)
    }

    const businessLinks = (
      <Fragment>
        <ViewMyBookings onClick={() => handleLinkClick('/myBookings')} />
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

    const handleSearch = () => {
      if(!searchText || searchText === "")
        return
      history.push(`/turfs/search?searchText=${searchText}`)
    }

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
           <div className={classes.search}>
            <div className={classes.searchIcon} >
              <IconButton edge="start" aria-label="logo" color="inherit"
              onClick={handleSearch}
              >
                <SearchIcon />
              </IconButton>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(event) => { setSearchText(event.target.value) }}
            />
          </div>
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
