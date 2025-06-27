import { useState } from "react"
import MemberCard from "./MemberCard"


const membersList = [
  {
    id: 1,
    name: "عادل محمود اشلك",
    role: "رئيس الرابطة",
    image: "/adel.jpg",
    description: "يقود مجلس إدارة الرابطة منذ عام ٢٠٢٠ ويساهم في تطوير برامجها وأنشطتها"
  },
  {
    id: 2,
    name: "الأعمده موسي كنتيباي",
    role: "نائب الرئيس",
    image: "boss.jpg",
    description: "يشرف على البرامج التعليمية والثقافية في الرابطة منذ عام ٢٠١٨"
  },
  {
    id: 3,
    name: "الاستاذ عبدالسلام قبر",
    role: "أمين الصندوق",
    image: "abs.jpg",
    description: "يتولى إدارة الشؤون المالية للرابطة بخبرة تمتد لأكثر من ١٠ سنوات"
  },
  {
    id: 4,
    name: "الأستاذ سفيان قلج",
    role: "المشرف العام",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIA8_roW5s35e98_Gwchrc5MLN3WfjsdpWmQ&s",
    description: "يتولى الإشراف على كافة أنشطة وبرامج الرابطة وتنسيق الجهود بين اللجان المختلفة"
  }
]



function MembersSection() {
  const [modalImage, setModalImage] = useState(null); // null or image URL

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="w-full relative">
      {/* Overlay modal for image display */}
      {modalImage && (
        <div className="fixed inset-0 bg-black  flex items-center  justify-center z-50" onClick={closeModal}>
          <img src={modalImage} alt="Member" className="w-full lg:w-1/2 max-h-full rounded-lg transition ease-in-out duration-300 " onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <div className="container mx-auto  h-full flex flex-col">
        <h2 className="text-3xl font-bold mb-4 text-center my-12">قائمة الاعضاء</h2>
        <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 lg:px-0 mb-12">
          {membersList.map((item) => (
            <MemberCard
              key={item.id}
              item={item}
              onImageClick={handleImageClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MembersSection

