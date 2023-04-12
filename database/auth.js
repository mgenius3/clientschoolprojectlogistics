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
<<<<<<< HEAD
    const fileExist = await fileExists('./data/user.json');
    if (!fileExist) {
      await fs.promises.writeFile(
        './data/user.json',
        JSON.stringify({ users: [], nextId: 100 })
      );
    }
=======
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let checkUsertableExists = await tableExists('user');
    const user_table = checkUsertableExists
      ? null
      : await connection.query(`CREATE TABLE user (
      id INT NOT NULL AUTO_INCREMENT,
      admin BIT DEFAULT 0,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      telephone VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      token VARCHAR(1000) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      UNIQUE(email)
    ) AUTO_INCREMENT=100`);
>>>>>>> 5f9b447fdc8003b8d1a8621457785b1fcebac0ca
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

    const newUser = {
      id: nextId,
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
    console.log(user);
    return user;
  } catch (err) {
    throw err.message;
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
    throw err.message;
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
