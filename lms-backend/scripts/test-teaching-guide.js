const { School, Grade, Subject, Topic, TeachingGuide } = require('../models');
const { v4: uuidv4 } = require('uuid');

async function testTeachingGuide() {
  try {
    // Create a test school with random code
    const schoolCode = 'TEST' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const school = await School.create({
      id: uuidv4(),
      name: 'Test School',
      code: schoolCode,
      address: 'Test Address',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      pincode: '123456',
      isActive: true
    });

    console.log('Created school:', school.toJSON());

    // Create a test grade
    const grade = await Grade.create({
      id: uuidv4(),
      name: 'LKG',
      description: 'Lower Kindergarten',
      schoolId: school.id,
      isActive: true
    });

    console.log('Created grade:', grade.toJSON());

    // Create a test subject
    const subject = await Subject.create({
      id: uuidv4(),
      name: 'Math',
      description: 'Mathematics',
      gradeId: grade.id,
      order: 1,
      isActive: true
    });

    console.log('Created subject:', subject.toJSON());

    // Create a test topic
    const topic = await Topic.create({
      id: uuidv4(),
      title: 'Test Topic',
      description: 'This is a test topic',
      subjectId: subject.id,
      month: 1,
      order: 1,
      isActive: true
    });

    console.log('Created topic:', topic.toJSON());

    // Create a teaching guide for the topic
    const teachingGuide = await TeachingGuide.create({
      id: uuidv4(),
      topicId: topic.id,
      pdfUrl: 'https://example.com/test.pdf'
    });

    console.log('Created teaching guide:', teachingGuide.toJSON());

    // Query the topic with its teaching guide
    const topicWithGuide = await Topic.findOne({
      where: { id: topic.id },
      include: {
        model: TeachingGuide
      }
    });

    console.log('Topic with teaching guide:', JSON.stringify(topicWithGuide.toJSON(), null, 2));

    // Clean up
    await teachingGuide.destroy();
    await topic.destroy();
    await subject.destroy();
    await grade.destroy();
    await school.destroy();

    console.log('Test completed successfully!');
  } catch (error) {
    console.error('Error during test:', error);
  } finally {
    process.exit();
  }
}

testTeachingGuide(); 