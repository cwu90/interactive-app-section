import { useState, useEffect } from 'react';
import AddComment from './components/AddComments';
import Comment from './components/Comment';
import CommentsData from './data/CommentsData';

function App() {
  const [comments, updateComments] = useState(CommentsData[0].comments);
  const [currentuser, setCurrentUser] = useState(CommentsData[0].currentUser);

  const addComments = newComment => {
    const updatedComments = [...comments, newComment];
    updateComments(updatedComments);
  };

  const updateReplies = (replies, id) => {
    let updatedComments = [...comments];
    comments.forEach(data => {
      if (data.id === id) {
        data.replies = [...replies];
      }
      updateComments(updatedComments);
    });
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
