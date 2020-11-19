import React, { useState } from 'react'
import { Typography, InputBase } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
  root: {
    width:'300px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1)
  },
  editableTitle: {
    flexGrow: 1,
    fontSize: '1.2rem',
    fontWeight: 'bold',
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


export default function Title({title}) {
  const [open, setOpen] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const classes = useStyle()

  const onChangeListTitle = (e) => {
    setListTitle(e.target.value)
  }

  return (
    <div>
      {open ? (
        <div>
          <InputBase value={listTitle}
            inputProps={{
              className: classes.input
            }}
            onChange={onChangeListTitle}
            autoFocus
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
            {title}
          </Typography>
          <MoreHorizIcon />
        </div>
        )
      }
    </div>
  )
}
