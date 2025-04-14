import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export class UserService {
  async createUser(userData: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password || '', 10);
    return User.create({
      ...userData,
      password: hashedPassword,
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return User.findByPk(id);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    await User.update(userData, { where: { id } });
    return this.findUserById(id);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await User.destroy({ where: { id } });
    return result > 0;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async getAllUsers(): Promise<User[]> {
    return User.findAll({
      attributes: { exclude: ['password'] }
    });
  }
} 