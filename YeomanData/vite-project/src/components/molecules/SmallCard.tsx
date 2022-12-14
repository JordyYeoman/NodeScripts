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
      className={`${classes} bg-zinc-800 bg-opacity-80 text-xs xl:text-md px-2 py-1 xl:px-4 xl:py-2 rounded transition duration-200 hover:bg-zinc-600 cursor-pointer`}
    >
      {children}
    </div>
  );
};

export default SmallCard;
