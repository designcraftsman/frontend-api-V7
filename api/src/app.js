const express = require('express');

const app = express();
const cors = require('cors');

const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');
const groupRoutes = require('./routes/group');
const assetRouter = require('./routes/asset');
const annotationRouter = require('./routes/annotation');
const courseRoutes = require('./routes/course');
const enviromentRouter = require('./routes/enviroment');
const quizRouter = require('./routes/quiz');
const quizElementRouter = require('./routes/quizElement');
const quizElementOptionRouter = require('./routes/quizElementOption');
const quizResultRouter = require('./routes/quizResult');
const userRoutes = require('./routes/user');
const notificationRouter = require('./routes/notification');
const adminRouter = require('./routes/admin');
const courseRateRouter = require('./routes/courseRate');
const path = require('path');

// Configure CORS options
const corsOptions = {
    origin: '*', // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use('/assets', cors(corsOptions), express.static(path.join(__dirname, 'assets')));

app.use('/assets/images', cors(corsOptions), express.static(path.join(__dirname, 'assets/images')));
app.use('/assets/objects', cors(corsOptions), express.static(path.join(__dirname, 'assets/objects')));
app.use('/assets/pdf',cors(corsOptions),  express.static(path.join(__dirname, 'assets/pdf')));
app.use(express.json());
app.use(cors(corsOptions));

app.use('/users', userRoutes);
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.use('/groups', groupRoutes);
app.use('/assets', assetRouter);
app.use('/annotations', annotationRouter);
app.use('/courses', courseRoutes);
app.use('/enviroments', enviromentRouter);
app.use('/quiz', quizRouter);
app.use('/quizElements', quizElementRouter);
app.use('/quizElementOptions', quizElementOptionRouter);
app.use('/quizResults', quizResultRouter);
app.use('/notifications', notificationRouter);
app.use('/admin', adminRouter);
app.use('/courseRates', courseRateRouter);

module.exports = app;
