import React, { useState } from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {v4 as uuid} from 'uuid';
import List from './components/List/List';
import store from './utils/store';
import StoreApi from './utils/storeApi';
import { makeStyles } from '@material-ui/core/styles';
import InputContainer from './components/Input/InputContainer';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const useStyle = makeStyles((theme) => ({
  listContainer: {
    display: 'flex',
    minHeight: "100vh",
    background: '#316FC2',
    overflowY: 'auto',
  }
}))

function App() {
  const classes = useStyle()
  const [jsonData, setJsonData] = useState(store)

  const addMoreCard = (title, listId) => {
    const newCard = {id: uuid(), title}
    const list = jsonData.lists[listId]
    list.cards = [...list.cards, newCard]

    const newState = {
      ...jsonData,
      lists: {
        ...jsonData.lists,
        [listId]: list,
      }
    };

    // setJsonData(newState)
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
      listIds: [...jsonData.listIds, newUuid],
      lists: {...jsonData.lists, [newUuid]: newList}
    }

    setJsonData(newState)
  }

  const onDragEnd = (result) => {
    const {destination, source, draggableId, type} = result;
    if (!destination) return;

    if(type === 'list'){
      const newListIds = jsonData.listIds
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return
    }

    const sourceList = jsonData.lists[source.droppableId];
    const destinationList = jsonData.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter(
      (card) => (card.id === draggableId)
    )[0]

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1)
      destinationList.cards.splice(destination.index, 0, draggingCard)

      const newState = {
        ...jsonData,
        lists: {
          ...jsonData.lists,
          [sourceList.id]: destinationList,
        }
      }
      setJsonData(newState);
    }
    else{
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard)

      const newState = {
        ...jsonData,
        lists: {
          ...jsonData.lists,
          [sourceList.id]: sourceList,
          [destinationList.id]: destinationList
        }
      }
      setJsonData(newState);
    }
  }

  const GET_ISSUES_OF_REPOSITORY = gql`
    {
      repository(owner:"madhusudhanmo", name:"trello-clone-github-issues") {
        issues(last:20) {
          edges {
            node {
              id
              title
              url
              state
              labels(first:5) {
                edges {
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return (
    <Query query={GET_ISSUES_OF_REPOSITORY}>
      {({ data: { repository }, loading }) => {
        if (loading || !repository) {
          return <div>Loading ...</div>;
        }

        const {issues: {edges} } = repository
        const cards = []
        Object.values(repository.issues.edges).forEach(function(value) {
        // console.log(value.node)
          cards.push(value.node)
        });
        // console.log(cards)
        const openlist = jsonData.lists["list-1"]
        const closedlist = jsonData.lists["list-2"]
        openlist.cards = [...openlist.cards, cards.filter((edge) => edge.state === 'OPEN')]
        closedlist.cards = [...closedlist.cards, cards.filter((edge) => edge.state === 'CLOSED')]

        const newState = {
        ...jsonData,
        lists: {
          ...jsonData.lists,
          [openlist.id]: openlist,
          [closedlist.id]: closedlist
        }

      }



        return (
          <StoreApi.Provider value={{ addMoreCard, addMoreList }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="app" type="list" direction="horizontal">
                {(provided) => (
                  <div
                    className={classes.listContainer}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {newState.listIds.map((listId, index) => {
                      const list = newState.lists[listId];
                      return <List list={list} key={listId} index={index} />;
                    })}
                    <InputContainer type="list" />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </StoreApi.Provider>
        )
      }}
    </Query>
  );
}

export default App;
