import React from "react";

import { Droppable, Draggable } from "react-beautiful-dnd";
import { ITEMS } from "./initData";
import {
  Item,
  Clone,
  RewardsContainer,
  RewardsList,
  Title,
  TitleR
} from "./styledComponents";

export const Rewards = () => {
  return (
    <RewardsContainer>
      <Title>Rewards</Title>
      <Droppable droppableId="ITEMS" isDropDisabled={true}>
        {(provided, snapshot) => (
          <RewardsList
            innerRef={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <TitleR>R</TitleR>
            {ITEMS.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <React.Fragment>
                    <Item
                      innerRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      style={provided.draggableProps.style}
                    >
                      {item.content}
                    </Item>
                    {snapshot.isDragging && <Clone>{item.content}</Clone>}
                  </React.Fragment>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </RewardsList>
        )}
      </Droppable>
    </RewardsContainer>
  );
};
