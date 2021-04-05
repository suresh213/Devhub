const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// db connection
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/api/login', require('./routes/api/login'));
app.use('/api/register', require('./routes/api/register'));

app.use('/api/user/follow', require('./routes/api/UserFollow'));
app.use('/api/user/unfollow', require('./routes/api/UserFollow'));

app.use('/api/profile/me', require('./routes/api/userProfile'));
app.use(
  '/api/profile/upload/profile-pic',
  require('./routes/api/uploadProfilePic')
);
app.use('/api/profile/create', require('./routes/api/createProfile'));
app.use('/api/profile/delete', require('./routes/api/deleteUser'));
app.use('/api/profile/allProfiles', require('./routes/api/allProfiles'));
app.use(
  '/api/profile/allProfiles/profilesByName',
  require('./routes/api/allProfiles')
);
app.use('/api/profile/user', require('./routes/api/profileById'));
app.use('/api/profile/experience', require('./routes/api/experience'));
app.use('/api/profile/education', require('./routes/api/education'));
app.use('/api/posts/add', require('./routes/api/addPost'));
app.use('/api/posts/delete', require('./routes/api/deletePost'));
app.use('/api/posts/allPosts', require('./routes/api/allPosts'));
app.use('/api/posts/post', require('./routes/api/postById'));
app.use('/api/posts/likePost', require('./routes/api/likePost'));
app.use('/api/posts/dislikePost', require('./routes/api/dislikePost'));
app.use('/api/posts/addComment', require('./routes/api/addComment'));
app.use('/api/posts/removeComment', require('./routes/api/removeComment'));
app.use('/api/github', require('./routes/api/github'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
