import React from 'react'
import { Paper, Button, IconButton, InputBase } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear'

const useStyle = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
    padding: theme.spacing(1, 1, 1, 0)
  },
  input: {
    margin: theme.spacing(1)
  },
  btnConfirm: {
    background: '#5AAC44',
    color: '#fff',
    "&:hover": {
      background: fade('#5AAC44', 0.25)
    }
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  }

}))

export default function InputCard({setInputOpen}) {
  const classes = useStyle()
  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            multiline
            fullWidth
            inputProps={{className: classes.input}}
            onBlur={() => setInputOpen(false)}
            placeholder="Enter a title of this card.."
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={() => setInputOpen(false)}>Add Card</Button>
        <IconButton>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  )
}
