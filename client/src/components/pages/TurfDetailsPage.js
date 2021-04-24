import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { red } from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid';
import DatePicker from "react-datepicker";
import Slots from "../Slots"
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { withRouter, useParams } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 550,
      margin:20,
      borderRadius:10
    },
    media: {
      height: 0,
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
let prevDate = null

function TurfDetailsPage(props) {
    const classes = useStyles()
    let { turfId } = useParams()
    const date = new Date()
    date.setHours(0,0,0)
    const [startDate, setStartDate] = useState(date);
    const [bookings, setBookings] = useState([])
    const [turf, setTurf] = useState(props.selectedTurf)

    useEffect(() => {
      console.log(turfId)
      if(!turf){
          axios.get(`/api/turfs/${turfId}`)
          .then(res => {
            console.log(res.data)
            setTurf(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },[])
    

    useEffect(() => {
      axios.get(`/api/bookings/${turfId}?date=${startDate}`)
      .then(res => {
        console.log(res.data)
        if(prevDate !== startDate){
          prevDate = startDate
          setBookings(res.data.bookings)
        }
      })
      .catch(err => {
        console.log(err)
      })
    })

    const onDateChange = (newDate) => {
      let date = new Date()
      date.setHours(0,0,0)
      console.log(date)
      console.log(date.getDate(), newDate.getDate())
      if(newDate.getTime() >= date.getTime() || (date.toDateString() === newDate.toDateString())){
        setStartDate(newDate)
      }
    }
  
    return (
        <div>
        <Grid container spacing={2}  >
        <Grid  item xs={12} sm={6} >
            <Card className={classes.root} 
            raised >
            <CardActionArea>
            <CardHeader
            avatar={
                <Avatar  className={classes.avatar}>
                { turf && turf.name[0]}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                <MoreVertIcon />
                </IconButton>
            }
            title={ turf && turf.name }
            subheader={ turf && turf.address }
            />
            <CardMedia
            className={classes.media}
            image="/static/images/turf-3.jpg"
            title={ turf && turf.name }
            />
            <CardContent>
            <Typography variant="body1" color="textSecondary" component="p" className={classes.bold} display='inline' >
                Address: 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" display='inline' className={classes.leftSpacing} >
            { turf && turf.address }
            </Typography>
            <br/>
            <Typography variant="body1" color="textSecondary" component="p" className={classes.bold} display='inline' >
                Phone:
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" display='inline' className={classes.leftSpacing} >
            +91 { turf && turf.phoneNo }
            </Typography>
            </CardContent>
            </CardActionArea>
            {/* <CardActions disableSpacing>
                <Button fullWidth variant="outlined" color="primary" >
                    Book Now    
                </Button>
            </CardActions>     */}
        </Card>
      </Grid>
      <Grid  item xs={12} sm={6} >
      <Typography variant="h4" color="primary"  >
      Select a Slot
        </Typography>  
        <DatePicker selected={startDate} onChange={date => onDateChange(date)} />
        <Slots bookings={{bookings, date: startDate}} turf={turf} />
      </Grid>
      
      </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    selectedTurf: state.turfs.selectedTurf
})

export default withRouter(connect(mapStateToProps, null)(TurfDetailsPage))
