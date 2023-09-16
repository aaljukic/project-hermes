/* eslint-disable react-refresh/only-export-components */
import withLog from '../../../hoc/withLog';
import { CombinedData } from '../../../utils/types';
import './HermesPostCard.scss'

interface HermesPostCardProps {
  data: CombinedData;
  isDetails?: boolean;
}

const HermesPostCard = ({ data, isDetails = false }: HermesPostCardProps) => {
  return (

    <div className={`post-card ${isDetails ? 'post-card-details-page' : ''}`}>
      <div className="post-card__header">
        <img
          src={data.user.image}
          alt="user avatar"
          className="post-card__header-avatar" />
        <div className="post-card__header-details">
          <div className="post-card__header-details-post-title">{data.post.title}</div>
          <div className="post-card__header-details-user-name">@{data.user.name}</div>
        </div>
      </div>
      <div className="post-card__content">

        <div className={`post-card__content-body ${isDetails ? 'post-card__content-body--full-text' : ''}`}>
          {data.post.body}
        </div>
        {
          !isDetails &&
          <>
            <div className="post-card__content-comment-preview">
              <div className="post-card__content-comment-preview-name">@{data.comments[0]?.email}</div>
              <div className="post-card__content-comment-preview-body">
                <span className='post-card__content-comment-preview-body-text'>{data.comments[0]?.body}</span>
                <a href="#" className="post-card__content-comment-preview-body-read-more">Read more</a>
              </div>
            </div>
            <button className="post-card__content-view-all-comments">
              View all ({data.comments.length}) comments
            </button>
            <div className="post-card__content-comment-preview-cta">
              <input type="text" disabled placeholder="Add a comment...(Not Implemented)" className="post-card__content-comment-preview-cta-input" />
            </div>
          </>
        }

      </div>
    </div>
  )
}

export default withLog(HermesPostCard);