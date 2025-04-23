import React from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import { Evolution } from '../types';

interface EvolutionCardProps {
  evolution: Evolution;
  isSelected: boolean;
  onSelect: (evolution: Evolution) => void;
}

const EvolutionCard: React.FC<EvolutionCardProps> = ({ evolution, isSelected, onSelect }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div 
      className={`w-[200px] h-[120px] bg-surface-dark rounded-12 p-3 flex flex-col justify-between flex-shrink-0 cursor-pointer transition-all duration-200 relative ${
        isSelected ? 'ring-2 ring-primary scale-[1.02]' : 'hover:scale-[1.02]'
      }`}
      onClick={() => onSelect(evolution)}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-primary rounded-full p-1">
          <Check size={14} className="text-background" />
        </div>
      )}
      <div>
        <h3 className="text-primary font-poppins text-base">{evolution.name}</h3>
        <div className="flex items-center text-text-dark text-xs italic mt-1">
          <Calendar size={12} className="mr-1" />
          <span>Unlock: {formatDate(evolution.unlockDate)}</span>
        </div>
        <div className="flex items-center text-text-dark text-xs italic mt-1">
          <Clock size={12} className="mr-1" />
          <span>Expires: {formatDate(evolution.expiryDate)}</span>
        </div>
      </div>
      <div>
        {evolution.cost === 'FREE' ? (
          <span className="inline-block bg-primary text-background text-xs font-bold px-2 py-1 rounded-full">
            FREE
          </span>
        ) : (
          <span className="inline-block bg-secondary text-background text-xs font-bold px-2 py-1 rounded-full">
            {evolution.cost.toLocaleString()} coins
          </span>
        )}
      </div>
    </div>
  );
};

export default EvolutionCard;