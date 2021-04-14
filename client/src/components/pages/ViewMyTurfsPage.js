import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TurfCard from '../TurfCard'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { getBusinessTurfs } from '../../actions/businessTurfsActions'


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

function ViewMyTurfsPage(props) {


    useEffect(() => {
        if(props.businessTurfs.businessTurfs.length === 0)
            props.getBusinessTurfs()
    })

    const classes = useStyles()
    const { businessTurfs } = props.businessTurfs

    return (
        <div>
            <Typography variant="h4" className={classes.header} color="primary"  >
                My Turfs
            </Typography>
            <Grid container spacing={2}  >

                { businessTurfs.map( turf => (
                     <Grid item sm={6} xs={12} md={4} key={turf._id} >
                        <TurfCard turf={turf} />
                     </Grid>
                )) }
            </Grid>
        </div>
    )
}
const mapStateToProps = (state) => ({
    businessTurfs: state.businessTurfs,
    error: state.error
})


export default connect(mapStateToProps, { getBusinessTurfs })(ViewMyTurfsPage)
