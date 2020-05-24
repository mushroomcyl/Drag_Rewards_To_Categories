import uuid from "uuid/v4";

export const ITEMS = [
  {
    id: uuid(),
    content: "R1"
  },
  {
    id: uuid(),
    content: "R2"
  },
  {
    id: uuid(),
    content: "R3"
  },
  {
    id: uuid(),
    content: "R4"
  },
  {
    id: uuid(),
    content: "R5"
  }
];

export const initState = {
  [uuid()]: [],
  [uuid()]: [],
  [uuid()]: [],
  [uuid()]: [],
  [uuid()]: []
};
