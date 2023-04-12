const fs = require('fs');

// check if file exists before reading/writing
const fileExists = async (filePath) => {
  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    console.error('Error checking if file exists:', err);
    return false;
  }
};

// create file user.json if it does not exist
const createFileUser = async () => {
  console.log('hello');
  try {
    const fileExist = await fileExists('./data/user.json');
    if (!fileExist) {
      await fs.promises.writeFile(
        './data/user.json',
        JSON.stringify({ users: [], nextId: 100 })
      );
    }
  } catch (err) {
    console.error(err.message);
  }
};

const registerUser = async ({
  email,
  password,
  firstName,
  lastName,
  telephone,
  address,
  admin,
}) => {
  try {
    const data = await fs.promises.readFile('./data/user.json', 'utf-8');
    const { users, nextId } = JSON.parse(data);

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error('email already exists');
    }

    console.log(nextId);
    const newUser = {
      id: users.length + 100,
      email,
      password,
      firstName,
      lastName,
      telephone,
      address,
      admin,
      created_at: new Date(),
    };
    const updatedUsers = [...users, newUser];
    const updatedData = JSON.stringify({
      users: updatedUsers,
      nextId: nextId + 1,
    });
    await fs.promises.writeFile('./data/user.json', updatedData);

    return newUser.id;
  } catch (err) {
    console.log(err);
    throw err.message;
  }
};

const getUsers = async () => {
  try {
    const data = await fs.promises.readFile('./data/user.json', 'utf-8');
    const { users } = JSON.parse(data);
    return users;
  } catch (err) {
    throw err.message;
  }
};

const getUser = async (id) => {
  try {
    const data = await fs.promises.readFile('./data/user.json', 'utf-8');
    const { users } = JSON.parse(data);
    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    const data = await fs.promises.readFile('./data/user.json', 'utf-8');
    const { users } = JSON.parse(data);
    const user = users.find((user) => user.email === email);
    if (!user) {
      throw new Error('user not found');
    }
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const updateUserToken = async (id, token) => {
  try {
    const data = await fs.promises.readFile('./data/user.json', 'utf-8');
    const { users } = JSON.parse(data);
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, token } : user
    );
    const updatedData = JSON.stringify({ users: updatedUsers });
    await fs.promises.writeFile('./data/user.json', updatedData);
  } catch (err) {
    throw err.message;
  }
};

module.exports = {
  createFileUser,
  registerUser,
  getUsers,
  getUser,
  getUserByEmail,
  updateUserToken,
};
