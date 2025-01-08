// pages/Home.jsx
import React, { useEffect, useState, useRef } from "react";
import { usePost } from "../context/PostState";
import PostItem from "../components/Container/PostItem";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { getAllPosts } = usePost();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAllPosts(page);
      if (response?.success) {
        setCurrentPosts(response.data.posts);
        setTotalPage(response.data.totalPages);
      }
    };
    fetchPosts();
  }, []);

  const fetchMorePosts = async () => {
    if (page < totalPage) {
      const response = await getAllPosts(page + 1);
      setPage(page + 1);
      setCurrentPosts(currentPosts.concat(response.data.posts));
    }
  };

  return (
    <div className="container mx-auto mt-8 lg:max-w-[75vw] mb-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Recent Posts
      </h1>
      {isLoading && <Spinner />}
      <InfiniteScroll
        dataLength={page}
        next={fetchMorePosts}
        hasMore={page !== totalPage}
        loader={<Spinner />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {currentPosts &&
            currentPosts.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
      </InfiniteScroll>

      {/* {posts && posts.map((post) => (
          <PostItem 
            key={post._id}
            post={post} 
          />
        ))}
                    </div>
                    </div> */}

      {/* pagination */}
      {/* <div className="flex justify-evenly">
        <button 
          className="bg-slate-600 btn"
          onClick={(e) => setPage(page-1)}
          disabled={page<=1}
        >prev</button>
        <button
        className="bg-slate-600 btn"
        onClick={(e) => setPage(page+1)}
        disabled={page>=totalPage}
        >next</button>
      </div> */}
      {/* {isLoading && <p className="text-center text-white mt-4">Loading...</p>}
      {!hasMore && <p className="text-center text-white mt-4">No more posts to show.</p>} */}
    </div>
  );
};

export default Home;
// // pages/Home.jsx
// import React, { useEffect, useState, useRef } from "react";
// import { usePost } from "../context/PostState";
// import PostItem from "../components/Container/PostItem";

// const Home = () => {
//   const { getAllPosts, posts } = usePost();
//   const [page, setPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);

//   const observer = useRef();

//   useEffect( () => {
//     const fetchPosts = async () => {
//       setIsLoading(true);
//       const response = await getAllPosts(page);
//       setIsLoading(false);
//       if (response?.success) {
//         setHasMore(page < response.totalPages);
//       }
//     };

//     if (hasMore) {
//       fetchPosts();
//     }
//     // getAllPosts(page)
//   }, [page]);

//   const lastPostRef = useRef();
//   useEffect(() => {
//     if (isLoading || !hasMore) return;

//     const observerCallback = (entries) => {
//       if (entries[0].isIntersecting) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     };

//     const observerOptions = {
//       root: null,
//       threshold: 1.0,
//     };
//     observer.current = new IntersectionObserver(observerCallback, observerOptions);
//     if (lastPostRef.current) observer.current.observe(lastPostRef.current);

//     return () => {
//       if (lastPostRef.current) observer.current.unobserve(lastPostRef.current);
//     };
//   }, [isLoading, hasMore]);

//   return (
//     <div className="container mx-auto mt-8 lg:max-w-[75vw] mb-10">
//       <h1 className="text-3xl font-bold mb-6 text-center text-white">Recent Posts</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
//         {posts && posts.map((post) => (
//           <PostItem
//             key={post._id}
//             post={post}
//           />
//         ))}
//       </div>

//       {/* pagination */}
//       {/* <div className="flex justify-evenly">
//         <button
//           className="bg-slate-600 btn"
//           onClick={(e) => setPage(page-1)}
//           disabled={page<=1}
//         >prev</button>
//         <button
//         className="bg-slate-600 btn"
//         onClick={(e) => setPage(page+1)}
//         disabled={page>=totalPage}
//         >next</button>
//       </div> */}
//       {isLoading && <p className="text-center text-white mt-4">Loading...</p>}
//       {!hasMore && <p className="text-center text-white mt-4">No more posts to show.</p>}
//     </div>
//   );
// };

// export default Home;

// import React from 'react'

function Spinner() {
  return <div>Loading...</div>;
}

// export {Spinner}
