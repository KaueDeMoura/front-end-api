const db = require('../config/database');

const User = {
  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM users');
    return rows;
  },


  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },


  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  create: async (name, email, password, role = 'Viewer') => {
    const [result] = await db.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
    return { id: result.insertId, name, email, role }; 
  },  

  update: async (id, updates) => {
    const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
    const values = Object.values(updates);
    values.push(id);
    await db.execute(`UPDATE users SET ${fields} WHERE id = ?`, values);
  },
  delete: async (id) => {
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
  }
};

module.exports = User;
