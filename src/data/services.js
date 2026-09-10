export const services = [
  {
    id: 'driveways',
    title: 'Driveways',
    slug: 'driveways',
    description: 'Durable, elegant driveways designed for curb appeal and lasting function.',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    accent: 'Custom stone & concrete surfaces',
    features: ['Custom layout', 'Stone & concrete finishes', 'Long-lasting durability'],
  },
  {
    id: 'front-yard-landscaping',
    title: 'Front Yard Landscaping',
    slug: 'front-yard-landscaping',
    description: 'Inviting front yards that make a refined first impression with structure and softness.',
    image:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
    accent: 'Curb appeal enhancement',
    features: ['Planting plans', 'Walkways', 'Lighting integration'],
  },
  {
    id: 'backyard-landscaping',
    title: 'Backyard Landscaping',
    slug: 'backyard-landscaping',
    description: 'Create personal retreats with layered planting, seating, and functional outdoor zones.',
    image:
      'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    accent: 'Outdoor living expansion',
    features: ['Retreat styling', 'Plant palettes', 'Outdoor zones'],
  },
  {
    id: 'swimming-pool-design',
    title: 'Swimming Pool Design',
    slug: 'swimming-pool-design',
    description: 'Poolscapes that balance beauty, comfort, and seamless integration with the yard.',
    image:
      'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    accent: 'Luxury pool landscapes',
    features: ['Poolside materials', 'Water features', 'Landscape integration'],
  },
  {
    id: 'outdoor-kitchen',
    title: 'Outdoor Kitchen & Bar',
    slug: 'outdoor-kitchen',
    description: 'Entertaining spaces built for gathering, cooking, and enjoying the outdoors.',
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
    accent: 'Premium entertaining spaces',
    features: ['Built-in grills', 'Stone counters', 'Dining features'],
  },
  {
    id: 'decks-pergolas',
    title: 'Decks & Pergolas',
    slug: 'decks-pergolas',
    description: 'Architectural shade structures and elevated spaces that extend your living area outside.',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    accent: 'Outdoor structure design',
    features: ['Timber decks', 'Pergola systems', 'Shade planning'],
  },
  {
    id: 'commercial-landscaping',
    title: 'Commercial Landscaping',
    slug: 'commercial-landscaping',
    description: 'Well-maintained landscapes that elevate business presence and enhance visitor experience.',
    image:
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80',
    accent: 'Professional commercial appeal',
    features: ['Brand-first design', 'Low maintenance systems', 'Seasonal care'],
  },
  {
    id: 'stonework',
    title: 'Stonework',
    slug: 'stonework',
    description: 'Beautifully crafted stone features and surfaces that add permanence and texture.',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    accent: 'Natural texture & structure',
    features: ['Retaining walls', 'Patios', 'Walking paths'],
  },
  {
    id: 'urban-spaces',
    title: 'Urban Spaces',
    slug: 'urban-spaces',
    description: 'Compact luxury landscapes that make city living greener, calmer, and more functional.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    accent: 'Smart-use outdoor design',
    features: ['Small-space planning', 'Greenery layering', 'Functional layouts'],
  },
  {
    id: 'landscaping-gardening',
    title: 'Landscaping & Gardening',
    slug: 'landscaping-gardening',
    description: 'Thoughtful planting and garden design that thrives through every season.',
    image:
      'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
    accent: 'Seasonal planting & care',
    features: ['Planting design', 'Garden structures', 'Seasonal maintenance'],
  },
  {
    id: 'fences-decks',
    title: 'Fences & Decks',
    slug: 'fences-decks',
    description: 'Functional boundaries and elevated surfaces carefully designed to match your property.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    accent: 'Privacy, warmth & structure',
    features: ['Timber options', 'Privacy fencing', 'Deck detailing'],
  },
]

export const serviceDetails = services.reduce((acc, service) => {
  acc[service.slug] = service
  return acc
}, {})
