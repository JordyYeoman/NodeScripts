const Card = ({ children, classes }: { children: any; classes: string }) => {
  return (
    <div className={`${classes} bg-zinc-900 bg-opacity-80 p-4 rounded`}>
      {children}
    </div>
  );
};

export default Card;
