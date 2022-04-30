const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json());

import infoRoutes from '../routes/info.route';
import profileRoutes from '../routes/profile.route';
import partnerRoutes from '../routes/partners.route';

app.use('/api', infoRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/partners', partnerRoutes);

export = app;