import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

export default function ClearFormDialog({ open, weekName, onClose, onConfirm }) {
  const shortName = weekName.split(' – ')[0].trim()
  const [confirmText, setConfirmText] = React.useState('')
  const isConfirmed = confirmText.trim().toLowerCase() === shortName.toLowerCase()

  const handleClose = () => {
    setConfirmText('')
    onClose()
  }

  const handleConfirm = () => {
    if (!isConfirmed) return
    setConfirmText('')
    onConfirm()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Clear form</DialogTitle>
      <DialogContent>
        <p style={{ marginBottom: 12 }}>
          Type <strong>{shortName}</strong> to clear all saved data for this week.
        </p>
        <TextField
          autoFocus
          size='small'
          fullWidth
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleConfirm()
          }}
          placeholder={shortName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} disabled={!isConfirmed} color='error' variant='contained'>
          Clear
        </Button>
      </DialogActions>
    </Dialog>
  )
}
