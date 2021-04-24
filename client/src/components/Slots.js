import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { slots } from './timeSlots'
import ConfirmTurfBooking from './ConfirmTurfBooking'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'

const styles = (theme) => ({
    root: {
      maxWidth: 500,
      margin:20,
      borderRadius:10,
      padding: 10,
    //   maxHeight: 700
    },
    button: {
        color: '#4cbb17',
        borderColor: '#4cbb17'
    }
  })



class Slots extends React.Component {

    state={
        timeSlots: slots,
        bookings: null,
        confirmModal: false,
        selectedSlot: null,
        msg: null
    }

    componentDidUpdate(prevProps){
        const { bookings, date } = this.props.bookings
        let bookingIdsToUpdate = []
        // console.log({prevProps})
        // console.log("Component did update", bookings, date)
        if(prevProps.bookings.bookings !== bookings || !this.state.bookings){
            bookings.forEach(booking => {
                // console.log("clg",new Date(booking.timing))
                var bookingDate = new Date(booking.timing)
                // console.log(bookingDate)
                let hour = bookingDate.getHours()
                let idToUpdate = hour - 9
                // console.log("Hour",hour)
                bookingIdsToUpdate.push(idToUpdate)
            });
            console.log("Bookings ids: ",bookingIdsToUpdate)
            let newTimeSlots = this.state.timeSlots.map(slot => {
                if(bookingIdsToUpdate.includes(slot.id)){
                    // console.log("Updated slot", slot)
                    return {...slot, available: false}
                }
                return {...slot, available: true}
            })
            console.table(newTimeSlots)
            this.setState({ timeSlots: newTimeSlots, bookings})
        }
    }

    // onSlotClick = () => {
    //     this.setState({ confirmModal: !this.state.confirmModal })
    // }

    onModalToggle = (slot) => {
        if(!this.props.auth.isAuthenticated){
            this.setState({ msg: "You need to login in order to book a slot"})
            return;
        }
        this.setState({ confirmModal: !this.state.confirmModal, selectedSlot: slot })
        console.log(slot)
    }

    render(){
        const { classes } = this.props
        // console.table(this.state.timeSlots)

        return (    
            <div>
                <Card className={classes.root} raised >
                    <Grid container spacing={2}>
                        {this.state.timeSlots.map(slot => (
                        <Grid item xs={6} sm={4} key={slot.id} >
                            <Button variant="outlined" color="primary" size="small" disabled={!slot.available} onClick={() => this.onModalToggle(slot)}  >
                                {slot.timing}
                            </Button>
                        </Grid>
                        ))}
                        <ConfirmTurfBooking isOpen={this.state.confirmModal} onToggle={this.onModalToggle} turf={this.props.turf} slot={this.state.selectedSlot} date={this.props.bookings.date} />
                    </Grid>
                </Card>
                {this.state.msg && <Alert color="danger" >{this.state.msg}</Alert>}
            </div>
        )
   }
}

const mapStateToProps = (state) => ({
    auth: state.auth
  })
  

export default withStyles(styles)(connect(mapStateToProps,null)(Slots))
