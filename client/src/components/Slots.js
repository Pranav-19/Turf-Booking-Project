import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { slots } from './timeSlots'
import ConfirmTurfBooking from './ConfirmTurfBooking'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import axios from 'axios';

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

    timeout = null
    onModalToggle = (slot) => {
        if(!this.props.auth.isAuthenticated){
            this.setState({ msg: "You need to login in order to book a slot"})
            return;
        }
        console.log(slot)
        let date = new Date(this.props.bookings.date)
        let timing =  `${date.toDateString()} ${slot.timing.substring(0,8)}`
        
        if(this.state.confirmModal === false){
            let newTempBooking = {
                timing: timing,
                userId: this.props.auth.user._id
            }
            const config = {
                headers:{
                    "Content-type": "application/json",
                    "x-auth-token": `${this.props.auth.token}`
                }
            }
            axios.post(`/api/temporaryBooking/${this.props.turf._id}`,newTempBooking, config)
            .then(res => {
                console.log(res.data)
                if(res.status === 400){
                    console.log("return")
                    this.setState({ msg: "Slot already booked"})
                    // alert.show(<div style={{ color: 'blue' }}>Some Message</div>)
                    return
                }
            this.setState({ confirmModal: !this.state.confirmModal, selectedSlot: slot }, () => {
                this.timeout = setTimeout(() => { this.onModalToggle(slot)
                    // this.setState({msg: "Timed out"})
                    alert("Timed out")
                    }, 5000 * 12);
            })
            })
            .catch(err => {
                console.log(err)
                // this.setState({ msg: "Slot already booked"})
                alert("Slot already booked")
                // alert.show(<div style={{ color: 'blue' }}>Slot already booked</div>)
                
            })

            // if(shouldReturn){
            //     return
            // }
        }
        else{
            if(this.timeout){
                clearTimeout(this.timeout)
                this.timeout = null
            }
            let deleteTempBooking = {
                timing: timing
            }
            const config = {
                headers:{
                    "Content-type": "application/json",
                    "x-auth-token": `${this.props.auth.token}`
                },
                data: deleteTempBooking
            }
            let shouldReturn = false
            axios.delete(`/api/temporaryBooking/${this.props.turf._id}`, config)
            .then(res => {
                console.log(res.data)

            this.setState({ confirmModal: !this.state.confirmModal, selectedSlot: slot })
            })
            .catch(err => console.log(err))

        }

        // this.setState({ confirmModal: !this.state.confirmModal, selectedSlot: slot })
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
                            <Button variant="outlined" color="primary" size="small" disabled={!slot.available} onClick={() => {
                                this.onModalToggle(slot)
                                // setTimeout(() => { this.onModalToggle(slot)
                                // this.setState({msg: "Timed out"})
                                // // alert("Timed out")
                                // }, 5000);
                                }}  >
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
