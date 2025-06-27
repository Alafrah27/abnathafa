function MemberCard({ item, onImageClick }) {
    return (
        <li className="flex flex-col gap-2 mb-4 mt-2 rounded-lg bg-white relative">
            <picture>

                <img
                    src={item.image}
                    alt="member"
                    loading="lazy"
                    fetchPriority="high"
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                    className="w-full h-40 object-cover rounded-lg cursor-pointer"
                    onClick={() => onImageClick(item.image)}
                />
            </picture>
            <div className="p-2">
                <h3 className="text-lg font-semibold text-blue-600 text-center">{item.name}</h3>
                <p className="text-sm text-gray-600 text-center font-semibold">{item.role}</p>
                <p className="text-sm text-gray-500 text-center">{item.description}</p>
            </div>
        </li>
    );
}


export default MemberCard;