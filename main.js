'use strict';

require('dotenv').config();

require('./server').listen(process.env.PORT, () => {
  console.log('server up ::', process.env.PORT);
});
