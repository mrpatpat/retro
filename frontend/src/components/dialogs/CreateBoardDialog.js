import React from "react";
import uniqid from "uniqid";
import AddIcon from "@material-ui/icons/Add";
import { compose } from "recompose";
import { Redirect } from "react-router-dom";
import {
  Button,
  Fab,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  withMobileDialog,
  withStyles
} from "@material-ui/core";

import { socket_connect } from "../../utils";
import { CREATE_BOARD } from "../../events/event-names";
import { emptyBoard } from "../../utils";

class CreateBoardDialog extends React.Component {
  state = {
    open: false,
    title: "",
    boardId: ""
  };

  handleOpen = () => this.setState({ open: true });

  handleClose = () => this.setState({ open: false, title: "", boardId: "" });

  handleChange = e => this.setState({ title: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    const { title } = this.state;
    const boardId = uniqid("board-");
    const socket = socket_connect(boardId);
    const isBlurred = true;
    const newBoard = { ...emptyBoard, boardId, title, isBlurred };

    socket.emit(CREATE_BOARD, newBoard, boardId);
    this.setState({ title: "", open: false, boardId });
  };

  renderTitleEmptyError(isEmpty) {
    if (isEmpty) {
      return (
        <Typography variant="caption" color="error">
          Name of the board cannot be empty.
        </Typography>
      );
    }

    return null;
  }

  renderTitleLongError(isLong) {
    if (isLong) {
      return (
        <Typography variant="caption" color="error">
          Name of the board is too long.
        </Typography>
      );
    }

    return null;
  }

  render() {
    const { open, title, boardId } = this.state;
    const { classes, fullScreen } = this.props;
    const isBoardTitleEmpty = title.length <= 0;
    const isBoardTitleLong = title.length > 30;
    const isValidBoardTitle = !isBoardTitleEmpty && !isBoardTitleLong;

    if (boardId) {
      return <Redirect to={`/boards/${boardId}`} />;
    }

    return (
      <>
        <Fab
          size="medium"
          variant="extended"
          color="primary"
          onClick={this.handleOpen}
          className={classes.button}
          data-testid="new-board-btn"
        >
          <AddIcon className={classes.icon} />
          New Board
        </Fab>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New Board</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please provide a name for your new board.
            </DialogContentText>
            <TextField
              required
              error={!isValidBoardTitle}
              autoFocus
              margin="dense"
              id="board-name"
              label="Board Name"
              type="text"
              value={title}
              onChange={this.handleChange}
              fullWidth
              autoComplete="off"
            />
            {this.renderTitleEmptyError(isBoardTitleEmpty)}
            {this.renderTitleLongError(isBoardTitleLong)}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              color="primary"
              disabled={!isValidBoardTitle}
            >
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  icon: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

export default compose(
  withMobileDialog(),
  withStyles(styles)
)(CreateBoardDialog);
