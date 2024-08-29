export const productSeedData = [
  {
    id: 'b917308a-a4bd-4b2a-9ef7-dde7c38401a0',
    name: 'Harry Potter and the Half-Blood Prince',
    description: 'A classic fantasy novel written by J.K. Rowling.',
    price: 19.99,
    stock: 200,
    image: 'https://example.com/images/harry-potter6.png',
    tags: ['books', 'literature'],
    rating: 4.8,
    brand: {
      id: '12a1e29f-bd78-41c3-9a87-39b7c4235d0e',
    },
    categories: [{ id: 'b2d7e81b-446d-4e5e-89b1-4f3d5d7f9c2b' }],
  },
  {
    id: 'ff36157e-8339-4a2d-9677-81e6226097cd',
    name: 'The Tales of Beedle the Bard',
    description: 'A collection of short stories by Beedle the Bard.',
    price: 9.99,
    stock: 300,
    image: 'https://example.com/images/beedle-tales.png',
    tags: ['books', 'literature'],
    rating: 4.2,
    brand: {
      id: '12a1e29f-bd78-41c3-9a87-39b7c4235d0e',
    },
    categories: [{ id: 'b2d7e81b-446d-4e5e-89b1-4f3d5d7f9c2b' }],
  },
  {
    id: '58ec3ccd-524a-40a2-b942-0798b1f193d2',
    name: 'Wooden Laptop',
    description:
      'A powerful laptop for home and work. Warning: it may catch fire!',
    price: 1499.99,
    stock: 30,
    image: 'https://example.com/images/gaming-laptop.png',
    tags: ['electronics', 'gaming'],
    rating: 4.9,
    brand: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    },
    categories: [
      { id: 'a1f5c10d-58cc-4372-b567-0e02b2c3d479' },
      { id: '0ce098c5-b311-4279-8a7a-9ad9cdd52904' },
    ],
  },
  {
    id: '402343ab-72c5-46f7-9be3-3fd2dfd6db4a',
    name: 'Cloak of Invisibility',
    description: 'Magical artefact used to render the wearer invisible',
    price: 19.99,
    stock: 97,
    image: 'https://example.com/images/invisibility_spray.png',
    tags: ['magic', 'cloak', 'invisible', 'Harry Potter'],
    brand: {
      id: '12a1e29f-bd78-41c3-9a87-39b7c4235d0e',
    },
    categories: [{ id: '59d2d97e-1a65-4cba-b5e3-9f3eb18c54dd' }],
  },
  {
    id: '98e64835-1eb7-4170-8836-fb2138b05c4d',
    name: 'Portable Quidditch Set (Broom Not Included)',
    description:
      'Play Quidditch anywhere! Just inflate the pitch and start chasing that Snitch. Brooms sold separately, and flying lessons are required.',
    price: 79.99,
    stock: 24,
    image: 'https://example.com/images/portable_quidditch_set.png',
    tags: ['quidditch', 'sports', 'wizard', 'inflatables'],
    brand: {
      id: '12a1e29f-bd78-41c3-9a87-39b7c4235d0e',
    },
    categories: [
      { id: 'cbdf0416-ae24-4b48-a318-0e2c97140b28' },
      { id: '59d2d97e-1a65-4cba-b5e3-9f3eb18c54dd' },
    ],
  },
  {
    id: 'ceae4b5c-4f48-40b9-912b-002d1d50d69b',
    name: 'Lionel Messi Toenails (Limited Edition)',
    description: 'Collect Lionel Messi´s high-quality toenails (the GOAT).',
    price: 199.99,
    stock: 10,
    image: 'https://example.com/images/messi_signature_air.png',
    tags: ['Messi', 'toenails', 'collector', 'FC Barcelona'],
    brand: {
      id: '6f94c0f4-dc1f-4d45-b3b8-5fa27f129c89',
    },
    categories: [{ id: 'cbdf0416-ae24-4b48-a318-0e2c97140b28' }],
  },
  {
    id: 'dd37e2d9-786e-4260-b7df-ef45f732345e',
    name: 'Time-Traveling Toaster',
    description:
      'This toaster may or may not send your bread back to the 1800s. Results vary; sometimes you just get perfect toast.',
    price: 49.99,
    stock: 15,
    image: 'https://example.com/images/time_traveling_toaster.png',
    tags: ['toaster', 'time travel', 'breakfast', 'chaos'],
    brand: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    },
    categories: [
      { id: 'a1f5c10d-58cc-4372-b567-0e02b2c3d479' },
      { id: '3bd12295-d32a-440f-812d-ed1afd418aea' },
    ],
  },
  {
    id: 'e7b19f90-faf0-4d04-8b49-1b71fd0a8e0b',
    name: 'Quantum Battery (Infinite Power)',
    description:
      'Charge your devices for eternity—or until you realize it´s just a regular battery. Schrödinger would approve.',
    price: 99.99,
    stock: 200,
    image: 'https://example.com/images/quantum_battery.png',
    tags: ['battery', 'quantum', 'infinite', 'tech'],
    brand: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    },
    categories: [{ id: 'a1f5c10d-58cc-4372-b567-0e02b2c3d479' }],
  },
  {
    id: 'c65a3eda-1638-4d17-8396-1defa3dcd7a9',
    name: 'Bluetooth Socks (For Wireless Walking)',
    description:
      'Sync these socks with your phone for the ultimate wireless walking experience. No one knows what they actually do, but they look cool.',
    price: 39.99,
    stock: 120,
    image: 'https://example.com/images/bluetooth_socks.png',
    tags: ['socks', 'Bluetooth', 'tech', 'fashion'],
    brand: {
      id: '7d6eae7f-5b2c-4f3e-86b7-bb20c733dc9a',
    },
    categories: [
      { id: 'a1f5c10d-58cc-4372-b567-0e02b2c3d479' },
      { id: '6580e896-0252-447c-87a7-e93676b9755a' },
    ],
  },
  {
    id: '783e52fe-3e68-4706-9a40-c8f5b8bc7faf',
    name: 'Shouting Bookshelf (Judges Your Choices)',
    description:
      'This shelf screams, "Why haven´t you read that yet?" whenever you pass by.',
    price: 79.99,
    stock: 48,
    image: 'https://example.com/images/shouting_bookshelf.png',
    tags: ['bookshelf', 'shouting', 'judgmental', 'books'],
    brand: {
      id: '9a1b8c1f-446d-4e5e-89b1-4f3d5d7f9c2b',
    },
    categories: [
      { id: 'b2d7e81b-446d-4e5e-89b1-4f3d5d7f9c2b' },
      { id: '3bd12295-d32a-440f-812d-ed1afd418aea' },
    ],
  },
  {
    id: '7dca547f-255f-4a67-8b8d-9b9db3b64aa3',
    name: 'Invisible Shoes',
    description:
      'Wear it to any event, and it will never be visible. Best for confident people.',
    price: 29.99,
    stock: 67,
    image: 'https://example.com/images/invisible_tshirt.png',
    tags: ['shoes', 'invisible', 'fashion'],
    brand: {
      id: '7d6eae7f-5b2c-4f3e-86b7-bb20c733dc9a',
    },
    categories: [{ id: '6580e896-0252-447c-87a7-e93676b9755a' }],
  },
  {
    id: '0e30e8e4-49d4-4773-81d9-75574c710782',
    name: 'Anti-Gravity Pen (Floats Just Out of Reach)',
    description:
      'This pen always floats slightly above your hand. Perfect for when you don´t want to write.',
    price: 15.99,
    stock: 250,
    image: 'https://example.com/images/anti_gravity_pen.png',
    tags: ['pen', 'anti-gravity', 'frustration', 'writing'],
    brand: {
      id: '43e77a4d-6b4a-4456-8a13-d5f7b4e7c1c5',
    },
    categories: [{ id: 'a1f5c10d-58cc-4372-b567-0e02b2c3d479' }],
  },
  {
    id: '7ea7a1e0-3f91-4687-ada9-a3d0bec89808',
    name: 'Edible USB Drives',
    description:
      'Store your data and eat it too! These USB drives are made of 100% edible materials. Disclaimer: Data loss may occur during digestion.',
    price: 24.99,
    stock: 75,
    image: 'https://example.com/images/edible_usb_drive.png',
    tags: ['USB', 'edible', 'tech', 'snack'],
    brand: {
      id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    },
    categories: [{ id: 'a1f5c10d-58cc-4372-b567-0e02b2c3d479' }],
  },
  {
    id: '46388625-5077-4a91-8f96-74dc34181e57',
    name: 'Screaming Pillows',
    description:
      'Lay your head down, while the pillow screams "Help me!" every time.',
    price: 39.99,
    stock: 100,
    image: 'https://example.com/images/screaming_pillow.png',
    tags: ['pillow', 'screaming', 'comfort'],
    brand: {
      id: '43e77a4d-6b4a-4456-8a13-d5f7b4e7c1c5',
    },
    categories: [{ id: '3bd12295-d32a-440f-812d-ed1afd418aea' }],
  },
];
