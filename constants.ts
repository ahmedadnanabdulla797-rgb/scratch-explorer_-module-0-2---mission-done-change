import { Module, LessonStatus } from './types';

export const FULL_CURRICULUM: Module[] = [
  {
    id: 'module-0',
    title: 'Module 0: Welcome!',
    lessons: [
      {
        id: '0.1',
        title: 'Level 1: What is Scratch?',
        description: 'Friendly intro to coding for kids.',
        type: 'content',
        status: LessonStatus.AVAILABLE,
        stars: 50,
        content: "Scratch is like a toy box! 🧸\n\nYou use 'Magic Blocks' to tell characters what to do.\n\nIt's like playing with digital LEGOs! 🧱✨"
      },
      {
        id: '0.2',
        title: 'Level 2: Your Workshop',
        description: 'Meet your coding playground.',
        type: 'content',
        status: LessonStatus.AVAILABLE,
        stars: 50,
        content: "Look at your screen! \n\n🐱 **The Stage**: The cat's playground.\n🧱 **Blocks**: Your special tools.\n📋 **Script**: Where you build your rules!"
      }
    ]
  },
  {
    id: 'module-1',
    title: 'Module 1: Coordinates',
    lessons: [
      {
        id: '1.1',
        title: 'Level 1: Secret Maps',
        description: 'Learn the X and Y secret code!',
        type: 'content',
        status: LessonStatus.AVAILABLE,
        stars: 100,
        content: "Every spot on the map has a secret code!\n\n↔️ **X** is for Side-to-Side.\n↕️ **Y** is for Up-and-Down.\n\nMatch the numbers to find the target! 📍"
      },
      {
        id: '1.2',
        title: 'Level 2: Treasure Hunt',
        description: 'Type the code to move the cat!',
        type: 'project',
        status: LessonStatus.AVAILABLE,
        stars: 300,
        content: 'COORDINATE_GAME'
      },
      {
        id: '1.3',
        title: 'Level 3: Map Quiz',
        description: 'Do you know the secret codes?',
        type: 'quiz',
        status: LessonStatus.AVAILABLE,
        stars: 150,
        content: 'QUIZ_COORDINATES'
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2: Magic Rules',
    lessons: [
      {
        id: '2.1',
        title: 'Level 1: The Magic Rule',
        description: 'Learn that things happen for a reason!',
        type: 'content',
        status: LessonStatus.AVAILABLE,
        stars: 150,
        content: "A 'Magic Rule' (Event) is a Trigger! 🛎️\n\nRule: **WHEN** I click, **THEN** move!\n\n🟡 **Yellow Blocks** = The 'When'\n🔵 **Blue Blocks** = The 'Then'"
      },
      {
        id: '2.2',
        title: 'Level 2: Rule Maker',
        description: 'Connect rules to make the cat dance!',
        type: 'project',
        status: LessonStatus.AVAILABLE,
        stars: 400,
        content: 'EVENTS_GAME'
      },
      {
        id: '2.3',
        title: 'Level 3: Rules Quiz',
        description: 'Can you match the magic blocks?',
        type: 'quiz',
        status: LessonStatus.AVAILABLE,
        stars: 150,
        content: 'QUIZ_EVENTS'
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3: Robot Brains',
    lessons: [
      {
        id: '3.1',
        title: 'Level 1: Do It Again!',
        description: 'Make Kit dance over and over.',
        type: 'project',
        status: LessonStatus.AVAILABLE,
        stars: 250,
        content: 'LOOP_GAME_EASY'
      },
      {
        id: '3.2',
        title: 'Level 2: Loop Quiz',
        description: 'Checking your loop skills!',
        type: 'quiz',
        status: LessonStatus.AVAILABLE,
        stars: 150,
        content: 'QUIZ_MODULE_3'
      },
      {
        id: '3.3',
        title: 'Level 3: Thinking Robot',
        description: 'Teach Kit to turn at the walls!',
        type: 'project',
        status: LessonStatus.AVAILABLE,
        stars: 300,
        content: 'CONDITION_GAME_EASY'
      },
      {
        id: '3.4',
        title: 'Level 4: Brain Quiz',
        description: 'Does the robot have a brain?',
        type: 'quiz',
        status: LessonStatus.AVAILABLE,
        stars: 150,
        content: 'QUIZ_CONDITIONS'
      }
    ]
  }
];