import { Evolution, Player } from './types';

export const evolutions: Evolution[] = [
  {
    id: 'evo1',
    name: 'Striker Specialist',
    unlockDate: '2025-05-01',
    expiryDate: '2025-06-15',
    cost: 'FREE',
    requirements: [
      'Player must be ST position',
      'Overall rating must be below 85',
      'Complete 5 matches with the player'
    ],
    effects: {
      pace: 2,
      shooting: 3,
      dribbling: 1
    },
    finalBonus: '+5 Finishing when all steps completed'
  },
  {
    id: 'evo2',
    name: 'Midfield Maestro',
    unlockDate: '2025-05-10',
    expiryDate: '2025-06-30',
    cost: 'FREE',
    requirements: [
      'Player must be CM, CAM or CDM position',
      'Overall rating must be below 86',
      'Complete 8 matches with the player'
    ],
    effects: {
      passing: 3,
      dribbling: 2,
      physical: 1
    },
    finalBonus: '+5 Vision when all steps completed'
  },
  {
    id: 'evo3',
    name: 'Defensive Wall',
    unlockDate: '2025-05-15',
    expiryDate: '2025-07-15',
    cost: 5000,
    requirements: [
      'Player must be CB, LB, RB position',
      'Overall rating must be below 84',
      'Complete 6 matches with the player'
    ],
    effects: {
      pace: 1,
      defending: 3,
      physical: 2
    },
    finalBonus: '+5 Standing Tackle when all steps completed'
  },
  {
    id: 'evo4',
    name: 'Speedster',
    unlockDate: '2025-05-20',
    expiryDate: '2025-07-01',
    cost: 10000,
    requirements: [
      'Player must be LW, RW, LM, RM position',
      'Overall rating must be below 85',
      'Complete 7 matches with the player'
    ],
    effects: {
      pace: 3,
      dribbling: 2,
      shooting: 1
    },
    finalBonus: '+5 Acceleration when all steps completed'
  },
  {
    id: 'evo5',
    name: 'Complete Forward',
    unlockDate: '2025-06-01',
    expiryDate: '2025-07-30',
    cost: 15000,
    requirements: [
      'Player must be ST, CF position',
      'Overall rating must be below 87',
      'Complete 10 matches with the player'
    ],
    effects: {
      shooting: 2,
      passing: 2,
      dribbling: 2
    },
    finalBonus: '+5 Composure when all steps completed'
  }
];

export const players: Player[] = [
  {
    id: 'player1',
    name: 'Marcus Rashford',
    position: 'ST',
    overall: 83,
    stats: {
      pace: 87,
      shooting: 82,
      passing: 75,
      dribbling: 81,
      defending: 42,
      physical: 74
    },
    playStyles: {
      normal: ['Finesse Shot', 'Speed Dribbler'],
      plus: ['Quick Step+']
    },
    availableEvolutions: ['evo1', 'evo5']
  },
  {
    id: 'player2',
    name: 'Mason Mount',
    position: 'CAM',
    overall: 82,
    stats: {
      pace: 74,
      shooting: 78,
      passing: 83,
      dribbling: 82,
      defending: 64,
      physical: 69
    },
    playStyles: {
      normal: ['Technical', 'Incisive Pass'],
      plus: []
    },
    availableEvolutions: ['evo2']
  },
  {
    id: 'player3',
    name: 'Reece James',
    position: 'RB',
    overall: 81,
    stats: {
      pace: 80,
      shooting: 65,
      passing: 79,
      dribbling: 77,
      defending: 80,
      physical: 82
    },
    playStyles: {
      normal: ['Whipped Pass', 'Tackling'],
      plus: ['Anticipate+']
    },
    availableEvolutions: ['evo3']
  },
  {
    id: 'player4',
    name: 'Antony',
    position: 'RW',
    overall: 80,
    stats: {
      pace: 84,
      shooting: 77,
      passing: 76,
      dribbling: 84,
      defending: 36,
      physical: 68
    },
    playStyles: {
      normal: ['Flair', 'Technical'],
      plus: []
    },
    availableEvolutions: ['evo4']
  },
  {
    id: 'player5',
    name: 'Dominic Calvert-Lewin',
    position: 'ST',
    overall: 79,
    stats: {
      pace: 78,
      shooting: 80,
      passing: 65,
      dribbling: 74,
      defending: 45,
      physical: 82
    },
    playStyles: {
      normal: ['Power Header', 'Aerial'],
      plus: []
    },
    availableEvolutions: ['evo1', 'evo5']
  },
  {
    id: 'player6',
    name: 'Declan Rice',
    position: 'CDM',
    overall: 85,
    stats: {
      pace: 72,
      shooting: 67,
      passing: 80,
      dribbling: 76,
      defending: 85,
      physical: 84
    },
    playStyles: {
      normal: ['Intercept', 'Long Ball Pass'],
      plus: ['Bruiser+']
    },
    availableEvolutions: ['evo2']
  },
  {
    id: 'player7',
    name: 'Bukayo Saka',
    position: 'RM',
    overall: 84,
    stats: {
      pace: 85,
      shooting: 79,
      passing: 81,
      dribbling: 86,
      defending: 62,
      physical: 72
    },
    playStyles: {
      normal: ['Flair', 'Technical'],
      plus: ['Whipped Pass+']
    },
    availableEvolutions: ['evo4']
  },
  {
    id: 'player8',
    name: 'William Saliba',
    position: 'CB',
    overall: 83,
    stats: {
      pace: 78,
      shooting: 45,
      passing: 70,
      dribbling: 72,
      defending: 84,
      physical: 83
    },
    playStyles: {
      normal: ['Tackling', 'Slide Tackle'],
      plus: ['Anticipate+']
    },
    availableEvolutions: ['evo3']
  }
];