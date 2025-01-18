import React, { useState } from 'react';

const ReviveRegistration = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const Page1 = () => (
        <div className="space-y-6">
            {/* Profile Circle */}
            <div className="flex justify-center">
                <div className="w-32 h-32 bg-sage-green rounded-full"></div>
            </div>

            {/* Eco Indicators */}
            <div className="flex justify-center space-x-8">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">JJ</div>
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">AA</div>
            </div>

            {/* Code Name Input */}
            <div className="bg-gray-100 rounded-lg p-4">
                <input
                    type="text"
                    placeholder="Code Name"
                    className="w-full bg-transparent outline-none"
                />
            </div>

            {/* Gender Selection */}
            <div className="flex justify-center space-x-4">
                <button className="px-6 py-2 rounded-full bg-blue-200">MALE</button>
                <button className="px-6 py-2 rounded-full bg-pink-200">FEMALE</button>
                <button className="px-6 py-2 rounded-full bg-purple-200">LGBTQIA+</button>
            </div>

            {/* Generation Selection */}
            <div className="flex flex-wrap justify-center gap-2">
                {['GEN B', 'GEN X', 'GEN Y', 'GEN Z', 'ALPHA'].map((gen) => (
                    <button
                        key={gen}
                        className="px-4 py-2 rounded-full bg-brown-200 text-brown-800"
                    >
                        {gen}
                    </button>
                ))}
            </div>

            {/* Role Selection */}
            <div>
                <p className="text-center mb-4">ARE YOU...</p>
                <div className="grid grid-cols-2 gap-4">
                    <button className="px-6 py-3 rounded-full bg-green-100 text-green-800">A STUDENT</button>
                    <button className="px-6 py-3 rounded-full bg-green-600 text-white">AN EMPLOYEE</button>
                    <button className="px-6 py-3 rounded-full bg-green-600 text-white">FREELANCE</button>
                    <button className="px-6 py-3 rounded-full bg-green-600 text-white">TOURIST</button>
                </div>
            </div>
        </div>
    );

    const Page2 = () => (
        <div className="space-y-6">
            {/* Profile Circle with CC */}
            <div className="flex justify-center">
                <div className="w-32 h-32 bg-sage-green rounded-full flex items-center justify-center text-4xl text-white">
                    CC
                </div>
            </div>

            {/* Close Friend Text */}
            <div className="text-center">
                <h2 className="text-xl font-bold mb-1">Close Friend...</h2>
                <p className="text-blue-600">ขอรู้จักเธอมากขึ้นอีกหน่อย</p>
            </div>

            {/* Job Position */}
            <div className="space-y-2">
                <p className="text-blue-600">คุณทำงานเกี่ยวกับอะไร (What's your job position?)</p>
                <div className="bg-gray-200 rounded-lg p-4">
                    <input
                        type="text"
                        placeholder="JOB POSITION"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
            </div>

            {/* Industry Selection */}
            <div className="space-y-2">
                <p className="text-center text-blue-600">
                    บริษัทคุณอยู่ในอุตสาหกรรมไหน?
                    <br />
                    (What industry is your company in?)
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                    {[
                        'TECHNOLOGY', 'MANUFACTURING', 'RETAIL',
                        'SERVICES', 'FASHION', 'FINANCE', 'EDUCATION',
                        'STATE AGENCY', 'STATE AGENCY', 'OTHERS'
                    ].map((industry) => (
                        <button
                            key={industry}
                            className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                            {industry}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white p-4 md:p-8">
            {/* Header */}
            <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-4xl font-bold">Revive+</h1>
                    <div className="space-x-2">
                        <button className="rounded-full bg-blue-400 text-white px-3 py-1">TH</button>
                        <button className="rounded-full bg-gray-200 text-gray-600 px-3 py-1">EN</button>
                    </div>
                </div>
                <p className="text-gray-600 text-sm">by Nan Yang Textile Group</p>
            </div>

            {/* Main Content */}
            <div className="max-w-md mx-auto">
                {currentPage === 1 ? <Page1 /> : <Page2 />}

                {/* Next Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="w-12 h-12 rounded-full bg-pink-400 text-white flex items-center justify-center text-2xl"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviveRegistration;