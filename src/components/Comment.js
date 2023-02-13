import IconReply from '../assets/icon-reply.svg';
import IconDelete from '../assets/icon-delete.svg';
import IconEdit from '../assets/icon-edit.svg';
import IconPlus from '../assets/icon-plus.svg';
import IconMinus from '../assets/icon-minus.svg';
import { useState } from 'react';
// import ReplyContainer from './ReplyContainer';
import Reply from './Reply';
import AddComment from './AddComments';

function Comment({ comment, comments, currentuser, updateReplies }) {
  const [replyMode, setReplyMode] = useState(false);
  const [replying, setReplying] = useState(comment.replies);

  const clickHandlerReply = e => {
    e.preventDefault();
    setReplyMode(prevReply => !prevReply);
  };

  const addReply = newReply => {
    const replies = [...comment.replies, newReply];
    updateReplies(replies, comment.id);
    setReplyMode(false);
  };

  return (
    <>
      <div className="comment-container">
        <div className="comment-wrapper">
          <div className="comment-rating">
            <img src={IconPlus} alt="plus-icon" />
            <p className="rating">{comment.score}</p>
            <img src={IconMinus} alt="minus-icon" />
          </div>
          <div className="comment-body">
            <div className="comment-header">
              <img
                className="user-pic"
                src={require(`../assets/avatars/image-${comment.user.username}.png`)}
                alt="avatar"
              />
              <div className="username">{comment.user.username}</div>
              <div className="posted-time">{comment.createdAt}</div>
              <div className="comment-btn">
                <button className="reply-btn" onClick={clickHandlerReply}>
                  <img src={IconReply} alt="reply" className="reply-icon" />
                  <p>Reply</p>
                </button>
              </div>
            </div>
            <div className="comment-context">{comment.content}</div>
          </div>
        </div>
      </div>
      {replyMode && (
        <AddComment
          currentuser={currentuser}
          sendButton={'reply'}
          addComments={addReply}
          replyMode={true}
          comment={comment}
          addReply={addReply}
        />
      )}
      <div className="replies-container">
        {comment.replies !== [] &&
          comment.replies.map(reply => (
            <Reply key={reply.id} replies={reply} />
          ))}
      </div>
    </>
  );
}

export default Comment;
