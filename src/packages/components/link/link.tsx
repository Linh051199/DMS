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
    <a href="#" className="hover:underline" onClick={handleClick}>
      {label}
    </a>
  );
};