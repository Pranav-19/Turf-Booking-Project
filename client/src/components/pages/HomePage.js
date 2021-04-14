import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TurfCard from '../TurfCard'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'


const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
  header:{
      fontWeight: '600',
      margin:25,
    //   marginTop:80,
      fontStyle: 'italic',
      lineHeight: '2rem',
      letterSpacing: '0.1rem'
  }
})

function HomePage(props) {

    const classes = useStyles()
    const { turfs } = props.turfs

    return (
        <div>
            <Typography variant="h4" className={classes.header} color="primary"  >
                Popular Turfs
            </Typography>
            <Grid container spacing={2}  >

                { turfs.map( turf => (
                     <Grid item sm={6} xs={12} md={4} key={turf._id} >
                        <TurfCard turf={turf} />
                     </Grid>
                )) }
            </Grid>
        </div>
    )
}
const mapStateToProps = (state) => ({
    turfs: state.turfs,
    error: state.error
})


export default connect(mapStateToProps, null)(HomePage)
