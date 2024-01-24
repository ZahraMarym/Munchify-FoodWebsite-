const CuisinesCard = ({image,title,description,className,onClick}) => {
  return (
    <div className={`max-w-sm mx-auto overflow-hidden shadow-lg ${className}`} onClick={onClick}>
      <img className="w-full h-52" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">{title}</div>
        <p className="text-base text-sm">{description}</p>
      </div>
    </div>
  );
};
export default CuisinesCard;
