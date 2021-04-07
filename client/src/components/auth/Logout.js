import React from 'react'
import Button from '@material-ui/core/Button'
import { logout } from '../../actions/authActions'
import { connect } from 'react-redux'

function Logout(props) {
    return (
        <div>
            <Button color="inherit" onClick={props.logout} >
                Logout
             </Button>
        </div>
    )
}

export default connect(null, { logout })(Logout)
