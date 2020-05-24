import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ITEMS, initState } from "./initData";
import {
  Item,
  Button,
  Container,
  CategoriesContent,
  CategoriesContainer,
  CategoryList,
  Title,
  ResetButton
} from "./styledComponents";
import { reorder, copy, move } from "./utils";
import { Rewards } from "./rewards";

class App extends Component {
  state = initState;

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
          )
        });
        break;
      case "ITEMS":
        this.setState({
          [destination.droppableId]: copy(
            ITEMS,
            this.state[destination.droppableId],
            source,
            destination
          )
        });
        break;
      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };

  render() {
    return (
      <div>
        <Container>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Rewards />
            <CategoriesContainer>
              <Title>Categories</Title>
              <CategoriesContent>
                {Object.keys(this.state).map((list, i) => (
                  <Droppable key={list} droppableId={list}>
                    {(provided, snapshot) => (
                      <CategoryList
                        innerRef={provided.innerRef}
                        isDraggingOver={snapshot.isDraggingOver}
                      >
                        <Title>C{i + 1}</Title>
                        {this.state[list].map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Item
                                innerRef={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                isDragging={snapshot.isDragging}
                                style={provided.draggableProps.style}
                              >
                                {item.content}
                                <Button
                                  onClick={() => {
                                    const newState = { ...this.state };
                                    newState[list].splice(index, 1);
                                    this.setState(newState);
                                  }}
                                >
                                  X
                                </Button>
                              </Item>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </CategoryList>
                    )}
                  </Droppable>
                ))}
              </CategoriesContent>
            </CategoriesContainer>
          </DragDropContext>
        </Container>
        <div>
          <ResetButton
            onClick={() => {
              this.setState(initState);
            }}
          >
            Reset
          </ResetButton>
        </div>
      </div>
    );
  }
}

export default App;
