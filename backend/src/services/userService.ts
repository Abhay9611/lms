import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password || '', 10);
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    await this.userRepository.update(id, userData);
    return this.findUserById(id);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
} 