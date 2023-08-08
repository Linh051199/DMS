interface LinkProps {
  label: string;
  onClick: () => void;
}
export const Link = ({ label, onClick }: LinkProps) => {
  const handleClick = (e: any) => {
    e.preventDefault();
    onClick();
  };
  return (
    <div className={"code-cell hover:underline hover:text-[#00703c] hover:cursor-pointer text-[#0E223D]"} onClick={handleClick}>
      {label}
    </div>
  );
};