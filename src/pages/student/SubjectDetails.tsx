
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlayCircle, 
  BookOpen, 
  CheckCircle, 
  ArrowLeft, 
  ListTodo,
  BookText,
  ScrollText 
} from 'lucide-react';
import AnimatedCharacters from '@/components/animated/AnimatedCharacters';
import Quiz, { QuizQuestion } from '@/components/learning/Quiz';
import Flashcard, { FlashcardItem } from '@/components/learning/Flashcard';
import LearningMaterials, { LearningResource } from '@/components/learning/LearningMaterials';
import { toast } from '@/components/ui/use-toast';

// Dummy subject data
const subjects = {
  '1': {
    id: '1',
    name: 'English Rhymes',
    color: 'bg-lms-pink',
    description: 'Fun rhymes and songs to learn English sounds and words',
    topics: [
      {
        id: 't1',
        title: 'Twinkle Twinkle Little Star',
        description: 'Learn this classic nursery rhyme with animations and fun activities',
        videoUrl: 'https://www.youtube.com/embed/yCjJyiqpAuU',
        quizUrl: '#/quiz/1',
        materials: [
          { title: 'Illustrated Lyrics PDF', url: '#/materials/1' },
          { title: 'Coloring Activity', url: '#/activities/1' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What twinkles in the rhyme?',
            options: ['The Sun', 'A Star', 'The Moon', 'A Light'],
            correctAnswer: 'A Star',
            explanation: 'The rhyme is about a star that twinkles in the sky!'
          },
          {
            id: 'q2',
            question: 'Where is the star in the rhyme?',
            options: ['In the garden', 'Under the bed', 'Up above the world so high', 'In a book'],
            correctAnswer: 'Up above the world so high',
            explanation: 'The star is high up in the sky, twinkling brightly!'
          },
          {
            id: 'q3',
            question: 'What is the star like in the rhyme?',
            options: ['A ball of fire', 'A diamond in the sky', 'A spaceship', 'A planet'],
            correctAnswer: 'A diamond in the sky',
            explanation: 'The star is described as being like a diamond in the sky because it shines brightly!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Twinkle',
            back: 'To shine with a flickering light'
          },
          {
            id: 'f2',
            front: 'Star',
            back: 'A bright object in space that looks like a point of light in the night sky'
          },
          {
            id: 'f3',
            front: 'Diamond',
            back: 'A precious stone that sparkles and shines'
          },
          {
            id: 'f4',
            front: 'Wonder',
            back: 'To think about something and be curious about it'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Illustrated Lyrics Sheet',
            type: 'printable',
            description: 'Colorful printable with the complete lyrics and pictures to color',
            url: '#/materials/twinkle-lyrics'
          },
          {
            id: 'lm2',
            title: 'Star Craft Activity',
            type: 'activity',
            description: 'Make your own shining star with paper and glitter',
            url: '#/activities/star-craft'
          },
          {
            id: 'lm3',
            title: 'Twinkle Rhyme Reading',
            type: 'reading',
            description: 'Read along with the illustrated story of Twinkle Twinkle',
            url: '#/reading/twinkle'
          },
          {
            id: 'lm4',
            title: 'Matching Words Worksheet',
            type: 'worksheet',
            description: 'Match words from the rhyme to pictures',
            url: '#/worksheets/twinkle-matching'
          }
        ]
      },
      {
        id: 't2',
        title: 'Baa Baa Black Sheep',
        description: 'A fun rhyme about a black sheep with beautiful animations',
        videoUrl: 'https://www.youtube.com/embed/MR5XSOdjKMA',
        quizUrl: '#/quiz/2',
        materials: [
          { title: 'Sing Along Cards', url: '#/materials/2' },
          { title: 'Animal Sounds Activity', url: '#/activities/2' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What color is the sheep in the rhyme?',
            options: ['White', 'Brown', 'Black', 'Gray'],
            correctAnswer: 'Black',
            explanation: 'The rhyme is about a black sheep!'
          },
          {
            id: 'q2',
            question: 'What does the sheep have?',
            options: ['Three bags of wool', 'Two bags of wool', 'One bag of wool', 'Four bags of wool'],
            correctAnswer: 'Three bags of wool',
            explanation: 'The sheep has three bags of wool to share!'
          },
          {
            id: 'q3',
            question: 'Who gets wool in the rhyme?',
            options: ['The king only', 'The queen only', 'The king and queen', 'The master, dame, and little boy'],
            correctAnswer: 'The master, dame, and little boy',
            explanation: 'The wool is for the master, the dame, and the little boy who lives down the lane!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Sheep',
            back: 'An animal with a thick woolly coat that says "baa"'
          },
          {
            id: 'f2',
            front: 'Wool',
            back: 'The soft, curly hair that covers a sheep'
          },
          {
            id: 'f3',
            front: 'Dame',
            back: 'An old-fashioned word for a woman or lady'
          },
          {
            id: 'f4',
            front: 'Lane',
            back: 'A narrow road, often in the countryside'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Sheep Mask Craft',
            type: 'printable',
            description: 'Make your own black sheep mask with this template',
            url: '#/materials/sheep-mask'
          },
          {
            id: 'lm2',
            title: 'Farm Animals Sounds',
            type: 'activity',
            description: 'Learn about different farm animals and the sounds they make',
            url: '#/activities/farm-sounds'
          },
          {
            id: 'lm3',
            title: 'Baa Baa Illustrated Story',
            type: 'reading',
            description: 'Read the story with beautiful illustrations',
            url: '#/reading/baa-baa'
          },
          {
            id: 'lm4',
            title: 'Counting Bags Worksheet',
            type: 'worksheet',
            description: 'Practice counting with bags of wool',
            url: '#/worksheets/counting-bags'
          }
        ]
      },
      {
        id: 't3',
        title: 'Incy Wincy Spider',
        description: 'Learn about perseverance with the little spider that never gives up!',
        videoUrl: 'https://www.youtube.com/embed/YAJynCIsNUg',
        quizUrl: '#/quiz/3',
        materials: [
          { title: 'Spider Craft Template', url: '#/materials/3' },
          { title: 'Weather Words Activity', url: '#/activities/3' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What did Incy Wincy Spider climb?',
            options: ['A tree', 'A water spout', 'A wall', 'A roof'],
            correctAnswer: 'A water spout',
            explanation: 'Incy Wincy Spider climbed up the water spout!'
          },
          {
            id: 'q2',
            question: 'What washed the spider out?',
            options: ['A dog', 'The wind', 'The rain', 'A cat'],
            correctAnswer: 'The rain',
            explanation: 'Down came the rain and washed the spider out!'
          },
          {
            id: 'q3',
            question: 'What dried up all the rain?',
            options: ['The sun', 'A towel', 'The wind', 'Heat'],
            correctAnswer: 'The sun',
            explanation: 'Out came the sun and dried up all the rain!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Spider',
            back: 'A small eight-legged creature that can spin webs'
          },
          {
            id: 'f2',
            front: 'Spout',
            back: 'A pipe or tube from which water can flow'
          },
          {
            id: 'f3',
            front: 'Rain',
            back: 'Water that falls from clouds in the sky'
          },
          {
            id: 'f4',
            front: 'Perseverance',
            back: 'Continuing to try even when things are difficult'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Spider Web Craft',
            type: 'activity',
            description: 'Create a spider web with yarn and make a little spider',
            url: '#/activities/spider-web'
          },
          {
            id: 'lm2',
            title: 'Weather Sequence Cards',
            type: 'printable',
            description: 'Cards showing rain, sun, and other weather to sequence',
            url: '#/materials/weather-cards'
          },
          {
            id: 'lm3',
            title: 'Incy Wincy Story Book',
            type: 'reading',
            description: 'Read about Incy Wincy's adventure with beautiful illustrations',
            url: '#/reading/incy-wincy'
          },
          {
            id: 'lm4',
            title: 'Up and Down Worksheet',
            type: 'worksheet',
            description: 'Practice direction concepts with up and down arrows',
            url: '#/worksheets/up-down'
          }
        ]
      }
    ]
  },
  '2': {
    id: '2',
    name: 'EVS',
    color: 'bg-lms-green',
    description: 'Explore the world around you through fun activities',
    topics: [
      {
        id: 't1',
        title: 'Plants Around Us',
        description: 'Learn about different types of plants and what they need to grow',
        videoUrl: 'https://www.youtube.com/embed/TE6xptjgNR0',
        quizUrl: '#/quiz/4',
        materials: [
          { title: 'Plant Growth Chart', url: '#/materials/4' },
          { title: 'Seed Planting Activity', url: '#/activities/4' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What do plants need to grow?',
            options: ['Only water', 'Only sunlight', 'Only soil', 'Water, sunlight, and soil'],
            correctAnswer: 'Water, sunlight, and soil',
            explanation: 'Plants need water, sunlight, and soil to grow healthy and strong!'
          },
          {
            id: 'q2',
            question: 'Which part of the plant absorbs water from the soil?',
            options: ['Leaves', 'Stem', 'Roots', 'Flowers'],
            correctAnswer: 'Roots',
            explanation: 'The roots grow into the soil and absorb water and nutrients!'
          },
          {
            id: 'q3',
            question: 'What do leaves do for a plant?',
            options: ['Make food using sunlight', 'Drink water', 'Hold the plant up', 'Produce seeds'],
            correctAnswer: 'Make food using sunlight',
            explanation: 'Leaves use sunlight to make food for the plant in a process called photosynthesis!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Roots',
            back: 'The part of a plant that grows underground and absorbs water and nutrients'
          },
          {
            id: 'f2',
            front: 'Stem',
            back: 'The main body or stalk of a plant'
          },
          {
            id: 'f3',
            front: 'Leaves',
            back: 'The green parts of a plant that make food using sunlight'
          },
          {
            id: 'f4',
            front: 'Flower',
            back: 'The colorful part of a plant that can develop into fruit or seeds'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Seed Germination Journal',
            type: 'printable',
            description: 'Track the growth of your seeds with this printable journal',
            url: '#/materials/seed-journal'
          },
          {
            id: 'lm2',
            title: 'Parts of a Plant',
            type: 'worksheet',
            description: 'Label the different parts of a plant',
            url: '#/worksheets/plant-parts'
          },
          {
            id: 'lm3',
            title: 'Plant Life Cycle',
            type: 'reading',
            description: 'Learn about how plants grow from seeds to full plants',
            url: '#/reading/plant-lifecycle'
          },
          {
            id: 'lm4',
            title: 'Leaf Rubbing Activity',
            type: 'activity',
            description: 'Collect different leaves and make leaf rubbings to observe patterns',
            url: '#/activities/leaf-rubbing'
          }
        ]
      },
      {
        id: 't2',
        title: 'Wild Animals',
        description: 'Discover fascinating facts about animals living in the wild',
        videoUrl: 'https://www.youtube.com/embed/CA6Mofzh7jo',
        quizUrl: '#/quiz/5',
        materials: [
          { title: 'Animal Habitats Poster', url: '#/materials/5' },
          { title: 'Animal Sounds Activity', url: '#/activities/5' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Where do lions live?',
            options: ['In the ocean', 'In the jungle and grasslands', 'In the Arctic', 'In the mountains'],
            correctAnswer: 'In the jungle and grasslands',
            explanation: 'Lions are found in jungles and grasslands in Africa!'
          },
          {
            id: 'q2',
            question: 'What do elephants use their trunks for?',
            options: ['Only for making sounds', 'Only for eating', 'Only for drinking', 'Breathing, grabbing food, drinking water, and more'],
            correctAnswer: 'Breathing, grabbing food, drinking water, and more',
            explanation: 'Elephant trunks are very useful and can do many things!'
          },
          {
            id: 'q3',
            question: 'Which animal can fly?',
            options: ['Snake', 'Fish', 'Bird', 'Tiger'],
            correctAnswer: 'Bird',
            explanation: 'Birds have wings that help them fly in the sky!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Habitat',
            back: 'The natural home or environment of an animal or plant'
          },
          {
            id: 'f2',
            front: 'Predator',
            back: 'An animal that hunts other animals for food'
          },
          {
            id: 'f3',
            front: 'Herbivore',
            back: 'An animal that eats only plants'
          },
          {
            id: 'f4',
            front: 'Carnivore',
            back: 'An animal that eats only meat'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Animal Habitat Matching',
            type: 'worksheet',
            description: 'Match different animals to their habitats',
            url: '#/worksheets/habitat-matching'
          },
          {
            id: 'lm2',
            title: 'Animal Mask Templates',
            type: 'printable',
            description: 'Make masks of different wild animals',
            url: '#/materials/animal-masks'
          },
          {
            id: 'lm3',
            title: 'Wild Animal Facts Book',
            type: 'reading',
            description: 'Read interesting facts about different wild animals',
            url: '#/reading/animal-facts'
          },
          {
            id: 'lm4',
            title: 'Food Chain Activity',
            type: 'activity',
            description: 'Learn about what animals eat with this interactive activity',
            url: '#/activities/food-chain'
          }
        ]
      },
      {
        id: 't3',
        title: 'Water Cycle',
        description: 'See how water moves through our world in a never-ending cycle',
        videoUrl: 'https://www.youtube.com/embed/ncORPosDrjI',
        quizUrl: '#/quiz/6',
        materials: [
          { title: 'Water Cycle Diagram', url: '#/materials/6' },
          { title: 'Cloud in a Jar Experiment', url: '#/activities/6' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What happens to water when it gets very hot?',
            options: ['It freezes', 'It evaporates', 'It disappears forever', 'It turns into soil'],
            correctAnswer: 'It evaporates',
            explanation: 'When water gets hot, it turns into water vapor and rises into the air. This is called evaporation!'
          },
          {
            id: 'q2',
            question: 'What are clouds made of?',
            options: ['Cotton', 'Smoke', 'Water droplets', 'Snow'],
            correctAnswer: 'Water droplets',
            explanation: 'Clouds are made of tiny water droplets that have condensed from water vapor in the air!'
          },
          {
            id: 'q3',
            question: 'What is precipitation?',
            options: ['When clouds form', 'When water evaporates', 'When water falls from clouds as rain, snow, or hail', 'When water freezes'],
            correctAnswer: 'When water falls from clouds as rain, snow, or hail',
            explanation: 'Precipitation is when water falls from clouds back to Earth as rain, snow, or hail!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Evaporation',
            back: 'When water turns into vapor and rises into the air'
          },
          {
            id: 'f2',
            front: 'Condensation',
            back: 'When water vapor cools and changes into water droplets to form clouds'
          },
          {
            id: 'f3',
            front: 'Precipitation',
            back: 'When water falls from clouds as rain, snow, sleet, or hail'
          },
          {
            id: 'f4',
            front: 'Collection',
            back: 'When water gathers in oceans, rivers, lakes, and groundwater'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Water Cycle Wheel',
            type: 'printable',
            description: 'A rotating wheel that shows the stages of the water cycle',
            url: '#/materials/water-wheel'
          },
          {
            id: 'lm2',
            title: 'Rain Cloud in a Jar',
            type: 'activity',
            description: 'Create your own mini water cycle with this simple experiment',
            url: '#/activities/cloud-jar'
          },
          {
            id: 'lm3',
            title: 'The Journey of a Raindrop',
            type: 'reading',
            description: 'Follow a raindrop as it travels through the water cycle',
            url: '#/reading/raindrop-journey'
          },
          {
            id: 'lm4',
            title: 'Water Cycle Sequencing',
            type: 'worksheet',
            description: 'Put the stages of the water cycle in the correct order',
            url: '#/worksheets/cycle-sequence'
          }
        ]
      }
    ]
  },
  '3': {
    id: '3',
    name: 'Maths',
    color: 'bg-lms-blue',
    description: 'Learn counting, shapes, and basic math through games',
    topics: [
      {
        id: 't1',
        title: 'Counting Numbers 1-10',
        description: 'Learn to count objects and recognize number symbols',
        videoUrl: 'https://www.youtube.com/embed/DR-cfDsHCGA',
        quizUrl: '#/quiz/7',
        materials: [
          { title: 'Number Flashcards', url: '#/materials/7' },
          { title: 'Counting Game', url: '#/activities/7' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'How many apples are in the picture?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '5',
            explanation: 'If you count carefully, you can see 5 apples in the picture!'
          },
          {
            id: 'q2',
            question: 'What number comes after 7?',
            options: ['6', '8', '9', '10'],
            correctAnswer: '8',
            explanation: 'When counting, 8 comes right after 7!'
          },
          {
            id: 'q3',
            question: 'What number comes before 4?',
            options: ['2', '3', '5', '6'],
            correctAnswer: '3',
            explanation: 'When counting, 3 comes right before 4!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: '1',
            back: 'One - This is how one looks like: ●'
          },
          {
            id: 'f2',
            front: '2',
            back: 'Two - This is how two looks like: ● ●'
          },
          {
            id: 'f3',
            front: '5',
            back: 'Five - This is how five looks like: ● ● ● ● ●'
          },
          {
            id: 'f4',
            front: '10',
            back: 'Ten - This is how ten looks like: ● ● ● ● ● ● ● ● ● ●'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Number Tracing Sheets',
            type: 'printable',
            description: 'Practice writing numbers 1-10 with these tracing worksheets',
            url: '#/materials/number-tracing'
          },
          {
            id: 'lm2',
            title: 'Counting Objects Worksheet',
            type: 'worksheet',
            description: 'Count different groups of objects and write the numbers',
            url: '#/worksheets/counting-objects'
          },
          {
            id: 'lm3',
            title: 'Number Rhymes Book',
            type: 'reading',
            description: 'Fun rhymes to help remember numbers 1-10',
            url: '#/reading/number-rhymes'
          },
          {
            id: 'lm4',
            title: 'Counting Beads Activity',
            type: 'activity',
            description: 'Use beads to practice counting and making patterns',
            url: '#/activities/counting-beads'
          }
        ]
      },
      {
        id: 't2',
        title: 'Basic Shapes',
        description: 'Identify circles, squares, triangles and more!',
        videoUrl: 'https://www.youtube.com/embed/dsR0h50BiFQ',
        quizUrl: '#/quiz/8',
        materials: [
          { title: 'Shape Matching Cards', url: '#/materials/8' },
          { title: 'Shape Hunt Activity', url: '#/activities/8' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Which shape has 3 sides?',
            options: ['Circle', 'Square', 'Triangle', 'Rectangle'],
            correctAnswer: 'Triangle',
            explanation: 'A triangle has exactly 3 sides and 3 corners!'
          },
          {
            id: 'q2',
            question: 'Which shape has 4 equal sides?',
            options: ['Circle', 'Square', 'Triangle', 'Rectangle'],
            correctAnswer: 'Square',
            explanation: 'A square has 4 sides that are all the same length!'
          },
          {
            id: 'q3',
            question: 'Which shape has no corners?',
            options: ['Circle', 'Square', 'Triangle', 'Rectangle'],
            correctAnswer: 'Circle',
            explanation: 'A circle is round and has no corners or straight sides!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Circle',
            back: 'A round shape with no corners'
          },
          {
            id: 'f2',
            front: 'Square',
            back: 'A shape with 4 equal sides and 4 corners'
          },
          {
            id: 'f3',
            front: 'Triangle',
            back: 'A shape with 3 sides and 3 corners'
          },
          {
            id: 'f4',
            front: 'Rectangle',
            back: 'A shape with 4 sides and 4 corners, where opposite sides are equal'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Shape Tracing Worksheets',
            type: 'printable',
            description: 'Practice drawing different shapes with these templates',
            url: '#/materials/shape-tracing'
          },
          {
            id: 'lm2',
            title: 'Shape Sorting Activity',
            type: 'activity',
            description: 'Sort objects by their shapes in this fun activity',
            url: '#/activities/shape-sort'
          },
          {
            id: 'lm3',
            title: 'Shapes All Around Us',
            type: 'reading',
            description: 'Read about how shapes are found everywhere in our world',
            url: '#/reading/shapes-around'
          },
          {
            id: 'lm4',
            title: 'Shape Identification',
            type: 'worksheet',
            description: 'Identify different shapes in pictures',
            url: '#/worksheets/shape-id'
          }
        ]
      },
      {
        id: 't3',
        title: 'Simple Addition',
        description: 'Learn to add numbers together with fun visual examples',
        videoUrl: 'https://www.youtube.com/embed/AkQUULgG8VY',
        quizUrl: '#/quiz/9',
        materials: [
          { title: 'Addition Worksheet', url: '#/materials/9' },
          { title: 'Addition Game', url: '#/activities/9' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What is 2 + 3?',
            options: ['4', '5', '6', '7'],
            correctAnswer: '5',
            explanation: 'When you add 2 and 3 together, you get 5! Count 2 fingers and then 3 more - that makes 5 fingers!'
          },
          {
            id: 'q2',
            question: 'What is 1 + 4?',
            options: ['3', '4', '5', '6'],
            correctAnswer: '5',
            explanation: 'When you add 1 and 4 together, you get 5!'
          },
          {
            id: 'q3',
            question: 'What is 3 + 3?',
            options: ['5', '6', '7', '8'],
            correctAnswer: '6',
            explanation: 'When you add 3 and 3 together, you get 6!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: '1 + 1 = ?',
            back: '2'
          },
          {
            id: 'f2',
            front: '2 + 2 = ?',
            back: '4'
          },
          {
            id: 'f3',
            front: '3 + 2 = ?',
            back: '5'
          },
          {
            id: 'f4',
            front: '4 + 3 = ?',
            back: '7'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Addition with Pictures',
            type: 'worksheet',
            description: 'Practice adding by counting pictures of objects',
            url: '#/worksheets/picture-addition'
          },
          {
            id: 'lm2',
            title: 'Addition Dot Cards',
            type: 'printable',
            description: 'Cards showing addition problems with dots to count',
            url: '#/materials/dot-cards'
          },
          {
            id: 'lm3',
            title: 'Addition Stories',
            type: 'reading',
            description: 'Read simple stories that involve adding things together',
            url: '#/reading/addition-stories'
          },
          {
            id: 'lm4',
            title: 'Number Line Jumping',
            type: 'activity',
            description: 'Use a number line to practice addition by jumping forward',
            url: '#/activities/number-line'
          }
        ]
      }
    ]
  },
  '4': {
    id: '4',
    name: 'Story Time',
    color: 'bg-lms-purple',
    description: 'Amazing stories with colorful pictures and fun activities',
    topics: [
      {
        id: 't1',
        title: 'The Three Little Pigs',
        description: 'A classic tale about three pig brothers and a big bad wolf',
        videoUrl: 'https://www.youtube.com/embed/QLR2pLUsl-Y',
        quizUrl: '#/quiz/10',
        materials: [
          { title: 'Story Sequence Cards', url: '#/materials/10' },
          { title: 'House Building Activity', url: '#/activities/10' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What did the first little pig build his house with?',
            options: ['Straw', 'Sticks', 'Bricks', 'Mud'],
            correctAnswer: 'Straw',
            explanation: 'The first little pig built his house using straw!'
          },
          {
            id: 'q2',
            question: 'What did the wolf do to the first two houses?',
            options: ['Painted them', 'Knocked on the door', 'Blew them down', 'Climbed over them'],
            correctAnswer: 'Blew them down',
            explanation: 'The wolf huffed and puffed and blew the houses down!'
          },
          {
            id: 'q3',
            question: 'Which house could not be blown down?',
            options: ['The straw house', 'The stick house', 'The brick house', 'The mud house'],
            correctAnswer: 'The brick house',
            explanation: 'The brick house was strong and could not be blown down by the wolf!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Straw',
            back: 'Dry stalks of wheat or other grains'
          },
          {
            id: 'f2',
            front: 'Sticks',
            back: 'Small branches or twigs from trees'
          },
          {
            id: 'f3',
            front: 'Bricks',
            back: 'Blocks of clay that are baked hard and used for building'
          },
          {
            id: 'f4',
            front: 'Wolf',
            back: 'A wild animal similar to a large dog that howls'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Three Little Pigs Masks',
            type: 'printable',
            description: 'Pig and wolf masks for acting out the story',
            url: '#/materials/pig-masks'
          },
          {
            id: 'lm2',
            title: 'Building Materials Test',
            type: 'activity',
            description: 'Test different materials to see which ones are strongest',
            url: '#/activities/building-test'
          },
          {
            id: 'lm3',
            title: 'Three Little Pigs Storybook',
            type: 'reading',
            description: 'Read the complete story with beautiful illustrations',
            url: '#/reading/three-pigs'
          },
          {
            id: 'lm4',
            title: 'Story Sequencing',
            type: 'worksheet',
            description: 'Put the events of the story in the correct order',
            url: '#/worksheets/pigs-sequence'
          }
        ]
      },
      {
        id: 't2',
        title: 'Little Red Riding Hood',
        description: 'Join Little Red on her adventure through the forest',
        videoUrl: 'https://www.youtube.com/embed/LDMWJCrDVMI',
        quizUrl: '#/quiz/11',
        materials: [
          { title: 'Character Masks', url: '#/materials/11' },
          { title: 'Story Map Activity', url: '#/activities/11' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'What color was the hood?',
            options: ['Blue', 'Green', 'Red', 'Yellow'],
            correctAnswer: 'Red',
            explanation: 'The girl wore a red hood, which is why she is called Little Red Riding Hood!'
          },
          {
            id: 'q2',
            question: 'Where was Little Red Riding Hood going?',
            options: ['To school', 'To the park', 'To the market', 'To Grandmother\'s house'],
            correctAnswer: 'To Grandmother\'s house',
            explanation: 'She was going to visit her grandmother who was sick!'
          },
          {
            id: 'q3',
            question: 'Who rescued Little Red Riding Hood and her grandmother?',
            options: ['A hunter', 'Her father', 'A friendly bear', 'Another wolf'],
            correctAnswer: 'A hunter',
            explanation: 'A hunter heard the commotion and came to rescue them!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Hood',
            back: 'A covering for the head and neck'
          },
          {
            id: 'f2',
            front: 'Forest',
            back: 'A large area covered with trees and plants'
          },
          {
            id: 'f3',
            front: 'Grandmother',
            back: 'The mother of your mother or father'
          },
          {
            id: 'f4',
            front: 'Basket',
            back: 'A container made of woven material'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Red Riding Hood Puppet Set',
            type: 'printable',
            description: 'Make stick puppets of all the characters',
            url: '#/materials/puppets'
          },
          {
            id: 'lm2',
            title: 'Forest Safety Rules',
            type: 'worksheet',
            description: 'Learn about safety rules when outdoors',
            url: '#/worksheets/forest-safety'
          },
          {
            id: 'lm3',
            title: 'Little Red Riding Hood Book',
            type: 'reading',
            description: 'Read the complete story with colorful illustrations',
            url: '#/reading/red-riding'
          },
          {
            id: 'lm4',
            title: 'Path Through the Forest',
            type: 'activity',
            description: 'Create a map of the path through the forest',
            url: '#/activities/forest-path'
          }
        ]
      },
      {
        id: 't3',
        title: 'The Gingerbread Man',
        description: 'Can you catch the clever gingerbread man?',
        videoUrl: 'https://www.youtube.com/embed/YoQyyB5xvLk',
        quizUrl: '#/quiz/12',
        materials: [
          { title: 'Gingerbread Recipe', url: '#/materials/12' },
          { title: 'Running Race Game', url: '#/activities/12' }
        ],
        quiz: [
          {
            id: 'q1',
            question: 'Who made the Gingerbread Man?',
            options: ['A baker', 'A little boy', 'An old woman', 'A chef'],
            correctAnswer: 'An old woman',
            explanation: 'An old woman baked the Gingerbread Man in her oven!'
          },
          {
            id: 'q2',
            question: 'What did the Gingerbread Man say when he ran away?',
            options: ['Catch me if you can!', 'See you later!', 'Run, run as fast as you can, you can\'t catch me, I\'m the Gingerbread Man!', 'Goodbye!'],
            correctAnswer: 'Run, run as fast as you can, you can\'t catch me, I\'m the Gingerbread Man!',
            explanation: 'That was his special saying as he ran away from everyone!'
          },
          {
            id: 'q3',
            question: 'Who finally caught the Gingerbread Man?',
            options: ['A dog', 'A fox', 'A boy', 'A horse'],
            correctAnswer: 'A fox',
            explanation: 'The clever fox tricked the Gingerbread Man and caught him!'
          }
        ],
        flashcards: [
          {
            id: 'f1',
            front: 'Gingerbread',
            back: 'A type of sweet cookie made with ginger, molasses, and spices'
          },
          {
            id: 'f2',
            front: 'Clever',
            back: 'Smart or intelligent'
          },
          {
            id: 'f3',
            front: 'Fox',
            back: 'A wild animal with a bushy tail and pointed ears'
          },
          {
            id: 'f4',
            front: 'River',
            back: 'A large natural stream of water flowing in a channel'
          }
        ],
        learningMaterials: [
          {
            id: 'lm1',
            title: 'Gingerbread Man Template',
            type: 'printable',
            description: 'Template for creating your own paper gingerbread men',
            url: '#/materials/gingerbread-template'
          },
          {
            id: 'lm2',
            title: 'Story Characters Wheel',
            type: 'activity',
            description: 'A spinning wheel showing all the characters who chased the Gingerbread Man',
            url: '#/activities/character-wheel'
          },
          {
            id: 'lm3',
            title: 'The Gingerbread Man Story',
            type: 'reading',
            description: 'Read the complete tale with colorful illustrations',
            url: '#/reading/gingerbread'
          },
          {
            id: 'lm4',
            title: 'Story Sequence Cards',
            type: 'worksheet',
            description: 'Put the events of the story in the correct order',
            url: '#/worksheets/gingerbread-sequence'
          }
        ]
      }
    ]
  }
};

const SubjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('video');
  
  const subject = id ? subjects[id as keyof typeof subjects] : null;
  
  if (!subject) {
    return (
      <DashboardLayout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Subject not found</h2>
          <Button onClick={() => navigate('/student/subjects')}>Go back to subjects</Button>
        </div>
      </DashboardLayout>
    );
  }

  const currentTopic = selectedTopic 
    ? subject.topics.find(t => t.id === selectedTopic) 
    : subject.topics[0];
  
  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    setActiveTab('video');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleQuizComplete = (score: number, total: number) => {
    const percentage = Math.round((score / total) * 100);
    toast({
      title: `Quiz completed!`,
      description: `You scored ${score} out of ${total} (${percentage}%)`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 relative">
        <AnimatedCharacters variant="school" density="low" />
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate('/student/subjects')}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className={`text-3xl font-bubbly font-bold ${subject.color.replace('bg-', 'text-')}`}>
              {subject.name}
            </h1>
          </div>
        </div>
        
        <p className="text-lg text-muted-foreground mb-6 font-round">{subject.description}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Topic selection sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-4 border-dashed sticky top-4 rounded-3xl overflow-hidden">
              <CardHeader className={`${subject.color} bg-opacity-20`}>
                <CardTitle className="text-lg font-bubbly">Topics</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {subject.topics.map((topic) => (
                    <Button 
                      key={topic.id}
                      variant={topic.id === (selectedTopic || subject.topics[0].id) ? "default" : "outline"}
                      className={`w-full justify-start text-left rounded-xl ${
                        topic.id === (selectedTopic || subject.topics[0].id) 
                          ? subject.color
                          : "hover:" + subject.color
                      }`}
                      onClick={() => handleTopicSelect(topic.id)}
                    >
                      <div className="truncate">{topic.title}</div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Content area */}
          <div className="lg:col-span-3">
            <Card className="border-4 border-dashed rounded-3xl overflow-hidden">
              <CardHeader className={`${subject.color} bg-opacity-20`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle className="text-xl font-bubbly">{currentTopic?.title}</CardTitle>
                  <Tabs value={activeTab} className="mt-4 sm:mt-0" onValueChange={handleTabChange}>
                    <TabsList className="grid grid-cols-4 w-full sm:w-auto">
                      <TabsTrigger value="video" className="text-sm">
                        <PlayCircle className="h-4 w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Video</span>
                      </TabsTrigger>
                      <TabsTrigger value="quiz" className="text-sm">
                        <CheckCircle className="h-4 w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Quiz</span>
                      </TabsTrigger>
                      <TabsTrigger value="flashcards" className="text-sm">
                        <ScrollText className="h-4 w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Flashcards</span>
                      </TabsTrigger>
                      <TabsTrigger value="materials" className="text-sm">
                        <BookText className="h-4 w-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Materials</span>
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {currentTopic && (
                  <div>
                    <TabsContent value="video" className="mt-0">
                      <p className="text-muted-foreground mb-6 font-round">{currentTopic.description}</p>
                      <div className="aspect-video bg-black mb-6 rounded-xl overflow-hidden">
                        <iframe 
                          src={currentTopic.videoUrl} 
                          title={currentTopic.title}
                          className="w-full h-full"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="quiz" className="mt-0">
                      {currentTopic.quiz && (
                        <Quiz 
                          title={`Quiz: ${currentTopic.title}`}
                          description="Let's see how much you've learned!"
                          questions={currentTopic.quiz}
                          onComplete={handleQuizComplete}
                          subjectColor={subject.color}
                        />
                      )}
                    </TabsContent>
                    
                    <TabsContent value="flashcards" className="mt-0">
                      {currentTopic.flashcards && (
                        <Flashcard 
                          cards={currentTopic.flashcards}
                          subjectColor={subject.color}
                        />
                      )}
                    </TabsContent>
                    
                    <TabsContent value="materials" className="mt-0">
                      {currentTopic.learningMaterials && (
                        <LearningMaterials 
                          resources={currentTopic.learningMaterials}
                          subjectColor={subject.color}
                        />
                      )}
                    </TabsContent>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubjectDetails;
