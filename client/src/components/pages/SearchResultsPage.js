import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TurfCard from '../TurfCard'
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import { withRouter, useLocation } from "react-router-dom"
import store from '../../store'
import { getSearchedTurfs } from '../../actions/turfsActions'
import { Alert } from 'reactstrap'


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

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

function SearchResultsPage(props) {

    const classes = useStyles()
    const { turfs } = props.turfs
    let query = useQuery();
    console.log(query.get("searchText"))
    let search = query.get("searchText")

    useEffect(() => {
        store.dispatch(getSearchedTurfs(search));
    }, [search])



    return (
        <div>
            <Typography variant="h4" className={classes.header} color="primary"  >
                Search results for: {search}
            </Typography>
            <Grid container spacing={2}  >

                { turfs.map( turf => (
                     <Grid item sm={6} xs={12} md={4} key={turf._id} >
                        <TurfCard turf={turf} />
                     </Grid>
                )) }
            </Grid>
            { turfs.length === 0 && <Alert color="danger" >No results found </Alert> }
        </div>
    )
}
const mapStateToProps = (state) => ({
    turfs: state.turfs,
    error: state.error
})


export default withRouter(connect(mapStateToProps, null)(SearchResultsPage))
