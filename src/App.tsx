import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import EvolutionsCarousel from './components/EvolutionsCarousel';
import FilterPanel from './components/FilterPanel';
import PlayerGrid from './components/PlayerGrid';
import PlayerDetail from './components/PlayerDetail';
import { evolutions, players } from './data';
import { Player, FilterOptions, Evolution } from './types';

function App() {
  const [loading, setLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [filteredPlayers, setFilteredPlayers] = useState(players);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    position: '',
    unlockDateFrom: '',
    expiresBefore: '',
    selectedEvolutions: [],
    chainEvolutions: false,
    stats: {},
    evoRequirements: {}
  });

  const handleLoadEvolutions = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPlayers = () => {
    setSelectedPlayer(null);
  };

  const handleSelectEvolution = (evolution: Evolution) => {
    setFilters(prev => ({
      ...prev,
      selectedEvolutions: prev.selectedEvolutions.includes(evolution.id)
        ? prev.selectedEvolutions.filter(id => id !== evolution.id)
        : [...prev.selectedEvolutions, evolution.id]
    }));
  };

  const handleToggleChain = () => {
    setFilters(prev => ({
      ...prev,
      chainEvolutions: !prev.chainEvolutions
    }));
  };

  const applyFilters = () => {
    let result = [...players];
    
    // Filter by selected evolutions
    if (filters.selectedEvolutions.length > 0) {
      result = result.filter(player => {
        if (filters.chainEvolutions) {
          // Player must have ALL selected evolutions
          return filters.selectedEvolutions.every(evoId => 
            player.availableEvolutions.includes(evoId)
          );
        } else {
          // Player must have ANY of the selected evolutions
          return filters.selectedEvolutions.some(evoId => 
            player.availableEvolutions.includes(evoId)
          );
        }
      });

      // Apply evolution requirements
      const selectedEvolutionsData = evolutions
        .filter(evo => filters.selectedEvolutions.includes(evo.id))
        .reduce((acc, evo) => {
          const positions = evo.requirements
            .find(req => req.includes('position'))
            ?.match(/must be ([A-Z, ]+)/)?.[1]
            .split(', ') || [];
          
          const overall = evo.requirements
            .find(req => req.includes('rating'))
            ?.match(/below (\d+)/)?.[1];

          return {
            positions: [...new Set([...acc.positions, ...positions])],
            maxOverall: overall ? Math.min(acc.maxOverall || Infinity, parseInt(overall)) : acc.maxOverall
          };
        }, { positions: [] as string[], maxOverall: undefined as number | undefined });

      if (selectedEvolutionsData.maxOverall) {
        result = result.filter(player => player.overall < selectedEvolutionsData.maxOverall!);
      }

      if (selectedEvolutionsData.positions.length > 0) {
        result = result.filter(player => selectedEvolutionsData.positions.includes(player.position));
      }
    }
    
    // Filter by name search
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(player => 
        player.name.toLowerCase().includes(searchTerm)
      );
    }
    
    // Filter by position
    if (filters.position) {
      result = result.filter(player => 
        player.position === filters.position
      );
    }
    
    // Filter by unlock date
    if (filters.unlockDateFrom) {
      const fromDate = new Date(filters.unlockDateFrom);
      result = result.filter(player => {
        const playerEvos = player.availableEvolutions.map(id => 
          evolutions.find(evo => evo.id === id)
        ).filter(Boolean);
        
        return playerEvos.some(evo => 
          evo && new Date(evo.unlockDate) >= fromDate
        );
      });
    }
    
    // Filter by expiry date
    if (filters.expiresBefore) {
      const beforeDate = new Date(filters.expiresBefore);
      result = result.filter(player => {
        const playerEvos = player.availableEvolutions.map(id => 
          evolutions.find(evo => evo.id === id)
        ).filter(Boolean);
        
        return playerEvos.some(evo => 
          evo && new Date(evo.expiryDate) <= beforeDate
        );
      });
    }
    
    // Filter by stats
    Object.entries(filters.stats).forEach(([stat, minValue]) => {
      if (minValue !== undefined) {
        result = result.filter(player => 
          player.stats[stat as keyof typeof player.stats] >= minValue
        );
      }
    });
    
    setFilteredPlayers(result);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      position: '',
      unlockDateFrom: '',
      expiresBefore: '',
      selectedEvolutions: [],
      chainEvolutions: false,
      stats: {},
      evoRequirements: {}
    });
    setFilteredPlayers(players);
  };

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [
    filters.selectedEvolutions,
    filters.chainEvolutions,
    filters.search
  ]);

  return (
    <div className="min-h-screen bg-background text-text-light">
      <Header onLoadEvolutions={handleLoadEvolutions} />
      
      <div className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : selectedPlayer ? (
          <PlayerDetail 
            player={selectedPlayer} 
            evolutions={evolutions}
            onBack={handleBackToPlayers}
          />
        ) : (
          <>
            <EvolutionsCarousel 
              evolutions={evolutions}
              selectedEvolutions={filters.selectedEvolutions}
              chainMode={filters.chainEvolutions}
              onSelectEvolution={handleSelectEvolution}
              onToggleChain={handleToggleChain}
            />
            
            <FilterPanel 
              filters={filters}
              evolutions={evolutions}
              setFilters={setFilters}
              applyFilters={applyFilters}
              clearFilters={clearFilters}
            />
            
            <PlayerGrid 
              players={filteredPlayers}
              evolutions={evolutions}
              onSelectPlayer={handleSelectPlayer}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;