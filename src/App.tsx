import "./App.css";

type PostProps = {
  post: {
    id: string;
    text: string;
  };
};

const Post = ({ post }: PostProps) => (
  <div key={post.id} className="bg-white rounded-md mt-4">
    <p className="text-dark-body px-2 py-1 text-sm m-0">{post.text}</p>
  </div>
);

function App() {
  return (
    <>
      <div className="container sm mx-auto">
        <div className="flex flex-col h-screen">
          <header className="h-16 bg-header p-4">
            <h2 className="text-dark-body text-lg">Posts</h2>
          </header>
          <main className="flex-grow overflow-auto flex-col-reverse bg-body">
            <div className="px-4 py-4">
              <div>
                <Post post={{ id: "1", text: "Hello" }} />
              </div>
              <div>
                <Post post={{ id: "2", text: "World" }} />
              </div>
            </div>
          </main>
          <footer className="h-40 bg-header">
            <div className="px-2 py-4 flex flex-col gap-2">
              <div>
                <button
                  className="bg-white text-dark-body text-sm px-4 py-2 border-light-body border-2 border-solid rounded-xl"
                  onClick={() => {
                    console.log("Clicked");
                  }}
                >
                  Click me
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
