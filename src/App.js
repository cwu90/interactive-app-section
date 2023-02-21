import { type } from '@testing-library/user-event/dist/type';
import { useState, useEffect } from 'react';
import AddComment from './components/AddComments';
import Comment from './components/Comment';
import CommentsData from './data/CommentsData';
import DeleteModal from './components/DeleteModal';

function App() {
  const [comments, updateComments] = useState(CommentsData[0].comments);
  const [currentuser, setCurrentUser] = useState(CommentsData[0].currentUser);
  console.log(comments);
  //Add Comment and Update
  const addComments = newComment => {
    const updatedComments = [...comments, newComment];
    updateComments(updatedComments);
  };

  //Add Reply and Update
  const updateReplies = (replies, id) => {
    let updatedComments = [...comments];
    comments.forEach(data => {
      if (data.id === id) {
        data.replies = [...replies];
      }
      updateComments(updatedComments);
    });
  };

  const editItems = (id, type, newContent) => {
    let updatedComments = [...comments];

    if (type === 'comment') {
      updatedComments.forEach(comment => {
        if (comment.id === id) {
          comment.content = newContent;
        }
      });
    } else if (type === 'reply') {
      updatedComments.forEach(comment => {
        comment.replies.forEach(reply => {
          if (reply.id === id) {
            reply.content = newContent;
          }
        });
      });
    }
    updateComments(updatedComments);
  };

  //Delete comment and reply
  const deleteItems = (id, type) => {
    let updatedComments = [...comments];

    if (type === 'comment') {
      updatedComments = comments.filter(comment => comment.id !== id);
    } else if (type === 'reply') {
      updatedComments = comments.map(comment => {
        const updatedReplies = comment.replies.filter(reply => reply.id !== id);
        return {
          ...comment,
          replies: updatedReplies,
        };
      });
    }
    updateComments(updatedComments);
  };

  // Update Score
  const updateScore = (score, id, type, method) => {
    let updatedComments = [...comments];

    if (type === 'comment') {
      updatedComments.forEach(data => {
        if (data.id === id) {
          data.score = score;
          data.voted = method === 'upvote' ? true : false;
        }
      });
    } else if (type === 'reply') {
      updatedComments.forEach(comment => {
        comment.replies.forEach(data => {
          if (data.id === id) {
            data.score = score;
            data.voted = method === 'upvote' ? true : false;
          }
        });
      });
    }
    updateComments(updatedComments);
    console.log(comments);
  };

  if (!comments || comments.length === 0) {
    return <p>No Comments Yet</p>;
  }

  return (
    <div className="App">
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          comments={comments}
          currentuser={currentuser}
          updateReplies={updateReplies}
          counter={comment.score}
          type="comment"
          updateScore={updateScore}
          deleteItems={deleteItems}
          editItems={editItems}
        />
      ))}
      <AddComment
        sendButton={'send'}
        addComments={addComments}
        currentuser={currentuser}
      />
    </div>
  );
}

export default App;
