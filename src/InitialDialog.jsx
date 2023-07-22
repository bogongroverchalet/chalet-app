import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function InitialDialog() {
  const [confirmed, setConfirmed] = React.useState(window.localStorage.InitialDialogDone)
  const handleClose = () => setConfirmed(window.localStorage.InitialDialogDone = Date.now())

  if(confirmed) return <></>

  return (
    <Dialog open>
      <DialogTitle>Bogong Rover Chalet App</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This app provides information for people visiting the Bogong Rover Chalet.
        </DialogContentText>

        <DialogContentText>
          It <b>does not</b> replace standard safety equipment like maps and compasses, and any information needs to be
          used in conjunction with careful consideration of the current and expected conditions.
        </DialogContentText>

        <DialogContentText>
          Take it easy out there, have fun, and follow the Scouting, Rovering, and Chalet ways ️️️️🙂
        </DialogContentText>

        <DialogContentText>
          <b>P.S. This app should work offline - so it's great for trip planning :-)</b>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='contained'>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  )
}
