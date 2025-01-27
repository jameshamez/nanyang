// src/app/components/page1.js
"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ReviveRegistration = () => {
  const router = useRouter();

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

        {/* Main Form */}
        <div className="max-w-md mx-auto space-y-6">
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
            {["GEN B", "GEN X", "GEN Y", "GEN Z", "ALPHA"].map((gen) => (
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
              <button className="px-6 py-3 rounded-full bg-green-100 text-green-800">
                A STUDENT
              </button>
              <button className="px-6 py-3 rounded-full bg-green-600 text-white">
                AN EMPLOYEE
              </button>
              <button className="px-6 py-3 rounded-full bg-green-600 text-white">
                FREELANCE
              </button>
              <button className="px-6 py-3 rounded-full bg-green-600 text-white">
                TOURIST
              </button>
            </div>
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
                onClick={() => router.push("/page2")}
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