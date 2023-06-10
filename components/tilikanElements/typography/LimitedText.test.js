import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import LimitedText from "./LimitedText";

// number of char in mockText: 228
const mockText =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus animi, nam autem, delectus similique voluptatibus eum et, perspiciatis provident incidunt aut! Quia asperiores eveniet culpa ullam unde alias dolore corrupti.";
describe("LimitedText component", () => {
  it("should not have unexpected changes", () => {
    const tree = renderer.create(<LimitedText text={mockText} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should render elipsis styles if text is longer than the char limit", () => {
    render(<LimitedText text={mockText} />);
    const textElement = screen.getByText(mockText);

    expect(textElement).toHaveClass("ant-typography-ellipsis");
  });

  it("should not render elipsis styles if text not longer than the char limit", () => {
    render(<LimitedText text={mockText} charLimit={mockText.length + 1} />);

    const textElement = screen.getByText(mockText);
    expect(textElement).not.toHaveClass("ant-typography-ellipsis");
  });
});
