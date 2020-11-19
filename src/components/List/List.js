import React from 'react';
import { Paper, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import Card from '../Card';
import InputCard from '../Input/InputContainer';

const useStyle = makeStyles((theme) => ({
  root: {
    width:'300px',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(1)
  }
}))

export default function List({list}) {
  const classes = useStyle()
  return (
    <div>
      <Paper className={classes.root}>
        <CssBaseline />
        <Title title={list.title}/>
        {list.cards.map((card) => {
          return <Card card={card} key={card.id}/>
        })}
        <InputCard listId={list.id} type='card'/>
      </Paper>
    </div>
  )
}
