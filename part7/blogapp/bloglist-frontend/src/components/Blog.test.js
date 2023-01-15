import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  // setup for props
  const blog = {
    title: 'Testing Blogs',
    author: 'Blog author',
    url: 'nourl',
    likes: 1,
    user: {
      username: 'username',
    },
  }

  const user = {
    username: 'username',
  }

  const likePost = jest.fn()
  const removeBlog = jest.fn()

  let container // var to store Component

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        likePost={likePost}
        user={user}
        removeBlog={removeBlog}
      />
    ).container
  })

  test('default render title and author', async () => {
    const div = container.querySelector('.expanded')
    expect(div).toHaveStyle('display: none') // does not show url, likes etc.. as CSS is set to display none

    await screen.findAllByText('Testing Blogs | Blog author') // check they exist in the form they are supposed to be
  })

  test('when view clicked -> show rest of info', async () => {
    const user = userEvent.setup()
    const btn = screen.getByText('view')

    await user.click(btn)

    const div = container.querySelector('.expanded')
    expect(div).not.toHaveStyle('display: none')
  })

  test('like btn clicked twice -> likePost function gets 2 calls', async () => {
    // can click btn without clicking view, content technically is on the page already, just not shown
    const user = userEvent.setup()

    for (let count = 0; count < 2; count++) {
      // click like twice
      const btnLike = screen.getByText('like')
      await user.click(btnLike)
    }

    expect(likePost.mock.calls).toHaveLength(2)
  })
})
