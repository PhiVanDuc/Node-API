const express = require('express');
const router = express.Router();
const { User, Provider, UserToken } = require('../models/index');

router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      include: Provider
    });
  
    return res.status(200).json({
      status: 200,
      success: true,
      data: {
        users,
      }
    });
  } catch(error) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
});

router.get('/users/:user_id', async (req, res) => {
  const { user_id } = req.params;
  
  try {
    const user = await User.findByPk(user_id, {
      include: Provider
    });

    return res.status(200).json({
      status: 200,
      success: true,
      data: {
        user,
      }
    });
  } catch(error) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: error.message,
    });
  }
});

router.patch('/users/:user_id', async (req, res) => {
  const { name } = req.body;
  const { user_id } = req.params;

  try {
    const user = await User.update(
      {
        name,
      },
      {
        where: {
          id: user_id,
        }
      }
    );

    if (user) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Cập nhật thành công!",
      });
    }
  } catch(error) {
    return res.status(400).json({
      status: 400,
      success: true,
      message: error.message,
    });
  }
});

router.delete('/users/delete/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    await UserToken.destroy({
      where: {
        user_id,
      }
    });

    await Provider.destroy({
      where: {
        user_id,
      }
    });

    await User.destroy({
      where: {
        id: user_id,
      }
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Success deleted!",
    });
  } catch(error) {
    return res.status(400).json({
      status: 400,
      success: true,
      message: error.message,
    });
  }
});

module.exports = router;
