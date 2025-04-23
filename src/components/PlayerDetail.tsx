import React from 'react';
import { 
  ArrowLeft, 
  Zap, 
  Target, 
  Gauge, 
  Footprints, 
  Shield, 
  Dumbbell,
  Calendar,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Player, Evolution } from '../types';

interface PlayerDetailProps {
  player: Player;
  evolutions: Evolution[];
  onBack: () => void;
}

const PlayerDetail: React.FC<PlayerDetailProps> = ({ player, evolutions, onBack }) => {
  const playerEvolutions = evolutions.filter(evo => 
    player.availableEvolutions.includes(evo.id)
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatIcon = (stat: string, size = 20) => {
    switch (stat) {
      case 'pace': return <Zap size={size} className="text-primary" />;
      case 'shooting': return <Target size={size} className="text-primary" />;
      case 'passing': return <Gauge size={size} className="text-primary" />;
      case 'dribbling': return <Footprints size={size} className="text-primary" />;
      case 'defending': return <Shield size={size} className="text-primary" />;
      case 'physical': return <Dumbbell size={size} className="text-primary" />;
      default: return null;
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row mt-24 gap-6">
      <button 
        onClick={onBack}
        className="lg:hidden flex items-center text-primary mb-4"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Players
      </button>

      {/* Left Panel */}
      <div className="w-full lg:w-1/3 bg-surface-dark p-6 rounded-16">
        <div className="flex items-center mb-6">
          <button 
            onClick={onBack}
            className="hidden lg:flex items-center text-primary mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-primary font-poppins text-3xl">
            {player.name} - <span className="text-text-light">{player.overall} OVR</span>
          </h1>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 rounded-full border-8 border-primary opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-8 border-primary" style={{ 
              clipPath: `polygon(0 0, 100% 0, 100% ${player.overall}%, 0 ${player.overall}%)` 
            }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-poppins text-text-light">{player.overall}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(player.stats).map(([stat, value]) => (
            <div key={stat} className="flex items-center">
              {getStatIcon(stat)}
              <span className="ml-2 text-text-dark capitalize">{stat}: <span className="text-text-light">{value}</span></span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-background">
          <h3 className="font-poppins text-lg text-text-light mb-3">PlayStyles</h3>
          <div className="flex flex-wrap gap-2">
            {player.playStyles.normal.map(style => (
              <span key={style} className="text-sm bg-surface text-text-dark px-3 py-1 rounded-full">
                {style}
              </span>
            ))}
            {player.playStyles.plus.map(style => (
              <span key={style} className="text-sm bg-surface text-primary px-3 py-1 rounded-full">
                {style}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-2/3 bg-background p-6 rounded-16 relative">
        <h2 className="font-poppins text-2xl text-text-light mb-6">Available Evolution Paths</h2>

        {playerEvolutions.length > 0 ? (
          <div className="space-y-6">
            {playerEvolutions.map((evo, index) => (
              <div key={evo.id} className="relative">
                {index < playerEvolutions.length - 1 && (
                  <div className="absolute left-4 top-[72px] bottom-0 w-0.5 bg-primary"></div>
                )}
                
                <div className="bg-surface rounded-12 p-4 relative">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-3">
                      <span className="text-background font-bold">{index + 1}</span>
                    </div>
                    <h3 className="font-poppins text-xl text-primary">{evo.name}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 mb-3">
                    <div className="flex items-center text-text-dark text-sm italic">
                      <Calendar size={14} className="mr-1" />
                      <span>Unlock: {formatDate(evo.unlockDate)}</span>
                    </div>
                    <div className="flex items-center text-text-dark text-sm italic">
                      <Clock size={14} className="mr-1" />
                      <span>Expires: {formatDate(evo.expiryDate)}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-poppins text-sm text-text-light mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 text-text-dark">
                      {evo.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-poppins text-sm text-text-light mb-2">Stat Improvements:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {Object.entries(evo.effects).map(([stat, boost]) => (
                        <div key={stat} className="flex items-center">
                          {getStatIcon(stat, 16)}
                          <span className="ml-2 text-sm text-text-dark capitalize">
                            {stat}: <span className="text-primary">+{boost}</span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {evo.finalBonus && (
                  <div className="mt-3 bg-secondary rounded-8 p-2 ml-8">
                    <div className="flex items-center">
                      <CheckCircle size={16} className="text-background mr-2" />
                      <span className="text-sm font-bold text-background">{evo.finalBonus}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface rounded-12 p-6 text-center">
            <p className="text-text-dark text-lg">No evolutions available for this player.</p>
          </div>
        )}

        {playerEvolutions.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 lg:absolute lg:bottom-6 lg:left-6 lg:right-6 bg-primary p-3 rounded-t-lg lg:rounded-8">
            <p className="text-center font-poppins font-bold text-background">
              Complete by {formatDate(playerEvolutions[0].expiryDate)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerDetail;