export interface ProgressBarProps {
  ref?: React.RefObject<HTMLDivElement>;
}

export const ProgressBar = ({ ref }: ProgressBarProps) => {
  return (
    <div ref={ref} className="w-full">
      <div className="h-1.5 w-full overflow-hidden bg-pink-200 dark:bg-pink-100">
        <div className="animate-progress h-full w-full origin-left bg-pink-700 dark:bg-pink-500"></div>
      </div>
    </div>
  );
};
