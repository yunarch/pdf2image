import { twJoin } from 'tailwind-merge';
import { usePdf2ImageContext } from '../providers/Pdf2ImageContextProvider';
import { MODES } from '../types';

export const ModesSelector = () => {
  const { activeMode, setActiveMode } = usePdf2ImageContext();
  return (
    <div className="flex w-full">
      {MODES.map((mode) => (
        <button
          key={mode.type}
          type="button"
          className={twJoin(
            'flex-1 cursor-pointer border px-4 py-2',
            'first:rounded-l last:rounded-r',
            'border-gray-500 hover:border-teal-500',
            mode.type === activeMode.type && 'border-teal-500 bg-teal-500',
            'transition-all duration-500',
            'uppercase'
          )}
          onClick={() => {
            setActiveMode(mode);
          }}
        >
          {mode.text}
        </button>
      ))}
    </div>
  );
};
