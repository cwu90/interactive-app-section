import Reply from './Reply';

function ReplyContainer({ comments }) {
  return (
    <div className="reply-container">
      {comments.map(replies => (
        <Reply replies={replies} />
      ))}
    </div>
  );
}

export default ReplyContainer;

APP File 
// update score
const updateScore = (score, id, type, method) => {
  let updatedComments = [...comments];

  if (type === "comment") {
    updatedComments.forEach((data) => {
      if (data.id === id) {
        data.score = score;
        data.voted = method === "upvote" ? true : false;
      }
    });
  } else if (type === "reply") {
    updatedComments.forEach((comment) => {
      comment.replies.forEach((data) => {
        if (data.id === id) {
          data.score = score;
          data.voted = method === "upvote" ? true : false;
        }
      });
    });
  }
  updateComments(updatedComments);
};



//Part within comments 
const CommentVotes = ({ updateScore, commentData, type }) => {
  const [score, setScore] = useState(commentData.score);
  const [voted, setVoted] = useState(commentData.voted ?? false);
  let upVote = () => {
    if (commentData.currentUser) return;
    if (voted === false) {
      let n = score + 1;
      setScore(n);
      updateScore(n, commentData.id, type, "upvote");
      setVoted(true);
    }
  };

  let downVote = () => {
    if (commentData.currentUser) return;
    if (voted === true) {
      let n = score - 1;
      setScore(n);
      updateScore(n, commentData.id, type, "downvote");
      setVoted(false);
    }
  };
