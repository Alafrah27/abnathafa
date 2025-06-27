import { Contact, HelpingHand } from "lucide-react"
import { BiSupport } from "react-icons/bi";
import { FaHandsHelping, FaMoneyBill } from "react-icons/fa";
import { SiGotomeeting } from "react-icons/si";


const service = [
    {
        "id": 1,
        "title": "المساعدة",
        "icon": <FaHandsHelping className="w-18 h-18 text-blue-600 bg-blue-200 rounded-full p-2" size={40} />,
        "description": "نمد يد العون للعائلات المحتاجة في مجتمعنا من خلال تقديم الدعم المعنوي والمادي. نساعد في حل المشكلات الأسرية، توفير الإرشاد النفسي، ودعم العائلات في الأزمات. فريقنا المتطوع مكرس لخدمة المجتمع وبناء روابط قوية بين العائلات لخلق بيئة داعمة ومترابطة."
    },
    {
        "id": 2,
        "title": "التواصل",
        "icon": <BiSupport className="w-18 h-18 text-slate-600 bg-slate-200 rounded-full p-2" size={40} />,
        "description": "نوفر مساحة آمنة للعائلات للتعبير عن مشاعرهم ومشاركة تجاربهم مع الآخرين. من خلال جلسات الاستماع والدعم النفسي، نساعد الأفراد على التعامل مع التحديات العاطفية والنفسية. نؤمن بأهمية الصحة النفسية ونسعى لتوفير بيئة مريحة حيث يمكن للجميع التواصل بصراحة وثقة."
    },
    {
        "id": 3,
        "title": "التبرعات",
        "icon": <FaMoneyBill className="w-18 h-18 text-green-600 bg-green-200 rounded-full p-2" size={40} />,
        "description": "نجمع التبرعات من المجتمع لدعم العائلات المحتاجة وتمويل برامجنا الخيرية. كل ريال يُتبرع به يذهب مباشرة لمساعدة الأسر الأكثر احتياجاً في مجتمعنا. نوفر شفافية كاملة في استخدام التبرعات ونضمن وصولها للمستحقين بطريقة كريمة ومحترمة."
    },
    {
        "id": 4,
        "title": "الاجتماع",
        "icon": <SiGotomeeting className="w-18 h-18 text-slate-900 bg-slate-200 rounded-full p-2" size={40} />,
        "description": "ننظم لقاءات دورية واجتماعات تفاعلية تجمع العائلات من مختلف أنحاء المجتمع. هذه اللقاءات تهدف لتبادل الخبرات، مناقشة التحديات المشتركة، وبناء شبكة دعم قوية بين الأسر. نرتب ورش عمل تطويرية، أنشطة ترفيهية، ومبادرات تطوعية تعزز من روح التعاون والتكافل الاجتماعي."
    }
]


function Services() {
    return (
        <div className="w-full min-h-screen ">
            <div className="container mx-auto h-full  i p-2 flex flex-col items-center gap-3">
                <h1 className="text-3xl font-bold mb-4 text-center ">ألخدمات </h1>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                        service.map((item) => (
                            <li className="flex flex-col gap-2 mb-4   bg-white p-4 rounded-lg" key={item.id}>
                                <h1>{item.icon}</h1>
                                <div className="p-2">
                                    <h3 className="text-lg font-semibold text-blue-600 text-center mb-5">{item.title}</h3>
                                    <p className="text-sm text-gray-600 text-center font-semibold">{item.description}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Services

