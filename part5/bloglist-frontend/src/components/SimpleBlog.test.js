import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";
import { render, waitForElement  } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";
import Togglable from "./Togglable";
//jest.mock('../services/blogs')
import App from '../App'



test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Author",
    likes: 8
  };

  const component = render(<SimpleBlog blog={blog} />);

  expect(component.container).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );
  expect(component.container).toHaveTextContent("Author");
  expect(component.container).toHaveTextContent(8);
});

test("clicking the button calls event handler twice", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Author",
    likes: 8
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});

describe("<Togglable />", () => {
  const mockHandler = jest.fn();

  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Author",
    likes: 8
  };
     beforeEach(() => {
      component = render(
        <Togglable buttonLabel="show...">
        <SimpleBlog blog={blog} onClick={mockHandler}/>
        </Togglable>
      )
    })

 /*  const component = render(
    <Togglable buttonLabel="show...">
      <SimpleBlog blog={blog} onClick={mockHandler} />
    </Togglable>
  ); */

  test("at start the children are not displayed", () => {
    const div = component.container.querySelector(".togglableContent");

    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", () => {
    const button = component.getByText("show...");
    fireEvent.click(button);

    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});

describe('<App />', () => {
    test('if no user logged, blogs are not rendered', async () => {
      const component = render(
        <App />
      )
      component.rerender(<App />)
  
      await waitForElement(
        () => component.getByText('login')
      ) 
  
      expect(component.container).not.toHaveTextContent("This is a test")
    })
  })


