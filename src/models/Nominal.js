const db = require('../utils/db')
module.exports = {
  getAllNominal: function () {
    const table = 'nominals'
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getById: function (id) {
    const table = 'nominals'
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table} where id=${id}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  createNominal: function (idMenu, idPaySistem, nominal) {
    const table = 'nominals'
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (id_menu, pay_sistem_id, nominal) VALUES (${idMenu}, ${idPaySistem}, ${nominal})`
      console.log(query)
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(results.affectedRows)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  updateNominal: function (id, idMenu, idPaySistem, nominal) {
    const table = 'nominals'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET id_menu=${idMenu}, pay_sistem_id=${idPaySistem}, nominal=${nominal} WHERE id=${id}`
      console.log(query)
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(results.affectedRows)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  deleteNominal: function (id) {
    const table = 'nominals'
    return new Promise(function (resolve, reject) {
      const query = ` DELETE FROM ${table} WHERE id= ${id}`
      console.log(query)
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  }
}
