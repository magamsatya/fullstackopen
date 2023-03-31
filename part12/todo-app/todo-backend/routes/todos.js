const express = require('express');
const router = express.Router();

const { Todo } = require('../mongo');
const configs = require('../util/config');
const { getAsync, setAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  await updateAddedTodosCounter();
  res.send(todo);
});

const updateAddedTodosCounter = async () => {
  const currentInt = parseInt(await getAsync(configs.REDIS_ADDED_TODOS_KEY));
  const valueToSave = isNaN(currentInt) ? 1 : currentInt + 1;
  await setAsync(configs.REDIS_ADDED_TODOS_KEY, valueToSave);
};

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  req.todo.text = req.body.text
  req.todo.done = req.body.done
  await req.todo.save()
  res.send(req.todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
