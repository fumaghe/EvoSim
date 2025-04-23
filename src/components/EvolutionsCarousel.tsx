import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Link, Link2Off as LinkOff } from 'lucide-react';
import { Evolution } from '../types';
import EvolutionCard from './EvolutionCard';

interface EvolutionsCarouselProps {
  evolutions: Evolution[];
  selectedEvolutions: string[];
  chainMode: boolean;
  onSelectEvolution: (evolution: Evolution) => void;
  onToggleChain: () => void;
}

const EvolutionsCarousel: React.FC<EvolutionsCarouselProps> = ({ 
  evolutions, 
  selectedEvolutions,
  chainMode,
  onSelectEvolution,
  onToggleChain
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 220;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full bg-surface rounded-12 p-4 mt-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-text-light font-poppins text-xl md:text-2xl">Available Evolutions</h2>
        <div className="flex items-center gap-4">
          {selectedEvolutions.length > 0 && (
            <span className="text-primary text-sm">
              {selectedEvolutions.length} selected
            </span>
          )}
          <button
            onClick={onToggleChain}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
              chainMode 
                ? 'bg-primary text-background' 
                : 'bg-surface-dark text-text-dark hover:text-text-light'
            }`}
          >
            {chainMode ? <Link size={16} /> : <LinkOff size={16} />}
            <span className="text-sm font-medium">Chain</span>
          </button>
        </div>
      </div>
      <div className="relative">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-2 scrollbar-hide"
        >
          {evolutions.map(evolution => (
            <EvolutionCard 
              key={evolution.id} 
              evolution={evolution}
              isSelected={selectedEvolutions.includes(evolution.id)}
              onSelect={onSelectEvolution}
            />
          ))}
        </div>
        
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-primary/50 rounded-full p-1 hidden md:block"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} className="text-background" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-primary/50 rounded-full p-1 hidden md:block"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} className="text-background" />
        </button>
      </div>
    </div>
  );
};

export default EvolutionsCarousel;