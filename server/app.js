// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { OpenAI } = require('openai');
// const Question = require('./models/question');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb+srv://cpsrajan2002_db_user:BmeFfxJbAxAKK1gn@askgenie.ipswl3w.mongodb.net/')
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB error:', err));

// // OpenAI / Gemini client
// const openai = new OpenAI({
//   apiKey: "AIzaSyBqKW_m_gPX9lc0o4kZoPkiEr-SQfZAc4s", // replace with your key
//   baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
// });

// // Chat endpoint
// app.post('/getResponse', async (req, res) => {
//   const { question, username } = req.body;

//   if (!question || !username) {
//     return res.status(400).json({ error: 'Missing question or username' });
//   }

//   try {
//     const responseAI = await openai.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [
//         { role: "system", content: "You are a helpful assistant." },
//         { role: "user", content: question },
//       ],
//     });

//     const text = responseAI.choices?.[0]?.message?.content || "No response";

//     // Save question + response in MongoDB
//     const q = new Question({ username, question, response: text });
//     await q.save();

//     res.status(200).json({ response: text });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to generate response' });
//   }
// });

// module.exports = app;





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const Question = require('./models/question');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect('mongodb+srv://cpsrajan2002_db_user:BmeFfxJbAxAKK1gn@askgenie.ipswl3w.mongodb.net/')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// OpenAI / Gemini client
const openai = new OpenAI({
  apiKey: 'AIzaSyBqKW_m_gPX9lc0o4kZoPkiEr-SQfZAc4s', // replace with your key if needed
  baseURL: 'https://generativelanguage.googleapis.com/v1beta/openai/',
});

// Chat endpoint
app.post('/getResponse', async (req, res) => {
  const { question, username } = req.body;

  if (!question || !username) {
    return res.status(400).json({ error: 'Missing question or username' });
  }

  try {
    const responseAI = await openai.chat.completions.create({
      model: 'gemini-2.0-flash',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: question },
      ],
    });

    const text = responseAI.choices?.[0]?.message?.content || 'No response';

    // Save question + response in MongoDB
    const q = new Question({ username, question, response: text });
    await q.save();

    res.status(200).json({ response: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// ---------- New route: Get user's chat history ----------
app.get('/getHistory/:username', async (req, res) => {
  const { username } = req.params;

  try {
    // fetch history for user sorted newest first
    const history = await Question.find({ username }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});
// -------------------------------------------------------
// Delete user's history
app.delete('/clearHistory/:username', async (req, res) => {
  const { username } = req.params;
  try {
    await Question.deleteMany({ username });
    res.status(200).json({ message: 'History cleared' });
  } catch (err) {
    console.error('Error clearing history:', err);
    res.status(500).json({ error: 'Failed to clear history' });
  }
});

module.exports = app;


