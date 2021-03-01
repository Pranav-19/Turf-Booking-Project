import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import SportsSoccerSharpIcon from '@material-ui/icons/SportsSoccerSharp';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    logoButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }))

const NavBar = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.logoButton} color="inherit" aria-label="logo">
                    <SportsSoccerSharpIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                   Turf Booking
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
             </AppBar>
        </div>
    )
}

export default NavBar
