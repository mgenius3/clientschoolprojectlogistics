/////////////////////
const fs = require('fs');
const { tableExists } = require('../utils/checkTableExist');

const DATA_FILE_PATH = './data/logistics.json';

// create table logistics
const createTableLogistics = async () => {
  try {
<<<<<<< HEAD
    let checkLogisticstableExists = fs.existsSync(DATA_FILE_PATH);
    if (!checkLogisticstableExists) {
      fs.writeFileSync(DATA_FILE_PATH, '[]');
    }
=======
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let checkUsertableExists = await tableExists('logistics');
    const user_table = checkUsertableExists
      ? null
      : await connection.query(`CREATE TABLE logistics (
      id INT NOT NULL AUTO_INCREMENT,
      userId VARCHAR(255) NOT NULL,
      files LONGTEXT NOT NULL,
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telephone VARCHAR(255) NOT NULL,
      company VARCHAR(255),
      pickupAddress VARCHAR(255) NOT NULL,
      pickupCity VARCHAR(255) NOT NULL,
      pickupState VARCHAR(255) NOT NULL,
      postCode VARCHAR(255) NOT NULL,
      deliveryAddress VARCHAR(255) NOT NULL,
      deliveryCity VARCHAR(255) NOT NULL,
      deliveryState VARCHAR(255) NOT NULL,
      receiverCode VARCHAR(255) NOT NULL,
      receiverTelephone VARCHAR(255) NOT NULL,
      status VARCHAR(255) DEFAULT 'pending',
      paid BIT DEFAULT 0,
      referenceId VARCHAR(255),
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) AUTO_INCREMENT=1000`);
>>>>>>> 5f9b447fdc8003b8d1a8621457785b1fcebac0ca
  } catch (err) {
    console.error(err.message);
  }
};

// send package details
const sendPackageDetails = async (data) => {
  const {
    userId,
    files,
    firstName,
    lastName,
    email,
    telephone,
    company,
    pickupAddress,
    pickupCity,
    pickupState,
    postCode,
    receiverTelephone,
    deliveryAddress,
    deliveryCity,
    deliveryState,
    receiverCode,
    description,
  } = data;
  try {
    const logisticsData = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
    const newLogistic = {
      id: logisticsData.length + 1000,
      userId,
      files,
      firstName,
      lastName,
      email,
      telephone,
      company,
      pickupAddress,
      pickupCity,
      pickupState,
      postCode,
      receiverTelephone,
      deliveryAddress,
      deliveryCity,
      deliveryState,
      receiverCode,
      description,
      status: 'pending',
      paid: false,
      referenceId: null,
      created_at: new Date().toISOString(),
    };
    logisticsData.push(newLogistic);
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(logisticsData));
    return newLogistic.id;
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};

// get all package
const getAllPackage = async () => {
<<<<<<< HEAD
  const logisticsData = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
  return logisticsData;
=======
  const query = 'SELECT * FROM logistics';
  const connection = await pool.getConnection();
  const [users] = await connection.query(query);
  await connection.release();
  return users;
>>>>>>> 5f9b447fdc8003b8d1a8621457785b1fcebac0ca
};

// package detail by id
const packageDetailById = async (id) => {
  const logisticsData = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
  const logistics = logisticsData.find((item) => item.id === id);
  return logistics;
};

// get a user package
const getAUserPackage = async (userId) => {
  const logisticsData = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
  const logistics = logisticsData.filter((item) => item.userId === userId);
  return logistics;
};

// update package status
const updatePackageStatus = async (id, status) => {
  try {
    const logisticsData = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
    const logistics = logisticsData.find((item) => item.id === id);
    if (logistics) {
      logistics.status = status;
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(logisticsData));
    }
  } catch (err) {
    throw err.message;
  }
};

// set package reference
const setPackageReference = async (referenceId, id) => {
  try {
    const logisticsData = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
    const logistics = logisticsData.find((item) => item.id === id);
    if (logistics) {
      logistics.referenceId = referenceId;
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(logisticsData));
    }
  } catch (err) {
    throw err.message;
  }
};

// update package payment
const updatePackagePayment = async (paid, id) => {
  try {
    const logisticsData = JSON.parse(fs.readFileSync(DATA_FILE_PATH));
    const logistics = logisticsData.find((item) => item.id === id);
    if (logistics) {
      logistics.paid = paid;
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(logisticsData));
    }
  } catch (err) {
    throw err.message;
  }
};
module.exports = {
  createTableLogistics,
  sendPackageDetails,
  getAllPackage,
  packageDetailById,
  getAUserPackage,
  updatePackageStatus,
  setPackageReference,
  updatePackagePayment,
};
