import React, { useEffect, useState } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TurfCard from '../TurfCard'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import Carousel from '../Carousel'
import store from '../../store'
import { getTurfs } from '../../actions/turfsActions'
import { withRouter } from "react-router-dom"
import Button from '@material-ui/core/Button'


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
  },
  page: {
      textAlign: 'center'
  },
  button:{
      marginLeft: "46%"
  }
})

function HomePage(props) {

    const classes = useStyles()
    const { turfs } = props.turfs
    const { auth, history } = props

    useEffect(() => {
        console.log(auth)
        if(auth && auth.isAuthenticated && auth.user.role === "ADMIN"){
            history.push('/turfsForApproval')
            return;
        }
        store.dispatch(getTurfs());
    }, [auth])

    const [pageNumber, setPageNumber]= useState(1)
    const turfNumber = 6
    let totalPages = turfs.length / turfNumber
    if(turfs.length % turfNumber !=0)
        totalPages++

    const currentPageNumber = (pageNumber * turfNumber) - turfNumber  
    const paginatedturfs = turfs.slice().splice(currentPageNumber, turfNumber)
    console.log(paginatedturfs)

    const handlePrev =()=>{
        if(pageNumber === 1) return
        setPageNumber(pageNumber - 1)
    }
    const handleNext = ()=>{
        if(pageNumber + 1 > totalPages)
            return
        setPageNumber(pageNumber + 1)
    }

    return (
        <div>
            <div style={{ maxWidth: 1000, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
            <Carousel>
                <img src="/static/images/Carousel-4.jpeg"    alt="placeholder" />
                <img src="/static/images/Carousel-5.jpeg" alt="placeholder" />
                <img src="/static/images/Carousel-6.jpeg" alt="placeholder" />
            </Carousel>
            </div>
            <Typography variant="h4" className={classes.header} color="primary"  >
                Popular Turfs
            </Typography>
            <Grid container spacing={2}  >

                { paginatedturfs.map( turf => (
                     <Grid item sm={6} xs={12} md={4} key={turf._id} >
                        <TurfCard turf={turf} />
                     </Grid>
                )) }
            </Grid>
            <Typography variant="h6"  color="primary" className={classes.page}  >
                Page: {pageNumber}
            </Typography>
                <Button onClick={handlePrev} className={classes.button} >prev</Button>
                <Button onClick={handleNext}>next</Button>
        </div>
    )
}
const mapStateToProps = (state) => ({
    turfs: state.turfs,
    error: state.error,
    auth: state.auth
})


export default withRouter(connect(mapStateToProps, null)(HomePage))
