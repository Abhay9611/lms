const { StudentProgress } = require('../models');

const getProgress = async (req, res) => {
  const progress = await StudentProgress.findAll({ where: { userId: req.user.id } });
  res.json(progress);
};

module.exports = {
  getProgress
};
