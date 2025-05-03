const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ContentUpload extends Model {
    static associate(models) {
      // Define associations here
      ContentUpload.belongsTo(models.Topic, { 
        as: 'topic', 
        foreignKey: 'topicId' 
      });
      ContentUpload.belongsTo(models.User, { 
        as: 'uploadedBy', 
        foreignKey: 'uploadedById' 
      });
    }
  }

  ContentUpload.init({
    id: {
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('video', 'audio', 'document', 'image', 'interactive'),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duration in seconds for video/audio content'
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'File size in bytes'
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    topicId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Topics',
        key: 'id'
      }
    },
    uploadedById: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ContentUpload',
    indexes: [
      {
        fields: ['topicId']
      },
      {
        fields: ['type']
      },
      {
        fields: ['uploadedById']
      }
    ]
  });

  return ContentUpload;
}; 