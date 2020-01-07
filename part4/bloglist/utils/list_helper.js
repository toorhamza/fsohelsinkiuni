var _ = require('lodash');

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likesSum = blogs.map((i) => i.likes).reduce((sum, item) => {
        return sum + item
    })

    return likesSum
}

const favoriteBlog = (blogs) => {
    var top = 0 
    var index = 0

    blogs.map((blog, i) => {
        if (blog.likes >= top) {
            top = blog.likes
            index = i
        }
    })
    console.log(`${top} is the most likes & ${index}`)
    const fav = {
        title: blogs[index].title,
        author: blogs[index].author,
        likes: blogs[index].likes
    }
    return fav
}

const mostBlogs = (blogs) => {
  /*   const author = blogs.map(o => o.author)
    var count = {}
    const totalObject = author.forEach(function(i) { count[i] = (count[i]||0) + 1;});

    const result = _.invert(count)
    const max = Math.max(...Object.keys(result))

    console.log(result) */
    const authors = _.maxBy(blogs, function(o){return o.author}).author
    const count = _.countBy(blogs, function(o){return o.author === authors}).true
    const result = {
        author: authors,
        blogs: count
    }

    return result

}

const mostLikes = (blogs) => {
    const author  = _.maxBy(blogs, (o) => o.likes)
    const result = {
        author: author.author,
        likes: author.likes
    }

    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}