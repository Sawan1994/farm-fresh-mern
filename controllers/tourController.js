const fs = require('fs');

// Data fetching on start of app
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

// ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  res.status(200).send({
    status: 'success',
    requestTime: req.requestedTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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

exports.createTour = (req, res) => {
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
