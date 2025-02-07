"use client";
import { useEffect, useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import * as XLSX from "xlsx";

export default function UserAnswersTable() {
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const usersRes = await fetch("/api/getUsers");
                const quizRes = await fetch("/api/getUserAnswers");

                if (usersRes.ok && quizRes.ok) {
                    const users = await usersRes.json();
                    const quizzes = await quizRes.json();

                    // ✅ เชื่อมโยง Users และ Quiz Answers โดยใช้ user_id
                    const combined = users.map((user) => {
                        const userQuiz =
                            quizzes.find((q) => q.user_id === user._id) || { answers: [], created_at: null };

                        // ✅ แปลง answers ให้อยู่ในรูปแบบ Q1, Q2, Q3, ...
                        const answersMap = userQuiz.answers.reduce(
                            (acc, ans) => {
                                acc[`Q${ans.question_no}`] = ans.answer;
                                return acc;
                            },
                            { Q1: "-", Q2: "-", Q3: "-", Q4: "-", Q5: "-" }
                        );

                        // ✅ แปลง `created_at` เป็น Date Object สำหรับ Sorting
                        const formattedDate = userQuiz.created_at
                            ? new Date(userQuiz.created_at)
                            : null;

                        return {
                            ...user,
                            ...answersMap,
                            created_at: formattedDate, // ✅ เก็บเป็น Date Object
                        };
                    });

                    setCombinedData(combined);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    // ✅ กำหนด columns สำหรับ React Table (รองรับการเรียงลำดับ)
    const columns = [
        { accessorKey: "name", header: "ชื่อ" },
        { accessorKey: "gender", header: "เพศ" },
        { accessorKey: "age", header: "อายุ" },
        { accessorKey: "occupation", header: "อาชีพ" },
        { accessorKey: "companySector", header: "ภาคธุรกิจ" },
        { accessorKey: "Q1", header: "Q1" },
        { accessorKey: "Q2", header: "Q2" },
        { accessorKey: "Q3", header: "Q3" },
        { accessorKey: "Q4", header: "Q4" },
        { accessorKey: "Q5", header: "Q5" },
        {
            accessorKey: "created_at",
            header: "📅 วันที่ส่งแบบสอบถาม",
            sortingFn: "datetime",
            cell: (info) =>
                info.getValue()
                    ? new Date(info.getValue()).toLocaleString("th-TH", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                    }).replace(",", "")
                    : "-",
        },
    ];

    // ✅ สร้าง Table Instance พร้อม Sorting & Pagination
    const table = useReactTable({
        data: combinedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(), // ✅ เพิ่ม Sorting Model
        initialState: {
            pagination: { pageIndex: 0, pageSize: 10 }, // ✅ แสดงทีละ 10 รายการ
            sorting: [{ id: "created_at", desc: true }] // ✅ เรียง `created_at` จากใหม่ → เก่า
        }
    });


    // ✅ ฟังก์ชัน Export Excel (รวม `created_at` ด้วย)
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            combinedData.map((row) => ({
                ...row,
                created_at: row.created_at
                    ? new Date(row.created_at).toLocaleString("th-TH", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                    }).replace(",", "")
                    : "-",
            }))
        );

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "UserAnswers");
        XLSX.writeFile(wb, "UserAnswers.xlsx");
    };

    return (
        <div className="p-5">
            <img
                src="/index/1-Logo.png"
                alt="Eco Quiz Logo"
                className="mx-auto mb-8 md:mb-6 w-[10%] max-w-[100px] animate-logo-bounce"
            />

            {/* ✅ Data Table (รองรับ Sorting & Pagination) */}
            <div className="overflow-hidden bg-white shadow-xl rounded-lg p-5">
                <table className="w-full text-sm border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-blue-400 text-white">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    className="border p-3 first:rounded-t-lg cursor-pointer"
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                    {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                                    {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row, index) => (
                        <tr key={row.id} className={`${index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"} text-black`}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border p-3 text-center last:rounded-b-lg">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    ◀️ ก่อนหน้า
                </button>
                <span className="text-blue-600 font-bold">
                    หน้า {table.getState().pagination.pageIndex + 1} จาก {table.getPageCount()}
                </span>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    ถัดไป ▶️
                </button>
            </div>

            {/* ✅ ปุ่ม Export Excel (อยู่ข้างล่าง) */}
            <div className="mt-6 text-center">
                <button
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 shadow-md"
                    onClick={exportToExcel}
                >
                    📥 Download Excel
                </button>
            </div>
        </div>
    );
}
