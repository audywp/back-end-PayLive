const db = require('../utils/db')
module.exports = {
  getAllUsers: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: '' }
    search = search || { key: 'phone', value: '' }
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const query = `SELECT * FROM ${table}
                    WHERE ${search.key} LIKE '${search.value}%'
                    ORDER BY ${sort.key} ${sort.value ? 'ASC' : 'DESC'} 
                    LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getTotalUsers: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'phone', value: '' }
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const query = `SELECT COUNT (*) AS total FROM ${table}
                    WHERE ${search.key} LIKE '${search.value}%'`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0].total)
        }
      })
    })
  },
  createUser: function (phone, roleId) {
    const table = 'users'
    roleId = roleId || 2
    return new Promise(function (resolve, reject) {
      const query = `INSERT INTO ${table} (phone, role_id) VALUES ('${phone}', ${roleId})`
      console.log(query)
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  createSecurityCode: function (id, securityCode) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET security_code='${securityCode}' WHERE id=${id}`
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
  updateUser: function (id, phone) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET phone='${phone}' WHERE id=${id}`
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
  updateUserDetails: function (idUser, picture) {
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    const table = 'user_details'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET profile_picture=${picture} WHERE id_user=${idUser}`
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
  topupBalance: function (idUser, balance) {
    const table = 'user_details'
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET balance='${balance}' WHERE id_user=${idUser}`
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
  deleteUser: function (id) {
    const table = 'users'
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
  },
  deleteUserDetail: function (id) {
    const table = 'user_details'
    return new Promise(function (resolve, reject) {
      const query = ` DELETE FROM ${table} WHERE id_user= ${id}`
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
  },
  getUserById: function (id) {
    const table = 'users'
    const query = `SELECT * FROM ${table} WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.length) {
            resolve(results[0])
          } else {
            resolve(false)
          }
        }
      })
    })
  }
}
