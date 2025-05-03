import { Model, DataTypes, Optional } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../config/database';

// Define user roles
export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student'
}

// Define attributes for User
interface UserAttributes {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define attributes for User creation (id is optional)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// User model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public isActive!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to compare password
  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Please enter a valid email' },
        notEmpty: { msg: 'Email is required' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6],
          msg: 'Password must be at least 6 characters long'
        }
      }
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.STUDENT,
      validate: {
        isIn: {
          args: [Object.values(UserRole)],
          msg: 'Invalid role'
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    hooks: {
      beforeSave: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  }
);

// Sync the model with the database
const syncUserModel = async (): Promise<void> => {
  try {
    await User.sync();
    console.log('User model synchronized with database');
  } catch (error) {
    console.error('Error synchronizing User model:', error);
  }
};

syncUserModel();

export default User; 