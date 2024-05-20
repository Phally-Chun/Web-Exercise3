// const users = require("../data/users.json") || [];
const Response = require("../responseBody/Response");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


// Helper functions to read and write JSON files
const readData = (file) => {
  const data = fs.readFileSync(file);
  return JSON.parse(data);
};

const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

const getAllArticleController = (req, res) => {
  // Pagination
 // Advanced search
  const { created_by, is_published, title, content, page = 1, limit = 10 } = req.query;
  if (created_by) {
    filteredArticles = filteredArticles.filter(article => article.created_by === created_by);
  }
  if (is_published) {
    const published = is_published === 'true';
    filteredArticles = filteredArticles.filter(article => article.is_published === published);
  }
  if (title) {
    filteredArticles = filteredArticles.filter(article => article.title.toLowerCase().includes(title.toLowerCase()));
  }
  if (content) {
    filteredArticles = filteredArticles.filter(article => article.contents.toLowerCase().includes(content.toLowerCase()));
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);

  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  res.json({
    total: filteredArticles.length,
    page: parseInt(page),
    limit: parseInt(limit),
    articles: paginatedArticles,
  });
  return res.send(users);
};


const createNewArticleController = (req, res) => {
    try {
        const articles = readData('../data/articles.json');
        const newArticle = { ...req.body, id: uuidv4(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
        articles.push(newArticle);
        writeData('../data/articles.json', articles);
        new Response(res).setResponse(newArticle).send();
    }catch(error) {
        console.log(error);
        new Response(res).setStatusCode(500).setCustomCode(10000).send();
    }
};

const getArticleByIdController = (req, res) => {
  try {
    const articles = readData('./data/articles.json');
    const article = articles.find(a => a.id === req.params.id);
    console.log({ article });
    if (article) {
      new Response(res).setResponse(article).send();
    } else {
      new Response(res).setStatusCode(404).setMessage('Article not found').send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const updateArticleByIdController = (req, res) => {
  try {
    const articles = readData('../data/articles.json');
    const index = articles.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...req.body, updated_at: new Date().toISOString() };
      writeData('../data/articles.json', articles);
      new Response(res).setResponse(articles[index]).send();
    } else {
      new Response(res).setStatusCode(404).setMessage('Article not found').send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};


const deleteArticleByIdController = (req, res) => {
    try {
        let articles = readData('../data/articles.json');
        const index = articles.findIndex(a => a.id === req.params.id);
        if (index !== -1) {
            articles = articles.filter(a => a.id !== req.params.id);
            writeData('../data/articles.json', articles);
            new Response(res).setResponse(articles).send();
        } else {
            new Response(res).setStatusCode(404).setMessage('Article not found').send();
        }
    } catch (error){
        console.log(error);
        new Response(res).setStatusCode(500).setCustomCode(10000).send();
    }
}

module.exports = {
  getAllArticleController,
  createNewArticleController,
  getArticleByIdController,
  updateArticleByIdController,
  deleteArticleByIdController,
};
// export default userRoutes;
