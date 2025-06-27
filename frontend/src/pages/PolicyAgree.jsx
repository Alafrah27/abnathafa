import React from 'react';

function PrivacyPolicy() {
    return (
        <div className="bg-black text-white p-8 sm:p-12 font-sans min-h-screen flex items-center justify-center mt-10">
            <div className=" w-full lg:max-w-5xl overflow-y-auto p-6 rounded-lg shadow-lg bg-gray-900/70 backdrop-blur-md">
                <h1 className="text-3xl font-bold mb-6 text-center border-b-4 border-blue-600 pb-4">
                    سياسة الخصوصية لموقعنا
                </h1>
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-600 pb-2">
                        مقدمة
                    </h2>
                    <p className="text-lg mb-4">
                        مرحبًا بك في موقعنا! نحن ملتزمون بحماية خصوصيتك والحفاظ على سرية معلوماتك الشخصية. في عصر التكنولوجيا الحديث، نؤمن بأهمية حماية بياناتك ونسعى لتوفير بيئة آمنة تتيح لك تصفح الموقع بكل ثقة وراحة.
                    </p>
                    <p className="text-lg">
                        تُستخدم سياساتنا لضمان فهمك لكيفية جمعنا واستخدامنا لمعلوماتك. نشجعك على قراءة هذه السياسة بعناية والتواصل معنا إذا كان لديك أي استفسار.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-600 pb-2">
                        المعلومات التي نجمعها
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li>
                            المعلومات الشخصية التي تقدمها عند التسجيل، الشراء، أو التواصل معنا، وتشمل الاسم، البريد الإلكتروني، رقم الهاتف، وغيرها.
                        </li>
                        <li>
                            بيانات الاستخدام مثل الصفحات التي تزورها، مدة بقائك على الموقع، الإجراءات التي تتخذها، نوع الجهاز ومتصفحه.
                        </li>
                        <li>
                            بيانات الجهاز والموقع الجغرافي لتقديم تجربة مخصصة وتحسين الخدمة.
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-600 pb-2">
                        كيفية استخدام المعلومات
                    </h2>
                    <ol className="list-decimal list-inside space-y-2 text-lg">
                        <li>لتخصيص وتحسين محتوى الموقع والخدمات التي نقدمها.</li>
                        <li>لإرسال تحديثات، عروض خاصة، والتنبيهات والإشعارات ذات الصلة باحتياجاتك واهتماماتك.</li>
                        <li>لمعالجة الطلبات والرد على استفساراتك بشكل فعال.</li>
                        <li>لحماية الموقع والمستخدمين من الأنشطة غير القانونية أو الاحتيالية.</li>
                        <li>للتحليل الإحصائي وفهم سلوك المستخدم لتطوير تجربتك عند زيارتنا مستقبلًا.</li>
                    </ol>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-600 pb-2">
                        حماية المعلومات
                    </h2>
                    <p className="text-lg mb-4">
                        نحن نتبع إجراءات أمنية صارمة لمنع الوصول غير المصرح به، والكشف، والتعديل، أو الإتلاف لمعلوماتك. تشمل تدابيرنا التشفير، والقيود على الوصول، والتدريب المستمر لفريقنا.
                    </p>
                    <p className="text-lg">
                        على الرغم من جهودنا، لا يمكن ضمان أمان البيانات بنسبة 100%، لذا يُرجى أن تكون حذرًا عند مشاركة معلوماتك عبر الإنترنت.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-600 pb-2">
                        حقوق المستخدم
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-lg">
                        <li>يمكنك الوصول إلى بياناتك الشخصية وتصحيحها أو تحديثها في أي وقت.</li>
                        <li>يحق لك طلب حذف بياناتك أو إيقاف استخدام معلوماتك في حال رغبت بذلك.</li>
                        <li>كما يمكنك سحب موافقتك على جمع أو معالجة بياناتك في أي وقت.</li>
                        <li>للتواصل معنا بشأن حقوق الخصوصية، يرجى استخدام صفحة الاتصال أو البريد الإلكتروني أدناه.</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-600 pb-2">
                        التعديلات على سياسة الخصوصية
                    </h2>
                    <p className="text-lg mb-4">
                        قد نقوم بتحديث سياسة الخصوصية بشكل دوري لمواكبة التغيرات القانونية، التقنية أو التشغيلية. ستنشر التحديثات على هذه الصفحة، وننصحك بمراجعة السياسة بانتظام للحفاظ على اطلاعك.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-600 pb-2">
                        الاتصال بنا
                    </h2>
                    <p className="text-lg mb-2">
                        إذا كان لديك أي استفسار أو طلب يتعلق بسياسة الخصوصية، يرجى التواصل معنا عبر صفحة الاتصال أو البريد الإلكتروني التالي:
                    </p>
                    <p className="font-medium">info@yourwebsite.com</p>
                </section>

                <p className="mt-8 text-center text-gray-400">
                    جميع الحقوق محفوظة &copy; {new Date().getFullYear()} لموقعنا
                </p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;


