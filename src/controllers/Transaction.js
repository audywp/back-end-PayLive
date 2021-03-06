const TransactionModel = require('../models/Transaction')

module.exports = {
  read: async function (req, res) {
    const results = await TransactionModel.getAllPrice()
    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  readById: async function (req, res) {
    const { id } = req.params
    const results = await TransactionModel.getById(id)
    const data = {
      success: false,
      data: results
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { idMenu, idPaySistem, idNominal, price } = req.body
    const results = await TransactionModel.createPrice(idMenu, idPaySistem, idNominal, price)
    if (results) {
      const data = {
        success: true,
        msg: `Price for id_menu ${idMenu} id_pay_sistem ${idPaySistem} id_nominal ${idNominal} has been created`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Sorry you cannot add this feature'
      }
      res.send(data)
    }
  },
  update: async function (req, res) {
    const { id } = req.params
    const { idMenu, idPaySistem, idNominal, price } = req.body
    const results = await TransactionModel.updatePrice(id, idMenu, idPaySistem, idNominal, price)
    if (results) {
      const data = {
        success: true,
        msg: `Total price with id menu = ${idMenu} and idPaySistem = ${idPaySistem} has been updated!`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be updated'
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    const { id } = req.params
    const results = await TransactionModel.deletePrice(id)
    if (results) {
      const data = {
        success: true,
        msg: `Cash_point name with id ${id} has been deleted!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be deleted'
      }
      res.send(data)
    }
  }
}
