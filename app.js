// core modules
const fs = require('fs');
const morgan = require('morgan');

// third party modules
const express = require('express');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋🏻');
  next();
});

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

// Data fetching on start of app
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// ROUTE HANDLERS
const getAllTours = (req, res) => {
  res.status(200).send({
    status: 'success',
    requestTime: req.requestedTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const tourId = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === tourId);

  if (!tour) {
    res.status(404).json({
      status: 'failure',
      message: 'Invalid ID',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const deleteTour = (req, res) => {
  const tourId = req.params.id * 1;
  const updatedTours = tours.filter((tour) => tour.id !== tourId);

  if (updatedTours.length === tours.length) {
    return res.status(404).json({
      status: 'failure',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const createTour = (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  const updatedTours = tours.concat(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(updatedTours),
    (err) => {
      if (err) {
        res.status(500).send({
          status: 'error',
          message: err.message,
        });
        return;
      }

      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!!!',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!!!',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!!!',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet!!!',
  });
};

// Routes
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.post('/api/v1/tours', createTour);

// Formatted Routes
const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// PORT LISTENER
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
