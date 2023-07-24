const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Set up CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://javascript:javascript@cluster0.a5rdq0l.mongodb.net/pdfs_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const dataSchema = new mongoose.Schema({
  txnDate: Date,
  valueDate: Date,
  description: String,
  reference: String,
  debits: Number,
  credits: Number,
  balance: Number,
});

const Data = mongoose.model('pdfs', dataSchema);

app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find({});
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data from the database.' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});