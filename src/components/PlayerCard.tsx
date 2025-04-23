import React from 'react';
import { 
  Zap, 
  Gauge, 
  Target, 
  Footprints, 
  Shield 
} from 'lucide-react';
import { Player, Evolution } from '../types';

interface PlayerCardProps {
  player: Player;
  evolutions: Evolution[];
  onSelect: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, evolutions, onSelect }) => {
  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'pace': return <Zap size={16} className="text-primary" />;
      case 'shooting': return <Target size={16} className="text-primary" />;
      case 'passing': return <Gauge size={16} className="text-primary" />;
      case 'dribbling': return <Footprints size={16} className="text-primary" />;
      default: return <Shield size={16} className="text-primary" />;
    }
  };

  // Get top 4 stats
  const topStats = Object.entries(player.stats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  return (
    <div 
      className="bg-gradient-to-br from-surface to-surface-dark rounded-16 p-4 shadow-lg hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
      onClick={() => onSelect(player)}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-poppins text-xl text-text-light">{player.name}</h3>
        <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
          <span className="text-text-dark font-bold">{player.overall}</span>
        </div>
      </div>
      
      <div className="inline-block bg-secondary rounded-12 px-3 py-1 mb-3">
        <span className="text-sm text-white">{player.position}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mb-3">
        {topStats.map(([stat, value]) => (
          <div key={stat} className="flex items-center">
            {getStatIcon(stat)}
            <span className="ml-2 text-sm text-text-dark capitalize">{stat}: {value}</span>
          </div>
        ))}
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 pb-1">
          {player.playStyles.normal.map(style => (
            <span key={style} className="text-xs bg-surface-dark text-text-dark px-2 py-1 rounded-full whitespace-nowrap">
              {style}
            </span>
          ))}
          {player.playStyles.plus.map(style => (
            <span key={style} className="text-xs bg-surface-dark text-primary px-2 py-1 rounded-full whitespace-nowrap">
              {style}
            </span>
          ))}
        </div>
      </div>
      
      {player.availableEvolutions.length > 0 && (
        <div className="mt-3 pt-3 border-t border-surface-dark">
          <span className="text-xs text-primary">
            {player.availableEvolutions.length} Evolution{player.availableEvolutions.length > 1 ? 's' : ''} Available
          </span>
        </div>
      )}
    </div>
  );
};

export default PlayerCard;