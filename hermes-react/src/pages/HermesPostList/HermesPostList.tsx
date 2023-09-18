/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef } from 'react';
import HermesPostCard from '../../components/ui/HermesPostCard/HermesPostCard'
import HermesSkeletonPostCard from '../../components/ui/HermesSkeleton/HermesSkeletonPostCard/HermesSkeletonPostCard';
import "./HermesPostList.scss";

import { generateRandomAvatar } from '../../utils/randomUserDataGenerator';
import { CombinedData, Post, User } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import withLog from '../../hoc/withLog';

interface HermesPostListProps {
  users: User[];
  searchValue: string;
}

const HermesPostList = ({ users, searchValue }: HermesPostListProps) => {
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [isNextLoading, setIsNextLoading] = useState<boolean>(false);
  const [postList, setPostList] = useState<CombinedData[]>([]);
  const nextPage = useRef<number>(1);
  const limitPerPage = 15;
  const searchValueRef = useRef<string>(searchValue); // using ref because of closure
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const filteredPosts = postList.filter((post) => {
    return post.user.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  useEffect(() => {
    searchValueRef.current = searchValue;
  }, [searchValue]);


  useEffect(() => {
    const layoutElement = document.getElementById('main-layout');
    if (layoutElement) {
      layoutElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (layoutElement) {
        layoutElement.removeEventListener('scroll', handleScroll);
      }
    };

  }, []);

  useEffect(() => {
    fetchPostList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);


  const fetchPostList = async () => {
    // don't fetch new results when filter is active
    if (searchValueRef.current.length > 0) {
      console.warn("Infinity scroll disabled when client side search is active, search on server is not implemented");
      return;
    }

    const currentPage = nextPage.current;

    if (currentPage === 1) {
      setIsInitialLoading(true);
    } else {
      setIsNextLoading(true); 
    }

    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limitPerPage}`);
    const postsData = await postsRes.json();
    const combinedDataPromises = postsData.map(async (postData: Post) => {
      const userId = postData.userId;

      const userData = users.find(user => user.id === userId);
      // Including a comment preview for each post, although it's not strictly necessary.
      // Limitation: The API doesn't provide the number of comments or a single comment preview
      // along with each post. As a result, a separate request to fetch all comments for each
      // post is required.
      const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postData.id}/comments`);
      const commentsData = await commentsRes.json();

      return {
        user: {
          id: userData?.id,
          name: userData?.name,
          image: generateRandomAvatar(),
        },
        post: postData,
        comments: commentsData,
      } as CombinedData;

    });
    const newCombinedData = await Promise.all(combinedDataPromises);

    setPostList((prevPosts) => [...prevPosts, ...newCombinedData]);

    nextPage.current += 1;

    if (currentPage === 1) {
      setIsInitialLoading(false);
    } else {
      setIsNextLoading(false);
    }
  };

  const handleScroll = async () => {
    const layoutElement = document.getElementById('main-layout');
    if (layoutElement) {
      const { scrollTop, clientHeight, scrollHeight } = layoutElement;
      // 300 =  bottom offset, when next fetch will start
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        await fetchPostList();
      }
    }
  };

  return (
    <div className="post-list">
      {isInitialLoading ? (
        Array.from({ length: 5 }).map((_, index) => <HermesSkeletonPostCard key={index} />)
      ) : (
        <>
          {filteredPosts.map((post, index) => {
            return (
              <div onClick={() => handlePostClick(post.post.id)} key={`${index}-${post.post.id}`} >
                <HermesPostCard data={post} />
              </div>
            );
          })}
          {isNextLoading && Array.from({ length: 5 }).map((_, index) => <HermesSkeletonPostCard key={`loading-${index}`} />)}
        </>
      )}
    </div>
  )
}

export default withLog(HermesPostList);