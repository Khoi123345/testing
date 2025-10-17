const pool = require('../config/database');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

class UserService {
  /**
   * Create new user
   */
  async createUser(userData) {
    const { email, password, full_name, phone, role = 'CUSTOMER' } = userData;

    // Check if user already exists
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert user
    const query = `
      INSERT INTO users (email, password_hash, full_name, phone, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, full_name, phone, role, is_active, email_verified, created_at, updated_at
    `;

    const result = await pool.query(query, [email, password_hash, full_name, phone, role]);
    return result.rows[0];
  }

  /**
   * Find user by email
   */
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  /**
   * Find user by ID (without password)
   */
  async findById(userId) {
    const query = `
      SELECT id, email, full_name, phone, role, is_active, email_verified, created_at, updated_at
      FROM users WHERE id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0] || null;
  }

  /**
   * Update user profile
   */
  async updateUser(userId, userData) {
    const { full_name, phone } = userData;

    const query = `
      UPDATE users
      SET full_name = COALESCE($1, full_name),
          phone = COALESCE($2, phone)
      WHERE id = $3
      RETURNING id, email, full_name, phone, role, is_active, email_verified, created_at, updated_at
    `;

    const result = await pool.query(query, [full_name, phone, userId]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    return result.rows[0];
  }

  /**
   * Verify password
   */
  async verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Soft delete user (set is_active = false)
   */
  async deleteUser(userId) {
    const query = 'UPDATE users SET is_active = false WHERE id = $1';
    const result = await pool.query(query, [userId]);
    
    if (result.rowCount === 0) {
      throw new Error('User not found');
    }
  }
}

module.exports = new UserService();