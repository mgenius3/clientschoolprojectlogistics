const {
  registerUser,
  getUser,
  getUserByEmail,
  updateUserToken,
} = require('../database/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const RegisterNewUser = async (req, res) => {
  console.log(req.body);
  try {
    const { password } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 10);
    //PASSWORD ENCRYPTION
    req.body.password = encryptedPassword;
    let new_user_id = await registerUser(req.body);

    console.log(new_user_id);

    let user = await getUser(new_user_id);

    //CREATE TOKEN
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        telephone: user.telephone,
        address: user.address,
        firstName: user.firstName,
        lastName: user.lastName,
        admin: user.admin,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '5h',
      }
    );
    //UPDATE USER WITH TOKEN
    await updateUserToken(user.id, token);
    //GET UPDATED DATA FROM DB
    let updatedUser = await getUser(user.id);
    delete updatedUser.password;
    //SEND UPDATED DATA FROM DB
    res.status(201).json(updatedUser.token);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Validate User Input
    if (!(email && password)) {
      res.status(400).json({ msg: 'Please input all field' });
    } else {
      let user = await getUserByEmail(email);

      if (user && (await bcrypt.compare(password, user.password))) {
        //CREATE TOKEN
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            telephone: user.telephone,
            address: user.address,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: '5h',
          }
        );
        //UPDATE USER WITH TOKEN
        await updateUserToken(user.id, token);
        //GET UPDATED DATA FROM DB
        let updatedUser = await getUser(user.id);
        delete updatedUser.password;
        //SEND UPDATED DATA FROM DB
        res.status(200).json(updatedUser.token);
      } else {
        res.status(400).json({ msg: 'Email or password is not correct' });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ msg: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    let packages = await getUser(id);
    delete packages[0].password;
    delete packages[0].token;
    res.status(200).json({ msg: packages[0] });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
module.exports = { RegisterNewUser, LoginUser, getUserById };
