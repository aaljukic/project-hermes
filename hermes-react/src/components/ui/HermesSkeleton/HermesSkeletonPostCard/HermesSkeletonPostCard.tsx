/* eslint-disable react-refresh/only-export-components */
import withLog from '../../../../hoc/withLog';
import HermesSkeletonAvatar from '../HermesSkeletonAvatar/HermesSkeletonAvatar';
import HermesSkeletonText from '../HermesSkeletonText/HermesSkeletonText';
import './HermesSkeletonPostCard.scss'

const HermesSkeletonPostCard = () => {
  return (
    <div className="post-card-skeleton">
      <div className="post-card-skeleton__header">
        <HermesSkeletonAvatar />
        <div className="post-card-skeleton__header-details">
          <HermesSkeletonText width="80px" height="16px" />
          <HermesSkeletonText width="50px" height="12px" />
        </div>
      </div>
      <div className="post-card-skeleton__content">
        <div className="post-card-skeleton__content-body">
          <HermesSkeletonText width="100%" height="140px" />
          <HermesSkeletonText width="90%" height="24px" />
          <div className="spacer"></div>
          <HermesSkeletonText width="80px" height="20px" />
          <HermesSkeletonText width="90%" height="36px" />
        </div>
      </div>
    </div>
  );
};

export default withLog(HermesSkeletonPostCard);