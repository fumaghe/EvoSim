import React from 'react';
import { Search, Filter, Calendar, X, Activity, Star, Users } from 'lucide-react';
import { FilterOptions, Evolution } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  evolutions: Evolution[];
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  applyFilters: () => void;
  clearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  evolutions,
  setFilters, 
  applyFilters, 
  clearFilters 
}) => {
  const positions = ['All', 'ST', 'CF', 'CAM', 'CM', 'CDM', 'LW', 'RW', 'LM', 'RM', 'LB', 'RB', 'CB'];
  const stats = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];

  const handleStatChange = (stat: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: value ? parseInt(value) : undefined
      }
    }));
  };

  // Extract unique positions and max overall from selected evolution requirements
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

  return (
    <div className="w-full bg-surface rounded-12 p-4 mt-6">
      <div className="space-y-6">
        {/* Basic Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[250px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dark" />
            <input
              type="text"
              placeholder="Search by Name"
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full bg-surface-dark rounded-24 px-10 py-2 text-text-light placeholder:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {filters.search && (
              <button 
                onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dark hover:text-text-light"
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="relative min-w-[200px]">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dark" />
            <select
              value={filters.position}
              onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
              className="w-full bg-surface-dark rounded-24 px-10 py-2 text-text-light appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {positions.map(pos => (
                <option key={pos} value={pos === 'All' ? '' : pos}>{pos}</option>
              ))}
            </select>
          </div>
          
          <div className="relative min-w-[200px]">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dark" />
            <input
              type="date"
              placeholder="Unlock Date From"
              value={filters.unlockDateFrom}
              onChange={(e) => setFilters(prev => ({ ...prev, unlockDateFrom: e.target.value }))}
              className="w-full bg-surface-dark rounded-24 px-10 py-2 text-text-light focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="relative min-w-[200px]">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dark" />
            <input
              type="date"
              placeholder="Expires Before"
              value={filters.expiresBefore}
              onChange={(e) => setFilters(prev => ({ ...prev, expiresBefore: e.target.value }))}
              className="w-full bg-surface-dark rounded-24 px-10 py-2 text-text-light focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Evolution Requirements */}
        {filters.selectedEvolutions.length > 0 && (
          <div className="border-t border-surface-dark pt-4">
            <h3 className="text-text-light font-poppins text-sm mb-3 flex items-center">
              <Star size={16} className="mr-2" />
              Evolution Requirements
            </h3>
            <div className="flex flex-wrap gap-4">
              {selectedEvolutionsData.maxOverall && (
                <div className="bg-surface-dark rounded-full px-4 py-1.5 text-sm text-primary">
                  Max OVR: {selectedEvolutionsData.maxOverall}
                </div>
              )}
              {selectedEvolutionsData.positions.length > 0 && (
                <div className="bg-surface-dark rounded-full px-4 py-1.5 text-sm text-primary flex items-center gap-2">
                  <Users size={14} />
                  {selectedEvolutionsData.positions.join(', ')}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats Filters */}
        <div className="border-t border-surface-dark pt-4">
          <h3 className="text-text-light font-poppins text-sm mb-3 flex items-center">
            <Activity size={16} className="mr-2" />
            Stats Filters
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map(stat => (
              <div key={stat} className="relative">
                <input
                  type="number"
                  min="0"
                  max="99"
                  placeholder={stat.charAt(0).toUpperCase() + stat.slice(1)}
                  value={filters.stats[stat as keyof typeof filters.stats] || ''}
                  onChange={(e) => handleStatChange(stat, e.target.value)}
                  className="w-full bg-surface-dark rounded-24 px-3 py-2 text-text-light placeholder:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            onClick={clearFilters}
            className="text-secondary text-sm hover:underline"
          >
            Clear All
          </button>
          <button
            onClick={applyFilters}
            className="bg-primary text-background rounded-12 px-4 py-2 hover:bg-opacity-90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;