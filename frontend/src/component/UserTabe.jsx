function UserTabe({ istab, setIsTab }) {


    const tab = [
        { id: 1, content: "تحويلاتي " },
        { id: 2, content: 'الاعدادات' },

    ];
    return (
        <div>
            <div className={`flex  gap-4 items-center mb-2 p-2 fixed top-0 left-0 right-0 z-10 rounded-lg transition-all duration-300 `}>
                {tab.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-2 py-3 no-break text-sm font-semibold rounded-lg ${istab === tab.content ? 'text-blue-500 ' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setIsTab(tab.content)}
                    >
                        {tab.content}

                    </button>
                ))}
            </div>
        </div>

    )
}

export default UserTabe
