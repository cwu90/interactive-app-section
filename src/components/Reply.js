import IconReply from '../assets/icon-reply.svg';
import IconPlus from '../assets/icon-plus.svg';
import IconMinus from '../assets/icon-minus.svg';
import IconDelete from '../assets/icon-delete.svg';
import IconEdit from '../assets/icon-edit.svg';
import { useState } from 'react';
import DeleteModal from './DeleteModal';

function Reply({
  replies,
  counter,
  type,
  updateScore,
  currentuser,
  comment,
  deleteItem,
  commentDelete,
  editItems,
}) {
  const [score, setScore] = useState(counter);
  const [content, setContent] = useState(replies.content);
  const [voted, setVoted] = useState(counter.voted ?? false);
  const [toDelete, settoDelete] = useState(false);
  const [toedit, setToEdit] = useState(false);

  //Changing the state that controls the Edit Box
  const toEditItem = () => {
    setToEdit(prevsetDelete => !prevsetDelete);
  };

  const toDeleteItem = () => {
    settoDelete(prevsetDelete => !prevsetDelete);
  };

  const deleteReply = () => {
    commentDelete(replies.id, 'reply');
    toDeleteItem(false);
  };

  const editReplies = () => {
    editItems(replies.id, 'reply', content);
    setToEdit(false);
  };

  //Separate addition function for replies
  const handleAdd = () => {
    if (replies.user.username === currentuser.username) return;
    if (voted === false) {
      let n = score + 1;
      setScore(n);
      updateScore(n, replies.id, type, 'upvote');
      setVoted(true);
    }
  };
  //Separate subtraction function for replies
  const handleMinus = () => {
    if (replies.user.username === currentuser.username) return;
    if (voted === true) {
      let n = score - 1;
      setScore(n);
      updateScore(n, replies.id, type, 'downvote');
      setVoted(false);
    }
  };

  return (
    <div className="reply-container">
      {toDelete === true && (
        <DeleteModal
          // toDeleteItem={toDeleteItem}
          commentDelete={deleteReply}
          settoDelete={settoDelete}
          deleteItem={deleteItem}
        />
      )}
      <hr className="reply-line" />
      <div className="reply-wrapper">
        <div className="reply-rating">
          <img src={IconPlus} onClick={handleAdd} alt="plus-icon" />
          <p className="rating">{score}</p>
          <img src={IconMinus} onClick={handleMinus} alt="minus-icon" />
        </div>
        <div className="reply-body">
          <div className="reply-header">
            <img
              src={require(`../assets/avatars/image-${replies.user.username}.png`)}
              alt="avatar"
              className="user-pic"
            />
            <div className="username">{replies.user.username}</div>
            <div className="posted-time">{replies.createdAt}</div>
            {replies.user.username === currentuser.username && (
              <div className="delete-btn" onClick={toDeleteItem}>
                <img src={IconDelete} alt="delete" className="delete-icon" />
                <p>Delete</p>
              </div>
            )}
            {replies.user.username !== currentuser.username && (
              <div className="delete-btn-hidden">
                <img
                  src={IconDelete}
                  alt="delete-hidden"
                  className="delete-icon"
                />
                <p>Delete</p>
              </div>
            )}

            <div className="comment-btn">
              {replies.user.username !== currentuser.username && (
                <button className="reply-btn">
                  <img src={IconReply} alt="reply" className="reply-icon" />
                  <p>Reply</p>
                </button>
              )}
              {replies.user.username === currentuser.username && (
                <button className="edit-btn" onClick={toEditItem}>
                  <img src={IconEdit} alt="edit" className="edit-icon" />
                  <p>Edit</p>
                </button>
              )}
            </div>
          </div>
          <div className="reply-context">
            {toedit === true ? (
              <div className="edit-field">
                <textarea
                  type="text"
                  className="input-field-comment"
                  placeholder="Add a comment..."
                  onChange={e => {
                    setContent(e.target.value);
                  }}
                  value={content}
                >
                  {replies.content}
                </textarea>
                <button className="update-btn" onClick={editReplies}>
                  Update
                </button>
              </div>
            ) : (
              <div>
                <span className="username-highlight">
                  @{replies.user.username + ' '}
                </span>
                {replies.content}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reply;
