import React from 'react'
import Button from '@material-ui/core/Button'
import { logout } from '../../actions/authActions'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"

function Logout({logout, history}) {
    const onClick = () => {
        logout()
        history.push('/')
    }

    return (
        <div>
            <Button color="inherit" onClick={onClick} >
                Logout
             </Button>
        </div>
    )
}

export default withRouter(connect(null, { logout })(Logout))
