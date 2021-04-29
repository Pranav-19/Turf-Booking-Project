import React, { useState } from 'react'
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
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { selectTurf } from '../actions/turfsActions'
import ConfirmDeleteTurf from './ConfimDeleteTurf'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
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
  
  
const TurfCard = ({ turf, history,selectTurf, auth }) => {
    const classes = useStyles()
    const [confirmModal, setConfirmModal] = useState(false)


    const onModalToggle = () => {
      setConfirmModal(!confirmModal)
  }

    // console.log(history.location.pathname)
    const onClick = () => {
      selectTurf(turf)
      history.push(`/turfs/business/${turf._id}`)
    }

    return (
        <Card className={classes.root} 
        raised >
        <CardActionArea onClick={onClick}  disabled={!turf.isApproved}>
        <CardHeader
          avatar={
            <Avatar  className={classes.avatar}>
              {turf.name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={turf.name}
          subheader={turf.locality}
        />
        <CardMedia
          className={classes.media}
          image={turf.fileURL?turf.fileURL:"/static/images/turf-3.jpg"}
          title={turf.name}
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.bold} display='inline' >
            Address: 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" display='inline' className={classes.leftSpacing} >
          {turf.address}
          </Typography>
          <br/>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.bold} display='inline' >
            Phone:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" display='inline' className={classes.leftSpacing} >
          +91 {turf.phoneNo}
          </Typography>
          <br/>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.bold} display='inline' >
            Cost:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" display='inline' className={classes.leftSpacing} >
          Rs. {turf.costPerHour} /hr
          </Typography>
{     !turf.isApproved  &&    <>
          <br />
          <Typography  variant="body1" color="secondary" style={{fontStyle: 'italic', fontWeight: "500"}} >
              Approval pending
          </Typography>
          </>}
        </CardContent>
        </CardActionArea>
        <CardActions >
            <Button fullWidth variant="outlined" color="primary" onClick={onClick} disabled={!turf.isApproved} >
                View Bookings
            </Button>
            <Button fullWidth variant="outlined" color="secondary" onClick={onModalToggle} >
                Delete Turf
            </Button>
        </CardActions>
        <ConfirmDeleteTurf isOpen={confirmModal} onToggle={onModalToggle} turf={turf} />
      </Card>
    )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, { selectTurf })(TurfCard))
