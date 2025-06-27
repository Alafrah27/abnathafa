import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Calendar } from 'lucide-react';
import { axiosInstance } from '../lib/Axios';
import { toast } from 'react-toastify';
import { GetAllPlans } from '../services/useSubscription';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../component/Navbar';
import { UserInfo } from '../services/useAuth';
import { useNavigate } from 'react-router-dom';


const stripePromise = loadStripe(
    "pk_test_51RFxPXH89tpvSktjPyQe7B8zZPu14VBIrBcuLdfxzqMN2jKZbgh5yJQZACnJoYxXUVidewcyZGAfFDUf7KlTWtUG00dnpt1lw8"
);

const PricingComponent = () => {
    const [hoveredPlan, setHoveredPlan] = useState(null);
    const [loadingPayment, setLoadingPayment] = useState(null); // Track which plan is being processed
    const navigate = useNavigate()
    const { User } = UserInfo()

    const { plans, isLoading, error } = GetAllPlans();
    console.log("plans", plans);

    const getIcon = (planType) => {
        switch (planType) {
            case 'monthly': return <Calendar className="w-6 h-6" />;
            case 'yearly': return <Star className="w-6 h-6" />;
            case 'free': return <Crown className="w-6 h-6" />;
            default: return <Zap className="w-6 h-6" />;
        }
    };

    const getPlanLabel = (planType) => {
        switch (planType) {
            case 'monthly': return 'شهرياً';
            case 'yearly': return 'سنوياً';
            case 'free': return 'بريميوم';
            default: return 'خطة';
        }
    };

    const handlePayment = async (planId) => {
        // Prevent multiple simultaneous payment requests
        if (loadingPayment) {
            toast.warning('يتم معالجة طلب دفع آخر، يرجى الانتظار...');
            return;
        }

        setLoadingPayment(planId);

        try {
            // Validate plan ID
            if (!planId) {
                throw new Error('معرف الخطة غير صحيح');
            }

            // Show loading toast
            const loadingToastId = toast.loading('جارٍ إنشاء جلسة الدفع...');

            const stripe = await stripePromise;

            const response = await axiosInstance.post("/payment-stripe/create-checkout-session", {
                subscriptionId: planId
            });

            // Dismiss loading toast
            toast.dismiss(loadingToastId);

            const session = response.data;

            const result = await stripe.redirectToCheckout({ sessionId: session.id });
            if (result.error) {
                toast.error(result.error.message);
            }

        } catch (error) {
            console.error("Payment error:", error);

            // Handle different types of errors
            let errorMessage = 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى.';

            if (error.response) {
                // Server responded with error status
                const { status, data } = error.response;

                switch (status) {
                    case 400:
                        errorMessage = data?.message || 'بيانات الطلب غير صحيحة';
                        break;
                    case 401:
                        errorMessage = 'يجب تسجيل الدخول أولاً';
                        break;
                    case 403:
                        errorMessage = 'ليس لديك صلاحية للوصول لهذه الخدمة';
                        break;
                    case 404:
                        errorMessage = 'الخطة المطلوبة غير موجودة';
                        break;
                    case 500:
                        errorMessage = 'خطأ في الخادم، يرجى المحاولة لاحقاً';
                        break;
                    default:
                        errorMessage = data?.message || `خطأ في الخادم (${status})`;
                }
            } else if (error.request) {
                // Network error
                errorMessage = 'خطأ في الاتصال، يرجى التحقق من الإنترنت والمحاولة مرة أخرى';
            } else if (error.message) {
                // Custom error message
                errorMessage = error.message;
            }

            toast.error(errorMessage);
        } finally {
            setLoadingPayment(null);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">جارٍ تحميل الخطط...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <Zap className="w-12 h-12 mx-auto mb-2" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">حدث خطأ أثناء تحميل الخطط</h2>
                    <p className="text-red-500 mb-4">{error.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        إعادة المحاولة
                    </button>
                </div>
            </div>
        );
    }

    if (!plans || plans.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">لا توجد خطط متاحة حالياً</h2>
                    <p className="text-gray-600">يرجى المحاولة مرة أخرى لاحقاً</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen py-12 px-4">
                <div className="max-w-6xl  mx-auto mt-14">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            خطط الاشتراك
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-semibold">
                            ابناء طفع بكم يشدد العزم ويعزز النجاح مع خطط الاشتراك المرنة لدينا. ساهم مع اهلك اليوم و كون لهم عونن بعد الله
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan._id}
                                className={`relative group cursor-pointer transform transition-all duration-300 ${hoveredPlan === plan._id ? 'scale-105' : 'hover:scale-105'
                                    }`}
                                onMouseEnter={() => setHoveredPlan(plan._id)}
                                onMouseLeave={() => setHoveredPlan(null)}
                            >
                                {/* Popular Badge */}
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                            الأكثر شعبية
                                        </div>
                                    </div>
                                )}

                                {/* Card */}
                                <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border-2 ${plan.popular ? 'border-blue-200' : 'border-gray-100'
                                    } ${hoveredPlan === plan._id ? 'shadow-2xl' : ''}`}>

                                    {/* Icon and Plan Type */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`p-3 rounded-lg ${plan.popular ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                            {getIcon(plan.plan)}
                                        </div>
                                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${plan.popular ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600'
                                            }`}>
                                            {getPlanLabel(plan.plan)}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
                                        {plan.title}
                                    </h3>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline">
                                            <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                                            <span className="text-gray-500 mr-2">
                                                /{plan.plan === 'yearly' ? 'سنة' : plan.plan === 'monthly' ? 'شهر' : 'خطة'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                                        {plan.description}
                                    </p>

                                    {/* Features */}
                                    <div className="mb-8">
                                        <ul className="space-y-3">
                                            {plan.plan === 'monthly' && (
                                                <>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">الخدمات الأساسية</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">مرونة في الدفع</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">دعم فني أساسي</span>
                                                    </li>
                                                </>
                                            )}
                                            {plan.plan === 'yearly' && (
                                                <>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">جميع الميزات الأساسية</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">توفير مالي حتى 10%</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">ميزات إضافية حصرية</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">دعم فني متقدم</span>
                                                    </li>
                                                </>
                                            )}
                                            {plan.plan === 'free' && (
                                                <>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">خدمات مخصصة للمحترفين</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">دعم فني على مدار الساعة</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">ميزات حصرية متقدمة</span>
                                                    </li>
                                                    <li className="flex items-center text-gray-700">
                                                        <Check className="w-4 h-4 text-green-500 ml-3 flex-shrink-0" />
                                                        <span className="text-sm">أولوية في الخدمة</span>
                                                    </li>
                                                </>
                                            )}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => {

                                            if (!User) {

                                                navigate('/login')
                                            } else {

                                                handlePayment(plan._id)
                                            }
                                        }
                                        }
                                        disabled={loadingPayment !== null}
                                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 relative ${plan.popular
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                                            : 'bg-gray-800 hover:bg-gray-900 text-white hover:shadow-lg'
                                            } ${loadingPayment === plan._id
                                                ? 'opacity-75 cursor-not-allowed'
                                                : loadingPayment !== null
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:transform hover:scale-105'
                                            }`}
                                    >
                                        {loadingPayment === plan._id ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                جارٍ المعالجة...
                                            </div>
                                        ) : (
                                            plan.popular ? 'ابدأ الآن' : 'اختر هذه الخطة'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Section */}
                    <div className="text-center mt-16 bg-white rounded-xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            هل تحتاج مساعدة في اختيار الخطة المناسبة؟
                        </h2>
                        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                            تواصل مع فريق الدعم للحصول على استشارة مجانية واختيار الخطة الأنسب لاحتياجاتك
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300">
                                تواصل معنا
                            </button>
                            <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors duration-300">
                                مقارنة الخطط
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PricingComponent;