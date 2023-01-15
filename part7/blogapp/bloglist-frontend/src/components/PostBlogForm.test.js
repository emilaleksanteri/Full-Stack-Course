import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PostBlogForm from './PostBlogForm'

test('<PostBlogForm /> right info gets sent to props when submitted', async () => {
  const postBlog = jest.fn()
  const user = userEvent.setup()

  render(<PostBlogForm postBlog={postBlog} />)

  const title = screen.getByPlaceholderText('title') // title input
  const author = screen.getByPlaceholderText('author') // author input
  const url = screen.getByPlaceholderText('url') // url input
  const submitBlog = screen.getByText('create') // submit form

  // actions on form done, input fields, submit
  await user.type(title, 'Test title')
  await user.type(author, 'Test author')
  await user.type(url, 'Test url')
  await user.click(submitBlog)

  expect(postBlog.mock.calls).toHaveLength(1)
  expect(postBlog.mock.calls[0][0].title).toBe('Test title')
  expect(postBlog.mock.calls[0][0].author).toBe('Test author')
  expect(postBlog.mock.calls[0][0].url).toBe('Test url')
})
