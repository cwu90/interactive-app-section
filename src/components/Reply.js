import IconReply from '../assets/icon-reply.svg';
import IconPlus from '../assets/icon-plus.svg';
import IconMinus from '../assets/icon-minus.svg';
import testAvatar from '../assets/avatars/image-amyrobson.png';
import { useState } from 'react';

function Reply({ replies }) {
  return (
    <div className="reply-container">
      <hr className="reply-line" />
      <div className="reply-wrapper">
        <div className="reply-rating">
          <img src={IconPlus} alt="plus-icon" />
          <p className="rating">{replies.score}</p>
          <img src={IconMinus} alt="minus-icon" />
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
