import IconReply from '../assets/icon-reply.svg';
import IconPlus from '../assets/icon-plus.svg';
import IconMinus from '../assets/icon-minus.svg';
import IconDelete from '../assets/icon-delete.svg';
import { useState } from 'react';

function Reply({
  replies,
  counter,
  type,
  updateScore,
  currentuser,
  deleteReplies,
}) {
  const [score, setScore] = useState(counter);
  const [voted, setVoted] = useState(counter.voted ?? false);

  //Delete replies
  const deleteItem = e => {
    console.log(replies.id);
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
              <div className="delete-btn" onClick={deleteItem}>
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
              <button className="reply-btn">
                <img src={IconReply} alt="reply" className="reply-icon" />
                <p>Reply</p>
              </button>
            </div>
          </div>
          <div className="reply-context">
            <p>
              <span className="username-highlight">
                @{replies.user.username + ' '}
              </span>
              {replies.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reply;
