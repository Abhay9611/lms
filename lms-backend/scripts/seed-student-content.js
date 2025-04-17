const { Grade, Subject, Topic, Flashcard, School, sequelize } = require('../models');

const gradesData = [
  { name: 'LKG' },
  { name: 'UKG' },
  { name: 'Pre-nursery' }
];

const subjectsData = [
  { name: 'Math', code: 'MATH', description: 'Mathematics' },
  { name: 'English', code: 'ENGLISH', description: 'English Language' },
  { name: 'EVS', code: 'EVS', description: 'Environmental Studies' },
  { name: 'StoryTime', code: 'STORYTIME', description: 'Story Time' }
];

const dummyTopics = [
  { title: 'Topic 1', description: 'Description for Topic 1', url: 'https://example.com/topic1' },
  { title: 'Topic 2', description: 'Description for Topic 2', url: 'https://example.com/topic2' },
  { title: 'Topic 3', description: 'Description for Topic 3', url: 'https://example.com/topic3' }
];

async function seed() {
  try {
    await sequelize.sync();
    // Create or find a school
    const [school] = await School.findOrCreate({
      where: { code: 'DUMMY_SCHOOL' },
      defaults: {
        name: 'Demo School',
        code: 'DUMMY_SCHOOL',
        address: '123 Demo Lane',
        contactPerson: 'Demo Admin',
        contactEmail: 'admin@demo.school',
        contactPhone: '1234567890',
        isActive: true
      }
    });
    for (const gradeData of gradesData) {
      // Find or create grade with schoolId
      const [grade] = await Grade.findOrCreate({ where: { name: gradeData.name, schoolId: school.id }, defaults: { ...gradeData, schoolId: school.id, isActive: true } });
      for (const subjectData of subjectsData) {
        // Unique code per grade+subject
        const subjectCode = `${subjectData.code}_${grade.name}`;
        const [subject] = await Subject.findOrCreate({
          where: { code: subjectCode },
          defaults: {
            ...subjectData,
            code: subjectCode,
            gradeId: grade.id,
            isActive: true,
            order: 0
          }
        });
        for (let i = 0; i < dummyTopics.length; i++) {
          const topicData = dummyTopics[i];
          const topicTitle = `${subject.name} ${topicData.title}`;
          const [topic] = await Topic.findOrCreate({
            where: { title: topicTitle, subjectId: subject.id },
            defaults: {
              title: topicTitle,
              description: topicData.description,
              subjectId: subject.id,
              isActive: true,
              order: i
            }
          });
          // Add a dummy flashcard for each topic
          await Flashcard.findOrCreate({
            where: { topicId: topic.id, front: 'Sample Flashcard' },
            defaults: {
              topicId: topic.id,
              title: `${topicTitle} Flashcard`,
              front: 'Sample Flashcard',
              back: 'This is a dummy flashcard for demonstration.',
              order: 0,
              difficulty: 'EASY',
              isActive: true
            }
          });
        }
      }
    }
    console.log('✅ Seeded grades, subjects, topics, and flashcards successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err);
  } finally {
    await sequelize.close();
  }
}

seed(); 