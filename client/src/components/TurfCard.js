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
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      margin:20
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    avatar: {
      backgroundColor: red[500],
    },
  }))
  
  
const TurfCard = () => {
    const classes = useStyles()

    return (
        <Card className={classes.root} 
        raised >
        <CardActionArea>
        <CardHeader
          avatar={
            <Avatar  className={classes.avatar}>
              K
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Kalidas Turf"
          subheader="Mulund West, Mumbai"
        />
        <CardMedia
          className={classes.media}
          image="/static/images/turf-3.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Address: Mulund West, Mumbai
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone: +91 234567890
          </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
            <Button fullWidth variant="outlined" color="primary">
                Book Now    
            </Button>
        </CardActions>
        
      </Card>
    )
}

export default TurfCard
