const {
  createBoard,
  updateBoard,
  joinBoard,
  unblurCards
} = require("./board-events");
const {
  createColumn,
  deleteColumn,
  sortColumn,
  editColumn
} = require("./column-events");
const {
  createCard,
  editCard,
  deleteCard,
  upvoteCard
} = require("./card-events");

const boardEvents = (io, client, roomId) => {
  createBoard(io, client, roomId);
  updateBoard(io, client, roomId);
  joinBoard(io, client, roomId);
  unblurCards(io, client, roomId);
};

const columnEvents = (io, client, roomId) => {
  createColumn(io, client, roomId);
  deleteColumn(io, client, roomId);
  sortColumn(io, client, roomId);
  editColumn(io, client, roomId);
};

const cardEvents = (io, client, roomId) => {
  createCard(io, client, roomId);
  editCard(io, client, roomId);
  deleteCard(io, client, roomId);
  upvoteCard(io, client, roomId);
};

module.exports = {
  boardEvents,
  columnEvents,
  cardEvents
};
