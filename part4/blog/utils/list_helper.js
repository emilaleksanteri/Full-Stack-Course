const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {return blogs.length === 0
  ? 0
  : blogs.reduce((likes, blog) => likes + blog.likes, 0)
}

const favoriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const mostLikes = blogs.filter(blog => blog.likes === Math.max(...likes))
  
  return blogs.length === 0
    ? 'No Blogs Yet'
    : mostLikes[0]
}

const mostBlogs = blogs => {
  const authors = blogs.map(blog => blog.author)

  /*countBy used to iterate through array and count entires, 
  toPairs converts the counts to arrays, 
  maxBy finds the highest count of names, 
  last takes the final index of the count object, 
  Head takes the title of the most common */

  const mostCommon = _.head(_(authors).countBy().toPairs().maxBy(_.last))

  // same logic as above, instead of the title of most common, we just take the number, which is the last value
  const numbofBlogs = _.last(_(authors).countBy().toPairs().maxBy(_.last))

  // make an object out of top author
  const top_author = {
    'author': mostCommon,
    'blogs': numbofBlogs
  }
  
  // no zero errors
  return blogs.length === 0
  ? 'No Blogs Yet'
  : top_author
  
}

const mostLikes = blogs => {
  // need to get only authors and likes
  const only_likes = blogs.map((blog) => _.pick(blog, ['author', 'likes']))
  // combine same authors likes so that the max likes can be found
  const count = _.uniqWith(only_likes, (first, second) => {
    if (first.author == second.author) {
      second.likes += first.likes
      return true
    }
    return false
  })
  // to get one with most likes
  return _.maxBy(count, (blog) => blog.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}