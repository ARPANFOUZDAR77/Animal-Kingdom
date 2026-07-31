import { QuizQuestion } from '../types';

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    mode: 'Easy',
    type: 'breed_guess',
    question: 'Which dog breed is known for its dense golden coat and friendly retrieving nature?',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    options: ['Golden Retriever', 'Labrador Retriever', 'German Shepherd', 'Cocker Spaniel'],
    correctAnswerIndex: 0,
    explanation: 'The Golden Retriever is famous worldwide for its sturdy build, friendly nature, and beautiful golden coat.'
  },
  {
    id: 'q2',
    mode: 'Easy',
    type: 'image_quiz',
    question: 'Identify this giant wild feline known for its striking coat of dark stripes on reddish-orange fur.',
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=800&q=80',
    options: ['African Lion', 'Bengal Tiger', 'Leopard', 'Cheetah'],
    correctAnswerIndex: 1,
    explanation: 'The Bengal Tiger (Panthera tigris) is the national animal of India and Bangladesh, instantly recognizable by its unique stripe pattern.'
  },
  {
    id: 'q3',
    mode: 'Easy',
    type: 'multiple_choice',
    question: 'Which of the following is the largest domestic cat breed?',
    options: ['Siamese', 'Persian', 'Maine Coon', 'Sphynx'],
    correctAnswerIndex: 2,
    explanation: 'The Maine Coon is widely recognized as the largest domesticated cat breed, often nicknamed the "gentle giant".'
  },
  {
    id: 'q4',
    mode: 'Medium',
    type: 'fact_check',
    question: 'How fast can a Peregrine Falcon travel during its high-speed hunting dive (stoop)?',
    options: ['120 km/h', '240 km/h', 'Over 380 km/h', '500 km/h'],
    correctAnswerIndex: 2,
    explanation: 'The Peregrine Falcon reaches speeds exceeding 389 km/h (242 mph) during its hunting dive, making it the fastest animal on the planet.'
  },
  {
    id: 'q5',
    mode: 'Medium',
    type: 'breed_guess',
    question: 'Which cat breed is famous for its natural genetic mutation causing its ears to fold forward?',
    imageUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=800&q=80',
    options: ['Scottish Fold', 'British Shorthair', 'Russian Blue', 'Ragdoll'],
    correctAnswerIndex: 0,
    explanation: 'The Scottish Fold is named after the genetic cartilage defect that causes its ears to fold forward toward the front of its head.'
  },
  {
    id: 'q6',
    mode: 'Hard',
    type: 'multiple_choice',
    question: 'What is the scientific classification family name for cats (lions, tigers, domestic cats)?',
    options: ['Canidae', 'Felidae', 'Ursidae', 'Mustelidae'],
    correctAnswerIndex: 1,
    explanation: 'Felidae is the biological family of cats. A member of this family is called a felid.'
  },
  {
    id: 'q7',
    mode: 'Hard',
    type: 'fact_check',
    question: 'Which animal holds the record for holding its breath underwater the longest?',
    options: ['Dolphin', 'Sloth', 'Sea Turtle', 'Otter'],
    correctAnswerIndex: 1,
    explanation: 'Sloths can slow their heart rate down by two-thirds and hold their breath underwater for up to 40 minutes, beating dolphins!'
  },
  {
    id: 'q8',
    mode: 'Timed',
    type: 'image_quiz',
    question: 'Quick! Which high-altitude mammal is known as the "Ghost of the Mountains"?',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80',
    options: ['Snow Leopard', 'Mountain Lion', 'Lynx', 'Caracal'],
    correctAnswerIndex: 0,
    explanation: 'The Snow Leopard lives in the rugged ranges of Central Asia and is called the ghost of the mountains because of its elusive nature and camouflage.'
  }
];
