import { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import AddTurfPage from './pages/AddTurfPage'

export const ViewMyTurfs = ({onClick}) => (
    <Fragment>
        <Button color="inherit" onClick={onClick} >
            View my turfs
        </Button>
    </Fragment>
)
export const AddTurf = () => (
    <Fragment>
        {/* <Button color="inherit" onClick={} >
            Add Turf
        </Button> */}
        <AddTurfPage />
    </Fragment>
)
export const ViewMyBookings = ({onClick}) => (
    <Fragment>
        <Button color="inherit" onClick={onClick} >
            View my Bookings
        </Button>
    </Fragment>
)