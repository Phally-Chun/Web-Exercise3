const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/", userRoutes)
app.use("/", articleRoutes)

// // Helper functions to read and write JSON files
// const readData = (file) => {
//   const data = fs.readFileSync(file);
//   return JSON.parse(data);
// };

// const writeData = (file, data) => {
//   fs.writeFileSync(file, JSON.stringify(data, null, 2));
// };

// // Endpoints for Articles ========================================================
// app.get('/articles', (req, res) => {
//   const articles = readData('./data/articles.json');
//   let filteredArticles = articles;

//   // Advanced search
//   const { created_by, is_published, title, content, page = 1, limit = 10 } = req.query;

//   if (created_by) {
//     filteredArticles = filteredArticles.filter(article => article.created_by === created_by);
//   }

//   if (is_published) {
//     const published = is_published === 'true';
//     filteredArticles = filteredArticles.filter(article => article.is_published === published);
//   }

//   if (title) {
//     filteredArticles = filteredArticles.filter(article => article.title.toLowerCase().includes(title.toLowerCase()));
//   }

//   if (content) {
//     filteredArticles = filteredArticles.filter(article => article.contents.toLowerCase().includes(content.toLowerCase()));
//   }

//   // Pagination
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + parseInt(limit);

//   const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

//   res.json({
//     total: filteredArticles.length,
//     page: parseInt(page),
//     limit: parseInt(limit),
//     articles: paginatedArticles,
//   });
// });

// app.post('/articles', (req, res) => {
//   const articles = readData('./data/articles.json');
//   const newArticle = { ...req.body, id: uuidv4(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
//   articles.push(newArticle);
//   writeData('./data/articles.json', articles);
//   res.status(201).json(newArticle);
// });

// app.get('/articles/:id', (req, res) => {
//   const articles = readData('./data/articles.json');
//   const article = articles.find(a => a.id === req.params.id);
//   if (article) {
//     res.json(article);
//   } else {
//     res.status(404).send('Article not found');
//   }
// });

// app.put('/articles/:id', (req, res) => {
//   const articles = readData('./data/articles.json');
//   const index = articles.findIndex(a => a.id === req.params.id);
//   if (index !== -1) {
//     articles[index] = { ...articles[index], ...req.body, updated_at: new Date().toISOString() };
//     writeData('./data/articles.json', articles);
//     res.json(articles[index]);
//   } else {
//     res.status(404).send('Article not found');
//   }
// });

// app.delete('/articles/:id', (req, res) => {
//   let articles = readData('./data/articles.json');
//   const index = articles.findIndex(a => a.id === req.params.id);
//   if (index !== -1) {
//     articles = articles.filter(a => a.id !== req.params.id);
//     writeData('./data/articles.json', articles);
//     res.status(204).send();
//   } else {
//     res.status(404).send('Article not found');
//   }
// });





// // Endpoints for Users ========================================================
// app.get('/users', (req, res) => {
//   const users = readData('./data/users.json');
//   // Pagination
//   const { page = 1, limit = 10 } = req.query;
//   const startIndex = (page - 1) * limit;
//   const endIndex = startIndex + parseInt(limit);

//   const paginatedUsers = users.slice(startIndex, endIndex);

//   res.json({
//     total: users.length,
//     page: parseInt(page),
//     limit: parseInt(limit),
//     users: paginatedUsers,
//   });
// });


// app.post('/users', (req, res) => {
//   const users = readData('./data/users.json');
//   const newUser = { ...req.body, id: uuidv4() };
//   users.push(newUser);
//   writeData('./data/users.json', users);
//   res.status(201).json(newUser);
// });

// app.get('/users/:id', (req, res) => {
//   const users = readData('./data/users.json');
//   const user = users.find(u => u.id === req.params.id);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).send('User not found');
//   }
// });

// app.put('/users/:id', (req, res) => {
//   const users = readData('./data/users.json');
//   const index = users.findIndex(u => u.id === req.params.id);
//   if (index !== -1) {
//     users[index] = { ...users[index], ...req.body };
//     writeData('./data/users.json', users);
//     res.json(users[index]);
//   } else {
//     res.status(404).send('User not found');
//   }
// });

// app.delete('/users/:id', (req, res) => {
//   let users = readData('./data/users.json');
//   const index = users.findIndex(u => u.id === req.params.id);
//   if (index !== -1) {
//     users = users.filter(u => u.id !== req.params.id);
//     writeData('./data/users.json', users);
//     res.status(204).send();
//   } else {
//     res.status(404).send('User not found');
//   }
// });


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
