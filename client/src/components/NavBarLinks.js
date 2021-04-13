import { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import ViewMyBookingsPage from './pages/ViewMyBookingsPage'
import ViewMyTurfsPage from './pages/ViewMyTurfsPage'
import AddTurfPage from './pages/AddTurfPage'


export const ViewMyTurfs = () => (
    <Fragment>
        <Button color="inherit" >
            View my turfs
        </Button>
    </Fragment>
)
export const AddTurf = () => (
    <Fragment>
        <Button color="inherit" >
            Add Turf
        </Button>
    </Fragment>
)
export const ViewMyBookings = () => (
    <Fragment>
        <Button color="inherit" >
            View my Bookings
        </Button>
    </Fragment>
)