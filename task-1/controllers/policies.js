const {
  errorCodes,
  CustomError,
  errorMessages,
  errorStatus
} = require('../errorHandler');
const Policy = require('../models/Policy');

const getAll = async (_req, res, next) => {
  try {
    const response = await Policy.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const response = await Policy.findById(req.params.id);
    if (!response) {
      throw new CustomError(
        errorCodes.NOT_FOUND,
        errorMessages.NOT_FOUND,
        errorStatus.NOT_FOUND,
        { id: req.params.id }
      );
    }
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const policy = new Policy({
      coverage: req.body.coverage,
      name: req.body.name,
      type: req.body.type,
      premium: req.body.premium
    });
    const newPolicy = await policy.save();
    res.status(201).json(newPolicy);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    await Policy.updateOne({ _id }, req.body);
    const updated = await Policy.findById(_id);
    res.status(201).json(updated);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const deletedPolicy = await Policy.findOneAndDelete({ _id });
    res.json(deletedPolicy);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
