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
