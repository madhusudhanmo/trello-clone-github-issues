import React from 'react';
import { Droppable } from "react-beautiful-dnd";
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
  },
  cardContainer: {
    marginTop: theme.spacing(4)
  }
}))

export default function List({list}) {
  const classes = useStyle()
  return (
    <div>
      <Paper className={classes.root}>
        <CssBaseline />
        <Title title={list.title}/>
        <Droppable droppableId={list.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className={classes.cardContainer}>
              {list.cards.map((card, index) => {
                return <Card card={card} key={card.id} index={index}/>
              })}
              {provided.placeholder}
            </div>
          )}

        </Droppable>
        <InputCard listId={list.id} type='card'/>
      </Paper>
    </div>
  )
}
