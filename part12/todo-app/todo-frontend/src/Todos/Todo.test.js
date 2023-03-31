import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Todo from './Todo'

describe('Todo component', () => {
  const todoNotDone = {
    text: 'Learn regular expressions',
    done: false
  }
  const todoDone = {
    text: 'Learn the alphabet',
    done: true
  }

  const mockDelete = jest.fn()
  const mockComplete = jest.fn()

  beforeEach(() => {
    mockDelete.mockReset()
    mockComplete.mockReset()
  })

  test('when not done: shows text, status and both buttons', () => {
    const todo = todoNotDone
    render(<Todo todo={todo} onClickDelete={mockDelete} onClickComplete={mockComplete} />)

    expect(screen.getByText(todo.text)).toBeInTheDocument()
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByText('Set as done')).toBeInTheDocument()
  })

  test('when done: shows text, status and only delete button', () => {
    const todo = todoDone
    render(<Todo todo={todo} onClickDelete={mockDelete} onClickComplete={mockComplete} />)

    expect(screen.getByText(todo.text)).toBeInTheDocument()
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()

    const completeButton = screen.queryByText('Set as done')
    expect(completeButton).toBeNull()
  })

  test('calls functions with todo param when clicked', () => {
    const todo = todoNotDone
    render(<Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />)

    expect(mockDelete).toHaveBeenCalledTimes(0)
    expect(mockComplete).toHaveBeenCalledTimes(0)

    const deleteButton = screen.getByText('Delete')
    const completeButton = screen.getByText('Set as done')

    userEvent.click(deleteButton)
    userEvent.click(completeButton)

    expect(mockDelete).toHaveBeenCalledTimes(1)
    expect(mockDelete).toHaveBeenCalledWith(todo)

    expect(mockComplete).toHaveBeenCalledTimes(1)
    expect(mockComplete).toHaveBeenCalledWith(todo)
  })
})