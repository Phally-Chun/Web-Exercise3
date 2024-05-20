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

const getAllUserController = (req, res) => {
  // Pagination
  const users = readData('../data/users.json');
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);

  const paginatedUsers = users.slice(startIndex, endIndex);

  res.json({
    total: users.length,
    page: parseInt(page),
    limit: parseInt(limit),
    users: paginatedUsers,
  });
  return res.send(users);
};


const createNewUserController = (req, res) => {
    try {
        const users = readData('../data/users.json');
            // const { username, password } = req.body;;
        const newUser = { ...req.body, id: uuidv4() };
        users.push(newUser);
        writeData('../data/users.json', users);
        new Response(res).setResponse(newUser).send();
    }catch(error) {
        console.log(error);
        new Response(res).setStatusCode(500).setCustomCode(10000).send();
    }
};

const getUserByIdController = (req, res) => {
  try {
    const users = readData('../data/users.json');
    const foundUsers = users.find(u => u.id === req.params.id);
    console.log({ foundUsers });
    new Response(res).setResponse(foundUsers).send();
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const updateUserByIdController = (req, res) => {
  try {
    const users = readData('../data/users.json');
    const index = users.findIndex(u => u.id === req.params.id);

    if (index !== -1) {
      users[index] = { ...users[index], ...req.body };
      writeData('../data/users.json', users);
      new Response(res).setResponse(users[index]).send();
    } else {
      new Response(res).setStatusCode(404).setMessage('User not found').send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};


const deleteUserByIdController = (req, res) => {
    try {
        let users = readData('../data/users.json');
        const index = users.findIndex(u => u?.id === req?.params?.id);
        if (index !== -1) {
            users = users.filter(u => u.id !== req.params.id);
            writeData('../data/users.json', users);
            new Response(res).setResponse(users).send();
        } else {
            new Response(res).setStatusCode(404).setMessage('User not found').send();
        }
    } catch (error){
        console.log(error);
        new Response(res).setStatusCode(500).setCustomCode(10000).send();
    }
}

module.exports = {
  getAllUserController,
  createNewUserController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserByIdController,
};
// export default userRoutes;
