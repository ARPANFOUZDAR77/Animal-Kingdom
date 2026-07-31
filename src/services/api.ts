import { DogBreed, CatBreed, WildAnimal, AnimalGalleryItem } from '../types';
import { INITIAL_DOG_BREEDS } from '../data/dogBreeds';
import { INITIAL_CAT_BREEDS } from '../data/catBreeds';
import { INITIAL_WILD_ANIMALS } from '../data/wildAnimals';

// Live Dog API fetcher with local fallback
export async function fetchLiveDogBreeds(): Promise<DogBreed[]> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/list/all');
    if (!res.ok) throw new Error('Failed to fetch dog breeds list');
    const data = await res.json();
    const breedKeys = Object.keys(data.message || {}).slice(0, 20);

    const breedsWithImages = await Promise.all(
      breedKeys.map(async (key) => {
        const nameFormatted = key.charAt(0).toUpperCase() + key.slice(1);
        const existing = INITIAL_DOG_BREEDS.find(
          (b) => b.name.toLowerCase() === nameFormatted.toLowerCase()
        );

        let imgUrl = existing?.imageUrl;
        if (!imgUrl) {
          try {
            const imgRes = await fetch(`https://dog.ceo/api/breed/${key}/images/random`);
            if (imgRes.ok) {
              const imgData = await imgRes.json();
              imgUrl = imgData.message;
            }
          } catch {
            imgUrl = 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80';
          }
        }

        return {
          id: key,
          name: nameFormatted,
          subBreeds: data.message[key],
          breedGroup: existing?.breedGroup || 'Companion / Working',
          temperament: existing?.temperament || ['Friendly', 'Active', 'Loyal', 'Intelligent'],
          lifeExpectancy: existing?.lifeExpectancy || '10 - 14 years',
          weight: existing?.weight || '15 - 30 kg',
          height: existing?.height || '40 - 60 cm',
          origin: existing?.origin || 'Worldwide',
          imageUrl: imgUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
          description: existing?.description || `${nameFormatted} is an extraordinary dog breed known for loyalty and playful energy.`,
          popularityRank: existing?.popularityRank || Math.floor(Math.random() * 50) + 1,
          energyLevel: existing?.energyLevel || 4,
          trainability: existing?.trainability || 4
        };
      })
    );

    return breedsWithImages.length > 0 ? breedsWithImages : INITIAL_DOG_BREEDS;
  } catch (err) {
    console.warn('Using fallback dog breeds:', err);
    return INITIAL_DOG_BREEDS;
  }
}

// Live Random Dog Image
export async function fetchRandomDogImage(): Promise<string> {
  try {
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    if (res.ok) {
      const data = await res.json();
      return data.message;
    }
  } catch (err) {
    console.warn('Failed random dog image fetch:', err);
  }
  return 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80';
}

// Live Cat API fetcher with local fallback
export async function fetchLiveCatBreeds(): Promise<CatBreed[]> {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/breeds?limit=15');
    if (!res.ok) throw new Error('Failed to fetch cat breeds');
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      return data.map((item: any) => {
        const existing = INITIAL_CAT_BREEDS.find(
          (c) => c.name.toLowerCase() === item.name?.toLowerCase()
        );

        let imgUrl = existing?.imageUrl;
        if (!imgUrl && item.image?.url) {
          imgUrl = item.image.url;
        }

        return {
          id: item.id || item.name?.toLowerCase().replace(/\s+/g, '-'),
          name: item.name,
          origin: item.origin || existing?.origin || 'Unknown',
          temperament: item.temperament ? item.temperament.split(', ') : (existing?.temperament || ['Affectionate', 'Playful']),
          lifeSpan: item.life_span ? `${item.life_span} years` : (existing?.lifeSpan || '12 - 15 years'),
          weight: item.weight?.metric ? `${item.weight.metric} kg` : (existing?.weight || '3 - 6 kg'),
          intelligence: item.intelligence || existing?.intelligence || 4,
          affectionLevel: item.affection_level || existing?.affectionLevel || 4,
          energyLevel: item.energy_level || existing?.energyLevel || 3,
          dogFriendliness: item.dog_friendly || existing?.dogFriendliness || 4,
          childFriendliness: item.child_friendly || existing?.childFriendliness || 4,
          imageUrl: imgUrl || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
          description: item.description || existing?.description || `${item.name} is a loving and elegant cat breed.`,
          wikipediaUrl: item.wikipedia_url || existing?.wikipediaUrl
        };
      });
    }
  } catch (err) {
    console.warn('Using fallback cat breeds:', err);
  }
  return INITIAL_CAT_BREEDS;
}

// Live Random Cat Image
export async function fetchRandomCatImage(): Promise<string> {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    if (res.ok) {
      const data = await res.json();
      if (data && data[0]?.url) return data[0].url;
    }
  } catch (err) {
    console.warn('Failed random cat image fetch:', err);
  }
  return 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80';
}

// Fetch Gallery Items (Mix of Dogs, Cats, Wildlife)
export async function fetchGalleryItems(): Promise<AnimalGalleryItem[]> {
  const items: AnimalGalleryItem[] = [
    {
      id: 'gal-1',
      title: 'Majestic Male Lion in Morning Light',
      category: 'Wildlife',
      imageUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80',
      photographer: 'A. Smith',
      source: 'Unsplash',
      tags: ['Lion', 'Savanna', 'Predator', 'Mammal']
    },
    {
      id: 'gal-2',
      title: 'Golden Retriever Puppy on Field',
      category: 'Dog',
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80',
      photographer: 'J. Doe',
      source: 'Unsplash',
      tags: ['Dog', 'Golden Retriever', 'Puppy', 'Cute']
    },
    {
      id: 'gal-3',
      title: 'Curious Siamese Cat Close-up',
      category: 'Cat',
      imageUrl: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=1200&q=80',
      photographer: 'C. Miller',
      source: 'Unsplash',
      tags: ['Cat', 'Siamese', 'Eyes', 'Pet']
    },
    {
      id: 'gal-4',
      title: 'Bengal Tiger Prowling Through Water',
      category: 'Wildlife',
      imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1200&q=80',
      photographer: 'R. Patel',
      source: 'Unsplash',
      tags: ['Tiger', 'Bengal', 'Water', 'Stripes']
    },
    {
      id: 'gal-5',
      title: 'Siberian Husky in the Snow',
      category: 'Dog',
      imageUrl: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=1200&q=80',
      photographer: 'E. Frost',
      source: 'Unsplash',
      tags: ['Husky', 'Snow', 'Dog', 'Eyes']
    },
    {
      id: 'gal-6',
      title: 'Giant Panda Snacking on Fresh Bamboo',
      category: 'Wildlife',
      imageUrl: 'https://images.unsplash.com/photo-1527161153332-99adcc6f2966?auto=format&fit=crop&w=1200&q=80',
      photographer: 'L. Zhang',
      source: 'Unsplash',
      tags: ['Panda', 'Bamboo', 'China', 'Cute']
    },
    {
      id: 'gal-7',
      title: 'Maine Coon Cat Resting on Cushion',
      category: 'Cat',
      imageUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80',
      photographer: 'M. Ross',
      source: 'Unsplash',
      tags: ['Maine Coon', 'Fluffy', 'Cat']
    },
    {
      id: 'gal-8',
      title: 'Bald Eagle Soaring Over Alaskan Lake',
      category: 'Wildlife',
      imageUrl: 'https://images.unsplash.com/photo-1611689342806-0863700ce1e4?auto=format&fit=crop&w=1200&q=80',
      photographer: 'K. Vance',
      source: 'Unsplash',
      tags: ['Eagle', 'Bird', 'Raptor', 'Sky']
    }
  ];

  return items;
}
