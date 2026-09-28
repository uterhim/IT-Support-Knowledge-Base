const express = require('express');
const cors = require('cors');
require('dotenv').config();

const articlesRouter = require('./routes/articles');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// NOTE: /categories must be registered before /:id would otherwise be ambiguous;
// Express matches literal paths before params only if declared first, so order matters here.
app.use('/api/articles', articlesRouter);

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`Knowledge base API running on http://localhost:${PORT}`));
