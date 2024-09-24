interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center px-4  shadow-lg py-5 mb-6">
      <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
    </header>
  );
};

export default Header;
