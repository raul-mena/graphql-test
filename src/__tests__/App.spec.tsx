// import react-testing methods
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { Main, GET_POSTS } from "./../App";

test("loads and displays header", async () => {
  const mocks: any = [
    {
      request: {
        query: GET_POSTS,
      },
      result: {
        data: {
          posts: {
            data: [],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <Main />
    </MockedProvider>
  );

  expect(await screen.findByText("Posts")).toBeInTheDocument();
  expect(await screen.findByText("Create a new post")).toBeInTheDocument();
  expect(await screen.findByText("Delete post")).toBeInTheDocument();
  expect(await screen.findByText("Update post")).toBeInTheDocument();
});

test("loads and displays post", async () => {
  const mocks: any = [
    {
      request: {
        query: GET_POSTS,
      },
      result: {
        data: {
          posts: {
            data: [{
              title: 'abcd',
              body: 'qwerty',
              id: 'a123'
            }],
          },
        },
      },
    },
  ];

  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <Main />
    </MockedProvider>
  );

  expect(await screen.findByText("abcd")).toBeInTheDocument();
});
