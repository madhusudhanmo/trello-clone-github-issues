import React, {useState} from 'react'
import { Typography, InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
  root: {
    width:'300px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1)
  },
  editableTitle: {
    flexGrow: 1,
    marginTop: '8px',
  },
  editableTitleContainer: {
    marginLeft: theme.spacing(1),
    display: 'flex',
  },
  options: {
    fontSize: 30,
  },
  input: {
    margin: theme.spacing(1),
    "&:focus": {
      background: '#ddd',
    }
  }
}))


export default function Title() {
  const [open, setOpen] = useState(false);
  const classes = useStyle()

  return (
    <div>
      {open ? (
        <div>
          <InputBase value='todo'
            inputProps={{
              className: classes.input
            }}
            fullWidth
            onBlur = {() => setOpen(!open)}
          />
        </div>
      ) : (
        <div className={classes.editableTitleContainer}>
          <Typography
            onClick = {() => setOpen(!open)}
            className = {classes.editableTitle}
            >
            Todo
          </Typography>
          <div className={classes.options}>&middot;&middot;&middot;</div>
        </div>
        )
      }
    </div>
  )
}
