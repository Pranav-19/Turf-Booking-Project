import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import EventRoundedIcon from '@material-ui/icons/EventRounded'
import AccessTimeRounded from '@material-ui/icons/AccessTimeRounded'
import RoomRounded from '@material-ui/icons/RoomRounded'
import { red } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: '65%',
      margin:20,
      borderRadius:10
    },
    media: {
      height: 0,
      margin:5,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
    bold:{
      fontWeight: 'bold'
    },
    leftSpacing:{
      marginLeft: 5
    }
  }))
  


function BookingCard({ booking }) {
    const classes = useStyles()
    const {turf} = booking
    let date = new Date(booking.timing)
    let to = new Date(booking.timing)
    to.setHours(date.getHours() + 1)

    return (
        <div>
            <Card className={classes.root} raised >
                <CardActionArea>
                    <CardHeader 
                    title={turf.name}
                    subheader={turf.address}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} >
                            <CardMedia
                            className={classes.media}
                            image="/static/images/turf-3.jpg"
                            title={turf.name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} >
                            <CardContent>
                                <Typography variant="h6">
                                   <EventRoundedIcon /> {date.toDateString()}
                                </Typography>
                                <Typography variant="h6">
                                  <AccessTimeRounded />  {date.toLocaleTimeString()} - {to.toLocaleTimeString()}
                                </Typography>
                                <Typography variant="h6">
                                  <RoomRounded /> {turf.address}
                                </Typography>
                            </CardContent>
                        </Grid>
                        
                    </Grid>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default BookingCard
