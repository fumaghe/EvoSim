import React from 'react';
import { Player, Evolution } from '../types';
import PlayerCard from './PlayerCard';

interface PlayerGridProps {
  players: Player[];
  evolutions: Evolution[];
  onSelectPlayer: (player: Player) => void;
}

const PlayerGrid: React.FC<PlayerGridProps> = ({ players, evolutions, onSelectPlayer }) => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {players.map(player => (
        <PlayerCard 
          key={player.id} 
          player={player} 
          evolutions={evolutions}
          onSelect={onSelectPlayer}
        />
      ))}
      {players.length === 0 && (
        <div className="text-center py-8">
          <p className="text-text-dark text-lg">No players match your filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default PlayerGrid;