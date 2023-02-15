import { type } from '@testing-library/user-event/dist/type';
import { useState, useEffect } from 'react';
import AddComment from './components/AddComments';
import Comment from './components/Comment';
import CommentsData from './data/CommentsData';

function App() {
  const [comments, updateComments] = useState(CommentsData[0].comments);
  const [currentuser, setCurrentUser] = useState(CommentsData[0].currentUser);

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
