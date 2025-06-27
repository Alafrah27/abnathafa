import { useCallback } from "react";
import AccordingList from "./AccordingList";



const Questions = [
  {
    id: 1,
    question: "من مسؤل الرابط؟ ابناء طفع",
    answer:
      "المسؤلين من الرابطة ابناء طفع هما من ابناء طفع الذين يتواجدون فى اللملكة العربية السعودية",
  },
  {
    id: 2,
    question: "ما الغرض من التطبيق ",
    answer:
      "الغرض من التطبيق هو تسهيل التواصل بين أبناء طفع في المملكة العربية السعودية، وتوفير منصة للإعلانات، الأخبار، والفعاليات الخاصة بالرابطة.",
  },
  {
    id: 3,
    question: "كيف يمكنني التواصل مع إدارة الرابطة",
    answer:
      `  يمكنك التواصل مع إدارة الرابطة عبر صفحة "اتصل بنا" في الموقع أو من خلال البريد الإلكتروني الرسمي للرابطة الموجود في أسفل الصفحة. سنسعد بالرد على استفساراتكم في أقرب وقت ممكن."حالياً لا يوجد لدينا أي فروع أخرى. نركز على تقديم أفضل خدمة وتجربة في موقعنا الحالي. شكراً لدعمكم وثقتكم بنا!,`
  },
  {
    id: 4,
    question: "هل اقدر ادفع كاش بدل الشبكة",
    answer:
      "نعم، يمكنك الدفع كاش بدلاً من الشبكة.",
  },

];

function According() {

  const CallbackList = useCallback(() => {
    return Questions
  }, []);
  return (

    <div children="w-full h-full my-8">
      <div className="container mx-auto h-full p-2">
        <h1 className="text-3xl font-bold mb-4 text-center">الأسئلة الشائعة</h1>
        <ul className="flex flex-col gap-4 w-full">
          {CallbackList().map((item) => <AccordingList key={item.id} item={item} />)}
        </ul>

      </div>
    </div>
  );
}

export default According;
