import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import CreatePostForm from "./components/CreatePostForm";
import { PostItemInterface } from "./interfaces/Post";

export const GET_POSTS = gql`
  query Posts {
    posts(options: { paginate: {limit: 10}, sort: {field: "id"}}) {
      data {
        id
        title
        body
        user {
          id
          name
          email
        }
      }
    }
  }
`;

const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
});

export const PostItem = (post: PostItemInterface) => (
  <div className="bg-white rounded-md px-2 py-1 mt-4">
    <h2>{post?.title}</h2>
    <p className="text-dark-body text-sm m-0">{post?.body}</p>
  </div>
);

export const Main = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  const [showCreateItem, setShowCreateItem] = useState<boolean>(false)
  const [newPostList, setNewPostList] = useState<PostItemInterface[]>([]);

  const onSavePost = (item: PostItemInterface) => {
    setNewPostList([item, ...newPostList]);
    setShowCreateItem(false)
  }

  useEffect(() => {
    if (data?.posts?.data && data.posts.data.length) {
      setNewPostList(data.posts.data)
    }
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col h-screen">
      <header className="h-16 bg-header p-4">
        <h2 className="text-dark-body text-lg">Posts</h2>
      </header>
      <main className="flex-grow overflow-auto flex-col-reverse bg-body">

        <div className="px-4 py-4">
          {newPostList.map((post: PostItemInterface) => (
            <PostItem key={post.id} {...post} />
          ))}

        </div>
      </main>
      <footer className="h-40 bg-header">
        <div className="px-2 py-4 flex flex-col gap-2">
          <div>
            <button
              className="bg-white text-dark-body text-sm px-4 py-2 border-light-body border-2 border-solid rounded-xl"
              onClick={() => {
                setShowCreateItem(true);
              }}
            >
              Create a new post
            </button>
          </div>
          {
            showCreateItem ? <CreatePostForm onSavePost={onSavePost} /> : <></>
          }
          <div>
            <button
              className="bg-white text-dark-body text-sm px-4 py-2 border-light-body border-2 border-solid rounded-xl"
              onClick={() => {
                console.log("Update");
              }}
            >
              Update post
            </button>
          </div>
          <div>
            <button
              className="bg-white text-dark-body text-sm px-4 py-2 border-light-body border-2 border-solid rounded-xl"
              onClick={() => {
                setNewPostList(newPostList.slice(1));
              }}
            >
              Delete post
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="container sm mx-auto">
          <Main />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
