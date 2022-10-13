const SmallCard = ({
  children,
  classes,
  attr,
  name,
  action,
}: {
  children: any;
  classes: string;
  attr?: string | number;
  name?: string | number;
  action?: Function;
}) => {
  return (
    <div
      data-name={name ?? ""}
      data-attr={attr ?? ""}
      onClick={(event) => {
        if (action) action(event);
      }}
      className={`${classes} bg-zinc-900 bg-opacity-80 p-4 rounded transition duration-200 hover:bg-zinc-800 cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default SmallCard;
