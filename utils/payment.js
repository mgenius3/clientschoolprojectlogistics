const https = require('https');
const dotenv = require('dotenv');

const paystack = require('paystack');
dotenv.config();
paystack(process.env.PAYSTACK_SECRET_KEY);

const initializePaystackTransaction = async (req, service, amount) => {
  const params = JSON.stringify({
    email: req?.user?.email,
    amount: amount * 100,
    callback_url: `http://localhost:5000/dashboard/user/${service}`, // Set the redirect URL here
    metadata: {
      custom_fields: [
        {
          display_name: req.user?.firstName + ' ' + req?.user?.lastName,
          variable_name: 'Kupon',
          value: req?.user?.id,
        },
      ],
    },
  });

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/transaction/initialize',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(params);
      req.end();
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

const verifyPaystackTransaction = async (reference) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.paystack.co',
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

module.exports = { initializePaystackTransaction, verifyPaystackTransaction };
