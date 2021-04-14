import { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import ViewMyBookingsPage from './pages/ViewMyBookingsPage'
import ViewMyTurfsPage from './pages/ViewMyTurfsPage'
import AddTurfPage from './pages/AddTurfPage'


export const ViewMyTurfs = ({onClick}) => (
    <Fragment>
        <Button color="inherit" onClick={onClick} >
            View my turfs
        </Button>
    </Fragment>
)
export const AddTurf = ({onClick}) => (
    <Fragment>
        <Button color="inherit" onClick={onClick} >
            Add Turf
        </Button>
    </Fragment>
)
export const ViewMyBookings = ({onClick}) => (
    <Fragment>
        <Button color="inherit" onClick={onClick} >
            View my Bookings
        </Button>
    </Fragment>
)