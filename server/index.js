const express = require("express");
const bodyParser = require("body-parser");
const transRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');
const tagRoutes = require('./routes/tags');
const csvRoutes = require('./routes/csvImport');

const PORT = 3001;
const app = express();

app.use(bodyParser.json());
app.use(transRoutes);
app.use(categoryRoutes);
app.use(tagRoutes);
app.use(csvRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
