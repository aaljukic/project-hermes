/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react';
import HermesPostCard from '../../components/ui/HermesPostCard/HermesPostCard'
import { CombinedData, Post, User } from "../../utils/types";
import { useParams } from 'react-router-dom';
import { generateRandomAvatar } from '../../utils/randomUserDataGenerator';
import HermesSkeletonPostCard from '../../components/ui/HermesSkeleton/HermesSkeletonPostCard/HermesSkeletonPostCard';
import "./HermesPostDetails.scss";
import HermesCommentCard from '../../components/ui/HermesCommentCard/HermesCommentCard';
import withLog from '../../hoc/withLog';
interface HermesPostDetailsProps {
  users: User[];
}

const HermesPostDetails = ({ users }: HermesPostDetailsProps) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [postDetails, setPostDetails] = useState<CombinedData | null>(null);

  useEffect(() => {
    fetchPostDetails(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const fetchPostDetails = async (postId: number) => {
    setIsLoading(true);

    const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const postData: Post = await postRes.json();

    const userId = postData.userId;
    const userData = users.find(user => user.id === userId);

    const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const commentsData = await commentsRes.json();

    const combinedData: CombinedData = {
      user: {
        id: userData?.id || 0,
        name: userData?.name || 'Unknown',
        email: userData?.email || "Unknown",
        username: userData?.username || "Unknown",
        image: generateRandomAvatar(),
      },
      post: postData,
      comments: commentsData,
    };

    setPostDetails(combinedData);
    setIsLoading(false);
  };

  return (
    <div className="post-details">
      {isLoading ? (
        <HermesSkeletonPostCard />
      ) : (
        <>
          {postDetails && <HermesPostCard data={postDetails} isDetails={true} />}
          <div className="comments-section">
            <h3 className='comments-section__title'>Comments</h3>
            {postDetails?.comments.map((comment, index) => (
              <HermesCommentCard
                key={index}
                comment={comment}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default withLog(HermesPostDetails);