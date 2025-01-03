const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    Todo.findAll()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        throw err;
      });
  } catch (error) {
    console.error(error);
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    const result = await Todo.findOne({
      where: { id: req.params.id },
    });

    if (result) {
      res.send(result);
    } else {
      res.status(404).send({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: "Internal Server Error" });
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  try {
    const newTodo = req.body;
    const todo = await Todo.create(newTodo);
    res.send(todo);
  } catch (error) {
    res.status(404).send({ message: "Internal Server Error" });
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const newInfo = req.body;

    const result = await Todo.update(newInfo, { where: { id } });

    if (result[0]) {
      //   res.send(result);
      const result = await Todo.findOne({
        where: { id },
      });
      if (result) {
        res.send(result);
      } else {
        res.status(404).send({ message: "Internal Server Error" });
      }
    } else {
      res.status(404).send({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.error(error);
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ where: { id } });

    if (todo) {
      const result = await todo.destroy();
      res.send({ message: "Todo deleted successfully", deletedId: `${id}` });
    } else {
      res.status(404).send({ message: "Todo not found" });
    }
  } catch (error) {
    console.error(error);
  }
};
