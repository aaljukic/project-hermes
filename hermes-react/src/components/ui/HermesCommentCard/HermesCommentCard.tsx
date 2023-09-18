/* eslint-disable react-refresh/only-export-components */
import withLog from "../../../hoc/withLog";
import { Comment } from "../../../utils/types";
import './HermesCommentCard.scss';

interface HermesCommentProps {
  comment: Comment;
}

const HermesCommentCard = ({ comment }: HermesCommentProps) => {
  return (
    <div className="comment-card">
      <div className="comment-card__header">
        <h4 className="comment-card__header-details-name">{comment.name}</h4>
        <span className="comment-card__header-details-email">@{comment.email}</span>
      </div>
      <div className="comment-card__content">
        <p className="comment-card__content-body">{comment.body}</p>
      </div>
    </div>
  );
}


export default withLog(HermesCommentCard);
