const fs = require("fs");
const { getPath, getBoard, stringify, logError } = require("../utils/utils");
const {
  CREATE_CARD,
  EDIT_CARD,
  DELETE_CARD,
  UPVOTE_CARD,
  UPDATE_BOARD
} = require("./event-names");

const createCard = (io, client) => {
  client.on(CREATE_CARD, async (card, columnId, boardId) => {
    const path = getPath(boardId);
    await fs.readFile(path, "utf8", async (error, file) => {
      if (error) logError(CREATE_CARD, error);

      const board = getBoard(file);
      board.items[card.id] = card;
      board.columns[columnId].itemIds.push(card.id);

      await fs.writeFile(path, stringify(board), "utf8", error => {
        if (error) logError(CREATE_CARD, error);
        
        io.sockets.emit(UPDATE_BOARD, board);
      });
    });
  });
};

const deleteCard = (io, client) => {
  client.on(DELETE_CARD, cardId => {
    io.sockets.emit(DELETE_CARD, cardId);
  });
};

const editCard = (io, client) => {
  client.on(EDIT_CARD, (author, content, id) => {
    io.sockets.emit(EDIT_CARD, author, content, id);
  });
};

const upvoteCard = (io, client) => {
  client.on(UPVOTE_CARD, cardId => {
    io.sockets.emit(UPVOTE_CARD, cardId);
  });
};

module.exports = {
  createCard,
  editCard,
  deleteCard,
  upvoteCard
};
