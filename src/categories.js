import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  Item,
  Button,
  CategoriesContent,
  CategoriesContainer,
  CategoryList,
  Title
} from "./styledComponents";

export const Categories = props => {
  const { state, setState } = props;
  return (
    <CategoriesContainer>
      <Title>Categories</Title>
      <CategoriesContent>
        {Object.keys(state).map((list, i) => (
          <Droppable key={list} droppableId={list}>
            {(provided, snapshot) => (
              <CategoryList
                innerRef={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
              >
                <Title>C{i + 1}</Title>
                {state[list].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
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
                            const newState = { ...state };
                            newState[list].splice(index, 1);
                            setState(newState);
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
  );
};
