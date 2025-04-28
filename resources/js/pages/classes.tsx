// resources/js/Pages/Classes/Index.jsx
import { useState } from 'react';
import appLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import ClassModal from '@/components/ClassModal';
import AppLayout from '@/layouts/app-layout';

export default function Classes({ classes }:any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    
    const openCreateModal = () => {
        setEditingClass(null);
        setIsModalOpen(true);
    };
    
    const openEditModal = (classItem:any) => {
        setEditingClass(classItem);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingClass(null);
    };
    
    const breadcrumbs = [
        {
            title: 'និស្សិត',
            href: '/classes',
        },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="ផ្តាំងព័ត៏មាន" />
            <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                    <button 
                        onClick={openCreateModal}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center"
                    >
                        <span className="mr-2">+</span>
                        <span>បន្ថែមថ្នាក់ថ្មី</span>
                    </button>
                    
                    <div className="w-1/3">
                        <input
                            type="text"
                            placeholder="ស្វែងរក្នុងថ្នាក់..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-cyan-600 text-white">
                                <th className="border p-3 text-left">ល.រ</th>
                                <th className="border p-3 text-left">ឈ្មោះថ្នាក់</th>
                                <th className="border p-3 text-left">មុខវិជ្ជា</th>
                                <th className="border p-3 text-left">លេខបន្ទប់</th>
                                <th className="border p-3 text-left">ឆ្នាំសិក្សា</th>
                                <th className="border p-3 text-left">បញ្ជីសិស្ស</th>
                                <th className="border p-3 text-left">សកម្មភាព</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes && classes.length > 0 ? (
                                classes.map((classItem:any, index:any) => (
                                    <tr key={classItem.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                        <td className="border p-3">{index + 1}</td>
                                        <td className="border p-3">{classItem.className}</td>
                                        <td className="border p-3">{classItem.subjectName}</td>
                                        <td className="border p-3">{classItem.room_number}</td>
                                        <td className="border p-3">{classItem.years}</td>
                                        <td className="border p-3">
                                            <Link 
                                                href={`/classes/${classItem.id}`} 
                                                className="text-amber-500 hover:underline font-medium"
                                            >
                                                និស្សិត
                                            </Link>
                                        </td>
                                        <td className="border p-3">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openEditModal(classItem)}
                                                    className="text-blue-500 hover:text-blue-700"
                                                >
                                                    កែប្រែ
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={`empty-${index}`} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                        <td className="border p-3">{index + 1}</td>
                                        <td className="border p-3">អក្សរសាស្ត្រ</td>
                                        <td className="border p-3">MIS</td>
                                        <td className="border p-3">406</td>
                                        <td className="border p-3">4</td>
                                        <td className="border p-3">
                                            <Link href="/students" className="text-amber-500 hover:underline font-medium">
                                                និស្សិត
                                            </Link>
                                        </td>
                                        <td className="border p-3">-</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Class Modal */}
            <ClassModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                classData={editingClass}
            />
        </AppLayout>
    );
}