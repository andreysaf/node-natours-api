const Tour = require('./../model/tourModel');

// exports.getAllTours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// exports.getTour = (req, res) => {
//   const id = Number(req.params.id);
//   const tour = tours.find((el) => el.id === id);

//   if (tour) {
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } else {
//     res.status(404).json({
//       status: 'fail',
//       message: `Could not find tour with ID of ${id}`,
//     });
//   }
// };

exports.createTour = async (req, res) => {
  try{
    console.log(req.body);
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  };
};
