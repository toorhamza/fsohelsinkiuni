export const addNotification = (NotificationObject) => ({
  type: "ADD_NOTIFICATION",
  data: NotificationObject,
});

export const delNotification = () => ({
  type: "DEL_NOTIFICATION",
});

export const fetchAllBlogs = (BlogsObject) => ({
    type: 'ALL_BLOGS',
    data: BlogsObject
})

export const addBlog = (BlogObject) => ({
    type: 'ADD_BLOG',
    data: BlogObject
})

export const deleteBlog = (id) => ({
    type: 'DEL_BLOG',
    id: id
})

export const likeBlog = (id, blogToLike) => ({
    type: 'LIKE_BLOG',
    id: id
})

export const saveUserData = (user) => ({
    type: 'SAVE_USER_DATA',
    data: user
})

export const logout = () => ({
    type: 'DEL_USER',
})


