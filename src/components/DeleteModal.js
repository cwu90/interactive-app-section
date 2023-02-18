import { useState } from 'react';

function DeleteModal({
  toDeleteItem,
  settoDelete,
  commentDelete,
  deleteReply,
}) {
  const cancelDelete = () => {
    toDeleteItem();
  };

  const deleteBtnClick = () => {
    commentDelete();
    // settoDelete(true);
  };

  return (
    <div className="DeleteOverlay">
      <div className="delete-container overlay">
        <div className="delete-context">
          <h1>Delete comment</h1>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className="buttons-wrapper">
            <button className="cancel-btn" onClick={cancelDelete}>
              No, Cancel
            </button>
            <button className="deletebtn" onClick={deleteBtnClick}>
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
