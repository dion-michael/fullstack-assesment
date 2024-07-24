const {
  getAll,
  getById,
  create,
  update,
  remove
} = require('../../controllers/policies');
const {
  createPolicyRequestBody,
  updatePolicyRequestBody
} = require('../../JoiSchemas');
const validateRequestBody = require('../../middlewares/validateRequestBody');
const router = require('express').Router();

router.get('/', getAll);
router.post('/', validateRequestBody(createPolicyRequestBody), create);
router.get('/:id', getById);
router.put('/:id', validateRequestBody(updatePolicyRequestBody), update);
router.delete('/:id', remove);

module.exports = router;
