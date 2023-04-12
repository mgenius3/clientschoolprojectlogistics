const fs = require('fs');
const { pool } = require('../config/db');
const { tableExists } = require('../utils/checkTableExist');

//create table user
const createTableSell = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    let checkUsertableExists = await tableExists('sell');
    const user_table = checkUsertableExists
      ? null
      : await connection.query(`CREATE TABLE sell (
      id INT NOT NULL AUTO_INCREMENT,
      sellerId INT NOT NULL,
      files LONGTEXT NOT NULL,
      title VARCHAR(255) NOT NULL,
      location VARCHAR(1000) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      material VARCHAR(255) NOT NULL,
      conditions VARCHAR(255) NOT NULL,
      price VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      paid BIT DEFAULT 0,
      referenceId VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) AUTO_INCREMENT=1000`);
  } catch (err) {
    console.error(err.message);
  }
};

const sendPackageDetails = async (data) => {
  const {
    sellerId,
    files,
    title,
    location,
    city,
    state,
    category,
    material,
    conditions,
    price,
    description,
  } = data;
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const sell_query = `INSERT INTO sell (sellerId, files, title, location, city, state, category, material, conditions, price, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const new_sell_user = await pool.query(sell_query, [
      sellerId,
      files,
      title,
      location,
      city,
      state,
      category,
      material,
      conditions,
      price,
      description,
    ]);
    return new_sell_user[0].insertId;
  } catch (err) {
    throw err.message;
  }
};

const getAllSell = async () => {
  const query = 'SELECT * FROM sell';
  const connection = await pool.getConnection();
  const users = await connection.query(query);
  await connection.release();
  return users[0];
};

const sellDetailById = async (id) => {
  let connection = await pool.getConnection();
  (await connection).beginTransaction();
  let get_package = await connection.query(
    `SELECT * FROM sell WHERE id = '${id}'`
  );
  await connection.release();
  return get_package[0];
};

const getAUserSell = async (sellerId) => {
  let connection = await pool.getConnection();
  (await connection).beginTransaction();
  let get_user_sell = await connection.query(
    `SELECT * FROM sell WHERE sellerId = '${sellerId}'`
  );
  await connection.release();
  return get_user_sell[0];
};

const setPackageReference = async (referenceId, id) => {
  try {
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = `UPDATE sell SET referenceId = ? WHERE id = ?`;
    await pool.query(query, [referenceId, id]);
    await connection.release();
  } catch (err) {
    throw err.message;
  }
};
const updatePackagePayment = async (paid, id) => {
  try {
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = `UPDATE sell SET paid = ? WHERE id = ?`;
    await pool.query(query, [paid, id]);
    await connection.release();
  } catch (err) {
    throw err.message;
  }
};

const deletePackage = async (id) => {
  try {
    let connection = await pool.getConnection();
    (await connection).beginTransaction();
    const query = 'DELETE FROM sell WHERE id = ?';
    await pool.query(query, [id]);
    await connection.release();
  } catch (err) {
    throw err.message;
  }
};
module.exports = {
  createTableSell,
  sendPackageDetails,
  getAllSell,
  sellDetailById,
  getAUserSell,
  setPackageReference,
  updatePackagePayment,
  deletePackage,
};
