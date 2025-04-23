import React from 'react';
import { Zap } from 'lucide-react';

interface HeaderProps {
  onLoadEvolutions: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLoadEvolutions }) => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16 z-10 flex items-center justify-between pt-5 pb-5 ">
      <div className="flex items-center pt-2 pb-2 pl-2 pr-2">
        <Zap className="text-primary mr-2 " size={24} />
        <h1 className="text-primary font-poppins text-2xl font-bold ">Evolutions Simulator</h1>
      </div>
      <button 
        onClick={onLoadEvolutions}
        className="bg-primary text-background font-lato rounded-12 px-4 py-2 hover:bg-secondary transition-colors duration-200 pt-2 pb-2 pl-2 pr-2"
      >
        Load Evolutions
      </button>
    </header>
  );
};

export default Header;