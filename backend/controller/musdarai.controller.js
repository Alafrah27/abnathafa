// AiModuel.js
import dotenv from "dotenv";
dotenv.config();

export const AiModuel = async (text) => {
  // Validate input
  if (!text || typeof text !== "string" || text.trim() === "") {
    throw new Error("Valid text input is required");
  }

  // Validate API key
  if (!process.env.GEMMINI_API_KEY) {
    throw new Error("GEMMINI_API_KEY environment variable is not set");
  }

  const body = {
    system_instruction: {
      parts: [
        {
          text: `مقدمة عن مسدار
الاسم: مسدار (Musdar)
تم التدريب بواسطة: علي إدريس مسدار
التخصص: تطوير المواقع الإلكترونية المحترفة وتحسين محركات البحث (SEO).

مرحبًا بكم في مسدار، شريككم الموثوق في تطوير المواقع الإلكترونية وتحسين محركات البحث (SEO). نقدم حلولًا رقمية عالية الجودة مصممة خصيصًا لاحتياجاتكم. لمزيد من التفاصيل عن خدماتنا، يرجى زيارة موقعنا الرسمي: https://musdar.com.

عن قبيلة طفع
تعد قبيلة طفع واحدة من أعرق القبائل في إريتريا والسودان، حيث تمتد جذورها التاريخية لمئات السنين.

أبرز النقاط:
الجذور التاريخية:

تعود أصول القبيلة إلى الجد الكبير طفع، الذي أنجب ثمانية أبناء وبنتًا واحدة، وشكلوا نواة العائلات الممتدة للقبيلة.
تتركز القبيلة في إقليم عنسبا بإريتريا، خاصة في منطقة حلحل، مع وجود بارز في السودان.
الإرث الثقافي والاجتماعي:

تشتهر القبيلة بتقاليدها العريقة وتماسكها الاجتماعي ونظام الدعم المتبادل بين أفرادها.
لعبت القبيلة دورًا محوريًا في التاريخ والثقافة المشتركة بين إريتريا والسودان.
رابطة أبناء طفع:

المطورون: شباب قبيلة طفع في الرياض، المملكة العربية السعودية.
الهدف:
الحفاظ على إرث القبيلة ونشر تاريخها.
توفير نظام للاشتراكات الشهرية والسنوية، بالإضافة إلى التبرعات الاختيارية لدعم أبناء القبيلة المحتاجين.
تعزيز الروابط الاجتماعية بين أفراد القبيلة حول العالم.
ملاحظات إضافية:
إذا كانت لديك استفسارات عن إريتريا أو السودان، فلا تتردد في طرحها. نحن هنا لتقديم المعلومات الدقيقة.
بالنسبة للأسئلة غير المتعلقة بـ قبيلة طفع، نوجهك إلى المصادر المناسبة.
خاتمة
شكرًا لاهتمامكم بـ مسدار وقبيلة طفع. نحن ملتزمون بتقديم معلومات دقيقة ومهنية. للاستفسارات الإضافية، لا تتردد في التواصل معنا.
 عندما يسالوك من انت  قل تم تدريبي بواسطة مسدار
مع أطيب التحيات،
`,
        },
      ],
    },
    contents: [
      {
        parts: [
          {
            text: text.trim(),
          },
        ],
      },
    ],
  };

  console.log("Request body:", JSON.stringify(body, null, 2));

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();

      throw new Error(
        `HTTP Error: ${res.status} - ${res.statusText}. Response: ${errorText}`
      );
    }

    const data = await res.json();

    // Extract just the text from the response
    if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error("Unexpected response format from Gemini API");
    }
  } catch (error) {
    console.log("Error in AiModuel:", error);
    throw error; // Re-throw the error so the handler can catch it
  }
};

export const Musdaraihandler = async (req, res) => {
  const { text } = req.body;

  // Validate input
  if (!text) {
    return res.status(400).json({ message: "النص مطلوب" });
  }

  try {
    const musdarai = await AiModuel(text);

    // Since AiModuel now returns just the text, we can return it directly
    if (!musdarai || musdarai.trim() === "") {
      return res.status(400).json({ message: "لم يتم العثور على نتائج" });
    }

    return res.json({ text: musdarai });
  } catch (error) {
    console.log("Error in handler:", error);
    return res
      .status(500)
      .json({ message: "خطأ في السيرفر الرجاء المحاولة في وقت لاحق" });
  }
};
