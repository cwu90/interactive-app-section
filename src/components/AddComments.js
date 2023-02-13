import { useState } from 'react';

function AddComment({
  addComments,
  currentuser,
  sendButton,
  addReply,
  replyMode,
  comment,
}) {
  const [text, setText] = useState('');

  const clickHandler = e => {
    e.preventDefault();

    //Dates
    const now = new Date();
    const commentDate = new Date();
    const timeDiff = Math.abs(now.getTime() - commentDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let createdAt;
    if (diffDays < 3) {
      createdAt = commentDate.toLocaleString('default', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } else {
      createdAt = `${diffDays} days ago`;
    }

    //Create new Reply
    if (replyMode) {
      const newReply = {
        id: Math.floor(Math.random() * 100) + 5,
        content: text,
        createdAt: createdAt,
        replyingTo: comment.user.username,
        score: 0,
        user: {
          username: 'juliusomo',
        },
        currentUser: true,
      };

      addReply(newReply);
      console.log(newReply);
    } else {
      const newComment = {
        id: Math.floor(Math.random() * 100) + 5,
        content: text,
        createdAt: createdAt,
        replies: [],
        score: 0,
        user: {
          username: currentuser.username,
        },
        currentUser: true,
      };
      //Create new comments
      addComments(newComment);
    }
    // console.log(newComment);
    setText('');
  };

  return (
    <form className="addcomment-container">
      <div className="addcomment-wrapper">
        <img
          src={require(`../assets/avatars/image-${currentuser.username}.png`)}
          alt="avatar"
          className="user-pic current-pic"
        />
        <textarea
          type="text"
          className="input-field"
          placeholder="Add a comment..."
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        ></textarea>
        <button className="add-btn" onClick={clickHandler}>
          {sendButton}
        </button>
      </div>
    </form>
  );
}

export default AddComment;

// APP PAGe
//  // add replies
//  const updateReplies = (replies, id) => {
//   let updatedComments = [...comments];
//   updatedComments.forEach((data) => {
//     if (data.id === id) {
//       data.replies = [...replies];
//     }
//   });
//   updateComments(updatedComments);
// };

// COMMENT {AGe}
// const addReply = (newReply) => {
//   const replies = [...commentData.replies, newReply];
//   updateReplies(replies, commentData.id);
//   setReplying(false);
// };

// REPLY PAGE
//   // adding reply
//   const addReply = (newReply) => {
//     addNewReply(newReply);
//     setReplying(false);
//   };
