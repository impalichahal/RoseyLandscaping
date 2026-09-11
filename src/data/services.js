import driveway1 from '../images/1.driveway.jpg'
import driveway2 from '../images/2.driveway.jpg'
import driveway3 from '../images/3.driveway.jpeg'
import driveway4 from '../images/4.driveway.jpg'
import frontyard1 from '../images/frontyard1.jpg'
import frontyard2 from '../images/frontyard2.jpg'
import frontyard3 from '../images/frontyard3.jpg'
import frontyard4 from '../images/frontyard4.jpg'
import backyard1 from '../images/backyard1.jpg'
import backyard2 from '../images/backyard2.jpg'
import backyard3 from '../images/backyard3.jpg'
import backyard4 from '../images/backyard4.jpg'
import pool1 from '../images/pool1.jpg'
import pool2 from '../images/pool2.jpg'
import pool3 from '../images/pool3.jpg'
import pool4 from '../images/pool4.jpg'
import outdoorKitchen1 from '../images/outdoorkitchen1.jpg'
import outdoorKitchen2 from '../images/outdoorkitchen2.jpg'
import outdoorKitchen3 from '../images/outdoorkitchen3.jpg'
import pergola1 from '../images/pergolas1.jpg'
import pergola2 from '../images/pergolas2.jpg'
import pergola3 from '../images/pergolas3.jpg'
import pergola4 from '../images/pergolas4.jpg'
import stonework1 from '../images/1.stonework.jpeg'
import stonework2 from '../images/2.stonework.jpeg'
import stonework3 from '../images/3.stonework.jpeg'
import stonework4 from '../images/02.stonework.jpeg'
import gardenwork1 from '../images/1.gardenwork.jpeg'
import gardenwork2 from '../images/2.gardenwork.jpeg'
import gardenwork3 from '../images/3.gardenwork.jpeg'
import gardenwork4 from '../images/4.gardenwork.jpeg'
import gardenwork5 from '../images/5gardenwork.jpg'
import fencesDecks1 from '../images/1.fencesanddecks.jpeg'

export const services = [
  {
    id: 'driveways',
    title: 'Driveways',
    slug: 'driveways',
    description: 'Durable, elegant driveways designed for curb appeal and lasting function.',
    image: driveway1,
    images: [driveway1, driveway2, driveway3, driveway4],
    accent: 'Custom stone & concrete surfaces',
    features: ['Custom layout', 'Stone & concrete finishes', 'Long-lasting durability'],
  },
  {
    id: 'front-yard-landscaping',
    title: 'Front Yard Landscaping',
    slug: 'front-yard-landscaping',
    description: 'Inviting front yards that make a refined first impression with structure and softness.',
    image: frontyard1,
    images: [frontyard1, frontyard2, frontyard3, frontyard4],
    accent: 'Curb appeal enhancement',
    features: ['Planting plans', 'Walkways', 'Lighting integration'],
  },
  {
    id: 'backyard-landscaping',
    title: 'Backyard Landscaping',
    slug: 'backyard-landscaping',
    description: 'Create personal retreats with layered planting, seating, and functional outdoor zones.',
    image: backyard1,
    images: [backyard1, backyard2, backyard3, backyard4],
    accent: 'Outdoor living expansion',
    features: ['Retreat styling', 'Plant palettes', 'Outdoor zones'],
  },
  {
    id: 'swimming-pool-design',
    title: 'Swimming Pool Design',
    slug: 'swimming-pool-design',
    description: 'Poolscapes that balance beauty, comfort, and seamless integration with the yard.',
    image: pool1,
    images: [pool1, pool2, pool3, pool4],
    accent: 'Luxury pool landscapes',
    features: ['Poolside materials', 'Water features', 'Landscape integration'],
  },
  {
    id: 'outdoor-kitchen',
    title: 'Outdoor Kitchen & Bar',
    slug: 'outdoor-kitchen',
    description: 'Entertaining spaces built for gathering, cooking, and enjoying the outdoors.',
    image: outdoorKitchen1,
    images: [outdoorKitchen1, outdoorKitchen2, outdoorKitchen3],
    accent: 'Premium entertaining spaces',
    features: ['Built-in grills', 'Stone counters', 'Dining features'],
  },
  {
    id: 'decks-pergolas',
    title: 'Decks & Pergolas',
    slug: 'decks-pergolas',
    description: 'Architectural shade structures and elevated spaces that extend your living area outside.',
    image: pergola1,
    images: [pergola1, pergola2, pergola3, pergola4],
    accent: 'Outdoor structure design',
    features: ['Timber decks', 'Pergola systems', 'Shade planning'],
  },
  {
    id: 'stonework',
    title: 'Stonework',
    slug: 'stonework',
    description: 'Beautifully crafted stone features and surfaces that add permanence and texture.',
    image: stonework1,
    images: [stonework1, stonework2, stonework3, stonework4],
    accent: 'Natural texture & structure',
    features: ['Retaining walls', 'Patios', 'Walking paths'],
  },
  {
    id: 'landscaping-gardening',
    title: 'Landscaping & Gardening',
    slug: 'landscaping-gardening',
    description: 'Thoughtful planting and garden design that thrives through every season.',
    image: gardenwork1,
    images: [gardenwork1, gardenwork2, gardenwork3, gardenwork4, gardenwork5],
    accent: 'Seasonal planting & care',
    features: ['Planting design', 'Garden structures', 'Seasonal maintenance'],
  },
  {
    id: 'fences-decks',
    title: 'Fences & Decks',
    slug: 'fences-decks',
    description: 'Functional boundaries and elevated surfaces carefully designed to match your property.',
    image: fencesDecks1,
    images: [fencesDecks1],
    accent: 'Privacy, warmth & structure',
    features: ['Timber options', 'Privacy fencing', 'Deck detailing'],
  },
]

export const serviceDetails = services.reduce((acc, service) => {
  acc[service.slug] = service
  return acc
}, {})
