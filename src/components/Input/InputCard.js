import React, { useState, useContext } from 'react'
import { Paper, Button, IconButton, InputBase } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear'
import storeApi from '../../utils/storeApi'

const useStyle = makeStyles((theme) => ({
  card: {
    width: '280px',
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

export default function InputCard({setInputOpen, listId, type}) {
  const classes = useStyle()
  const {addMoreCard, addMoreList} = useContext(storeApi)
  const [title, setTitle] = useState('')

  const handleOnChange = (e) => {
    setTitle(e.target.value)
  }

  const handleBtnConfirm = () => {
    if (type === 'card') {
      addMoreCard(title, listId)
    }
    else {
      addMoreList(title)
    }
    setTitle('')
    setInputOpen(false)
  }

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnChange}
            multiline
            fullWidth
            inputProps={{className: classes.input}}
            onBlur={() => setInputOpen(false)}
            placeholder={type === 'card' ? "Enter a title of this card.." : "Enter list title"}
            value={title}
          />
        </Paper>
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
          {type === 'card' ? 'Add Card' : 'Add List'}
        </Button>
        <IconButton onClick={() => setInputOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  )
}
