import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import commentService from '../services/comments'
import { dispatchNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    pushBlog(state, action) {
      state.push(action.payload)
    },
    updateLike(state, action) {
      // reducer done this way, username dissapears if blog updated from dispatch of likedBlog directly
      const id = action.payload.id
      const likedBlog = state.find((blog) => blog.id === id)
      const likedBlogCopy = { ...likedBlog }
      const updatedLikes = {
        ...likedBlogCopy,
        likes: (likedBlogCopy.likes += 1),
      }
      state = state.map((blog) => (blog.id !== id ? blog : updatedLikes))
      return state
    },
    deleteBlog(state, action) {
      const id = action.payload.id
      state = state.filter((blog) => blog.id !== id)
      return state
    },
    addComment(state, action) {
      const id = action.payload.blog
      const addCommentToThis = state.find((blog) => blog.id === id)
      const commentOn = { ...addCommentToThis } // copy of state
      commentOn.comments = commentOn.comments.concat(action.payload) // added new comment
      state = state.map((blog) => (blog.id !== id ? blog : commentOn))
      return state
    },
  },
})

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const postBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.post(blogObject)
      dispatch(pushBlog(newBlog))
      dispatch(
        dispatchNotification(
          {
            notification: `${blogObject.title} added`,
            type: 'success',
          },
          5
        )
      )
    } catch (error) {
      dispatch(
        dispatchNotification(
          {
            notification: 'Missing fields or invalid token',
            type: 'error',
          },
          5
        )
      )
    }
  }
}

export const likeBlog = (blogToLike) => {
  return async (dispatch) => {
    const likedBlog = { ...blogToLike } // copy of object so no error
    const blogToUpdate = { ...likedBlog, likes: (likedBlog.likes += 1) }
    const id = blogToUpdate.id
    const toUpdate = await blogService.update(blogToUpdate, id)
    dispatch(updateLike(toUpdate))
  }
}

export const removeBlog = (blogToRemove) => {
  return async (dispatch) => {
    await blogService.remove(blogToRemove.id)
    dispatch(deleteBlog(blogToRemove))
  }
}

// notification handled for actions that can lead to errr inside the thunk dispatch
// gets rid of a bug
export const commentBlog = (comment, id) => {
  return async (dispatch) => {
    try {
      const postedComment = await commentService.postComment(comment, id)
      const commentObject = { comment: comment, blog: id, id: postedComment.id } // get representative id from promise
      dispatch(addComment(commentObject))
      dispatch(
        dispatchNotification(
          {
            notification: 'comment added',
            type: 'success',
          },
          5
        )
      )
    } catch (error) {
      dispatch(
        dispatchNotification(
          {
            notification: 'Empty comment field',
            type: 'error',
          },
          5
        )
      )
    }
  }
}

export const { setBlogs, pushBlog, updateLike, deleteBlog, addComment } =
  blogSlice.actions
export default blogSlice.reducer
