import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

/**
 * InterestSelector — Editorial career domain personalization selector.
 * Allows users to choose their domain of interest and dynamically calibrates
 * the landing page intelligence engine to that specific field.
 */
export const InterestSelector = ({
  categories = [],
  selectedCategoryIndex = 0,
  onSelectCategory,
  className = '',
}) => {
  return (
    <div className={`p-6 bg-[#0B0D12] border border-[#1E232F] ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1E232F]">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-gorange/10 text-gorange border border-gorange/30">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <div className="font-mono text-[10px] text-gorange tracking-widest uppercase font-bold">
              [ PERSONALIZATION CALIBRATOR ]
            </div>
            <h3 className="font-display font-bold text-white text-base sm:text-lg tracking-tight">
              What are you interested in?
            </h3>
          </div>
        </div>
        <div className="font-mono text-xs text-[#7F8B9D] flex items-center gap-2">
          <span>Active Focus:</span>
          <span className="text-white font-bold px-2 py-0.5 bg-[#141822] border border-[#2B3242]">
            {categories[selectedCategoryIndex]?.name || 'Universal'}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat, idx) => {
          const isActive = idx === selectedCategoryIndex;
          return (
            <button
              key={cat.id || idx}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(idx);
                }
              }}
              className={`font-mono text-xs px-3.5 py-2 transition-all flex items-center gap-2 select-none border ${
                isActive
                  ? 'bg-gorange text-black border-gorange font-bold shadow-lg shadow-gorange/20'
                  : 'bg-[#0E1118] text-[#8F9AA9] border-[#1E232F] hover:border-gorange/40 hover:text-white'
              }`}
            >
              <span className={`text-[10px] ${isActive ? 'text-black/70' : 'text-[#566173]'}`}>
                {cat.code || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`)}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
