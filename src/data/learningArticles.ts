import { LearningArticle } from '../types';

export const LEARNING_ARTICLES: LearningArticle[] = [
  {
    id: 'art-1',
    title: 'Understanding Animal Classification: The Tree of Life',
    category: 'Classification',
    summary: 'Explore how taxonomists classify millions of living species from Kingdom down to Species, and learn how dogs, cats, and wild animals fit in.',
    readTimeMinutes: 5,
    coverImage: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Elena Rostova, Wildlife Biologist',
    publishedDate: '2026-05-12',
    keyTakeaways: [
      'Taxonomy uses 7 major ranks: Kingdom, Phylum, Class, Order, Family, Genus, Species.',
      'Scientific names use binomial nomenclature (Genus species).',
      'Genetic sequencing is redefining traditional morphological classification trees.'
    ],
    content: [
      {
        heading: 'What is Taxonomy?',
        body: 'Taxonomy is the science of naming, defining, and classifying groups of biological organisms on the basis of shared characteristics. Organisms are grouped into taxa and given a taxonomic rank.'
      },
      {
        heading: 'The Hierarchy of Life',
        body: 'From the broadest domain down to the specific species, every animal on Earth occupies a precise branch. For example, the Gray Wolf (Canis lupus) belongs to Kingdom Animalia, Phylum Chordata, Class Mammalia, Order Carnivora, Family Canidae, Genus Canis.'
      },
      {
        heading: 'Why Binomial Nomenclature Matters',
        body: 'Common names vary by region and language — "panther" can refer to a leopard, jaguar, or cougar. Using Latin binomials like Panthera onca leaves no room for ambiguity.'
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Biomes & Habitats: Where Earth’s Wildlife Thrives',
    category: 'Habitats',
    summary: 'A tour of Earth’s major biomes — from tropical rainforests and arctic tundra to coral reefs and open savannas.',
    readTimeMinutes: 6,
    coverImage: 'https://images.unsplash.com/photo-1518467166778-b88f373ffec7?auto=format&fit=crop&w=800&q=80',
    author: 'Marcus Vance, Environmental Scientist',
    publishedDate: '2026-06-02',
    keyTakeaways: [
      'Habitats supply animals with food, water, shelter, and space to reproduce.',
      'Rainforests contain over 50% of all terrestrial plant and animal species.',
      'Extreme biomes foster incredible evolutionary adaptations.'
    ],
    content: [
      {
        heading: 'The Ecosystem Balance',
        body: 'An ecosystem encompasses all living organisms alongside non-living physical factors like sunlight, temperature, soil, and water. Every species plays a vital ecological role.'
      },
      {
        heading: 'Adapting to Extreme Environments',
        body: 'Animals in the Arctic Tundra, like polar bears and snowy owls, possess thick insulation and specialized metabolic traits, while desert animals like fennec foxes feature large heat-radiating ears.'
      }
    ]
  },
  {
    id: 'art-3',
    title: 'The Essential Guide to Domestic Pet Care & Wellness',
    category: 'Pet Care',
    summary: 'Key best practices for nutrition, exercise, mental stimulation, and veterinary care for dogs and cats.',
    readTimeMinutes: 4,
    coverImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Sarah Jenkins, DVM',
    publishedDate: '2026-07-10',
    keyTakeaways: [
      'Balanced species-appropriate nutrition is the foundation of pet longevity.',
      'Daily physical exercise and mental enrichment prevent behavioral anxiety.',
      'Preventative care including routine checkups and dental hygiene extends life quality.'
    ],
    content: [
      {
        heading: 'Nutritional Requirements',
        body: 'Cats are obligate carnivores that require high dietary protein and essential taurine, whereas dogs are omnivorous carnivores that benefit from balanced proteins, complex carbohydrates, and healthy fats.'
      },
      {
        heading: 'Mental Stimulation & Play',
        body: 'Interactive puzzle toys, scent trails, and agility training keep pet minds sharp and reduce stress.'
      }
    ]
  }
];
