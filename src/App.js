import React, { useState } from 'react';
import { DragDropContext } from "react-beautiful-dnd";
import {v4 as uuid} from 'uuid';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import { makeStyles } from '@material-ui/core/styles';
import InputContainer from './components/Input/InputContainer';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: "100vh",
    background: '#316FC2',
    overflowY: 'auto',
  }

}))

function App() {
  const classes = useStyle()
  const [data, setData] = useState(store)

  const addMoreCard = (title, listId) => {
    const newCard = {id: uuid(), title}
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list,
      }
    };

    setData(newState)
  }

  const addMoreList = (title) => {
    const newUuid = uuid()
    const newList = {
      id: newUuid,
      title,
      cards: []
    }
    // console.log()
    const newState = {
      listIds: [...data.listIds, newUuid],
      lists: {...data.lists, [newUuid]: newList}
    }

    setData(newState)
  }

  const onDragEnd = (result) => {
    const {destination, source, draggableId} = result;
    if (!destination) return;

    const sourceList = data.lists[source.droppableId];
    const destinationList = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => (card.id === draggableId)
    )[0]

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggingCard)

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: destinationList,
        }
      }
      setData(newState);
    }
    else{
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard)

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList
        }
      }
      setData(newState);
    }


  }

  return (
    <StoreApi.Provider value={{ addMoreCard, addMoreList }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.root}>
          {data.listIds.map((listId) => {
            const list = data.lists[listId];
            return <List list={list} key={listId}/>
          })}
          <InputContainer type='list'/>
        </div>
      </DragDropContext>
    </StoreApi.Provider>
  );
}

export default App;
