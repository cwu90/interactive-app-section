import IconReply from '../assets/icon-reply.svg';
import IconDelete from '../assets/icon-delete.svg';
import IconEdit from '../assets/icon-edit.svg';
import IconPlus from '../assets/icon-plus.svg';
import IconMinus from '../assets/icon-minus.svg';
import { useState } from 'react';
// import ReplyContainer from './ReplyContainer';
import Reply from './Reply';
import AddComment from './AddComments';
import DeleteModal from './DeleteModal';

function Comment({
  comment,
  currentuser,
  updateReplies,
  counter,
  updateScore,
  type,
  deleteItems,
  deleteComments,
  editItems,
}) {
  const [replyMode, setReplyMode] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [score, setScore] = useState(counter);
  const [voted, setVoted] = useState(counter.voted ?? false);
  const [toDelete, settoDelete] = useState(false);
  const [toedit, setToEdit] = useState(false);

  //Changing the state that controls the Delete Modal
  const toDeleteItem = () => {
    settoDelete(prevsetDelete => !prevsetDelete);
  };

  //Changing the state that controls the Edit Box
  const toEditItem = () => {
    setToEdit(prevsetDelete => !prevsetDelete);
  };

  const editComment = () => {
    console.log(comment.id, content);
    editItems(comment.id, 'comment', content);
    setToEdit(false);
  };

  //To delete comment.
  const commentDelete = (id, type) => {
    const finalType = type !== undefined ? type : 'comment';
    const finalId = id !== undefined ? id : comment.id;
    deleteItems(finalId, finalType, comment.id);
    settoDelete(false);
  };

  //Toggle replyMode stage to display/remove addComment component
  const clickHandlerReply = e => {
    e.preventDefault();
    setReplyMode(prevReply => !prevReply);
  };

  //Pushing newReply object to replies array
  const addReply = newReply => {
    const replies = [...comment.replies, newReply];
    updateReplies(replies, comment.id);
    setReplyMode(false);
  };

  //Adding to score
  const handleAdd = () => {
    if (comment.user.username === currentuser.username) return;
    if (voted === false) {
      let n = score + 1;
      setScore(n);
      updateScore(n, comment.id, type, 'upvote');
      setVoted(true);
    }
  };

  //Substracting to score
  const handleMinus = () => {
    if (comment.user.username === currentuser.username) return;
    if (voted === true) {
      let n = score - 1;
      setScore(n);
      updateScore(n, comment.id, type, 'downvote');
      setVoted(false);
    }
  };

  return (
    <>
      {toDelete === true && (
        <DeleteModal
          toDeleteItem={toDeleteItem}
          deleteItems={deleteItems}
          settoDelete={settoDelete}
          // deleteItem={deleteItem}
          commentDelete={commentDelete}
          deleteComments={deleteComments}
        />
      )}
      <div className="comment-container">
        <div className="comment-wrapper">
          <div className="comment-rating">
            <img src={IconPlus} onClick={handleAdd} alt="plus-icon" />
            <p className="rating">{score}</p>
            <img src={IconMinus} onClick={handleMinus} alt="minus-icon" />
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
              {comment.user.username === currentuser.username && (
                <div className="delete-btn" onClick={toDeleteItem}>
                  <img src={IconDelete} alt="delete" className="delete-icon" />
                  <p>Delete</p>
                </div>
              )}
              {comment.user.username !== currentuser.username && (
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
                {comment.user.username !== currentuser.username && (
                  <button className="reply-btn" onClick={clickHandlerReply}>
                    <img src={IconReply} alt="reply" className="reply-icon" />
                    <p>Reply</p>
                  </button>
                )}
                {comment.user.username === currentuser.username && (
                  <button className="edit-btn" onClick={toEditItem}>
                    <img src={IconEdit} alt="edit" className="edit-icon" />
                    <p>Edit</p>
                  </button>
                )}
              </div>
            </div>
            <div className="comment-context">
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
                    {comment.content}
                  </textarea>
                  <button className="update-btn" onClick={editComment}>
                    Update
                  </button>
                </div>
              ) : (
                <div>{comment.content}</div>
              )}
            </div>
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
            <Reply
              key={reply.id}
              replies={reply}
              counter={reply.score}
              type="reply"
              updateScore={updateScore}
              currentuser={currentuser}
              deleteItems={deleteItems}
              commentDelete={commentDelete}
              comment={comment}
              editItems={editItems}
              addReply={addReply}
              replyMode={replyMode}
              updateReplies={updateReplies}
            />
          ))}
      </div>
    </>
  );
}

export default Comment;
