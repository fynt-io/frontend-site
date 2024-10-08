import { TagPill } from '@/app/components/Clients/Tags/TagPill';
import { screen, render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

// Generated by CodiumAI

describe('TagPill', () => {
  // Renders a tag pill with the given tag name
  it('should render a tag pill with the given tag name', () => {
    // Arrange
    const tagName = 'test';

    // Act
    render(<TagPill tagName={tagName} />);

    // Assert
    expect(screen.getByText(tagName)).toBeInTheDocument();
  });

  // Renders a tag pill with a tag name "example"
  it('should render a tag pill with the given tag name', () => {
    const tagName = 'example';
    render(<TagPill tagName={tagName} />);

    const tagPill = screen.getByText(tagName);
    expect(tagPill).toBeInTheDocument();
  });

  // Renders a tag pill with a tag name "tag"
  it('should render a tag pill with the given tag name', () => {
    const tagName = 'tag';
    render(<TagPill tagName={tagName} />);

    const tagPill = screen.getByText(tagName);
    expect(tagPill).toBeInTheDocument();
  });

  // Renders a tag pill with a tag name "test"
  it('should render a tag pill with the given tag name', () => {
    const onClick = jest.fn();
    const onClickRemove = jest.fn();
    render(
      <TagPill
        tagName="test"
        onClick={onClick}
        onClickRemove={onClickRemove}
      />,
    );

    const tagPill = screen.getByText('test');
    expect(tagPill).toBeInTheDocument();

    fireEvent.click(tagPill);
    expect(onClick).toHaveBeenCalled();

  });

  // Renders a tag pill with a tag name "123"
  it('should render a tag pill with the given tag name', () => {
    const onClick = jest.fn();
    const onClickRemove = jest.fn();
    render(
      <TagPill
        tagName="123"
        onClick={onClick}
        onClickRemove={onClickRemove}
      />,
    );

    const tagPill = screen.getByText('123');
    expect(tagPill).toBeInTheDocument();

    fireEvent.click(tagPill);
    expect(onClick).toHaveBeenCalled();

  });
});
