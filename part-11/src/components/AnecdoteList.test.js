import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AnecdoteList } from './AnecdoteList';

const anecdotes = [
  {
    'content': 'If it hurts, do it more often',
    'id': 1,
    'votes': 0
  },
  {
    'content': 'Adding manpower to a late software project makes it later!',
    'id': 2,
    'votes': 1
  }
];

describe('<AnecdoteList />', () => {
  const mockVoteAnecdote = jest.fn();

  const mockShowNotificationWithTimeout = jest.fn();

  beforeEach(() => {
    render(
      <AnecdoteList
        anecdotes={anecdotes}
        voteAnecdote={mockVoteAnecdote}
        showNotificationWithTimeout={mockShowNotificationWithTimeout}
      />
    );
  });

  it('should display anecdotes', () => {
    expect(screen.getByText('If it hurts, do it more often')).toBeVisible();
    expect(screen.getByText('Adding manpower to a late software project makes it later!')).toBeVisible();
  });

  it('should call voteAnecdote with the appropriate id when the vote button is clicked', () => {
    const voteButtons = screen.getAllByRole('button', {
      name: /vote/i
    });

    fireEvent.click(voteButtons[0]);
    expect(mockVoteAnecdote).toHaveBeenLastCalledWith(anecdotes[0].id);

    fireEvent.click(voteButtons[1]);
    expect(mockVoteAnecdote).toHaveBeenLastCalledWith(anecdotes[1].id);
  });
});