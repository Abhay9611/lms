import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../middlewares/auth';

export class UserController {
  private userService = new UserService();

  async register(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default-secret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      });

      res.status(201).json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.findUserByEmail(email);

      if (!user || !(await this.userService.validatePassword(user, password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default-secret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      });

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        token,
      });
    } catch (error) {
      res.status(400).json({ message: 'Error logging in', error });
    }
  }

  async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await this.userService.findUserById(req.user?.id || '');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      });
    } catch (error) {
      res.status(400).json({ message: 'Error fetching profile', error });
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const user = await this.userService.updateUser(req.user?.id || '', req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      });
    } catch (error) {
      res.status(400).json({ message: 'Error updating profile', error });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      res.status(500).json({ 
        message: 'Error fetching users', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  }
} 