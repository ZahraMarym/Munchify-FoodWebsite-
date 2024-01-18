const Card = ({image,title,description,className}) => {
  return (
    <div className={`max-w-sm mx-auto overflow-hidden shadow-lg ${className}`}>
      <img className="w-full" src={image} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};
export default Card;
