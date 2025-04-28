// resources/js/Pages/Students/Index.jsx
import { useState } from 'react';
import appLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import StudentModal from '@/components/StudentModal';
import AppLayout from '@/layouts/app-layout';

export default function Students({ attendances, class: classData }:any) {
    console.log('Received attendances:', attendances);
    console.log('Received class data:', classData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    
    const openCreateModal = () => {
        setEditingStudent(null);
        setIsModalOpen(true);
    };
    
    const openEditModal = (student:any) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
    };
    
    // Ensure attendances is always an array
    const studentList = Array.isArray(attendances) ? attendances : [];
    
    const breadcrumbs = [
        {
            title: 'ថ្នាក់',
            href: '/classes',
        },
        {
            title: classData ? classData.className : 'និស្សិត',
            href: `/classes/${classData ? classData.id : ''}/students`,
        },
    ];
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={classData ? `និស្សិតថ្នាក់៖ ${classData.className}` : 'និស្សិត'} />
            <div className="p-5">
                <div className="flex justify-between items-center mb-4">
                    {classData && (
                        <div>
                            <h2 className="text-xl font-bold">ថ្នាក់៖ {classData.className}</h2>
                            <p className="text-gray-600">មុខវិជ្ជា៖ {classData.subjectName} | បន្ទប់៖ {classData.room_number} | ឆ្នាំ៖ {classData.years}</p>
                        </div>
                    )}
                    
                    <button 
                        onClick={openCreateModal}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center"
                    >
                        <span className="mr-2">+</span>
                        <span>បន្ថែមនិស្សិត</span>
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-cyan-600 text-white">
                                <th className="border p-3 text-left">ល.រ</th>
                                <th className="border p-3 text-left">ឈ្មោះនិស្សិត</th>
                                <th className="border p-3 text-center">សប្តាហ៍ទី១</th>
                                <th className="border p-3 text-center">សប្តាហ៍ទី២</th>
                                <th className="border p-3 text-center">សប្តាហ៍ទី៣</th>
                                <th className="border p-3 text-center">សប្តាហ៍ទី៤</th>
                                <th className="border p-3 text-center">សប្តាហ៍ទី៥</th>
                                <th className="border p-3 text-center">សប្តាហ៍ទី៦</th>
                                <th className="border p-3 text-center">សប្តាហ៍ទី៧</th>
                                <th className="border p-3 text-center">សរុប</th>
                                <th className="border p-3 text-left">សកម្មភាព</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentList.length > 0 ? (
                                studentList.map((student, index) => (
                                    <tr key={student.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                        <td className="border p-3">{index + 1}</td>
                                        <td className="border p-3">{student.student_name}</td>
                                        <td className="border p-3 text-center">{student.week1 || '-'}</td>
                                        <td className="border p-3 text-center">{student.week2 || '-'}</td>
                                        <td className="border p-3 text-center">{student.week3 || '-'}</td>
                                        <td className="border p-3 text-center">{student.week4 || '-'}</td>
                                        <td className="border p-3 text-center">{student.week5 || '-'}</td>
                                        <td className="border p-3 text-center">{student.week6 || '-'}</td>
                                        <td className="border p-3 text-center">{student.week7 || '-'}</td>
                                        <td className="border p-3 text-center font-bold">{student.total || 0}</td>
                                        <td className="border p-3">
                                            <button
                                                onClick={() => openEditModal(student)}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                កែប្រែ
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={11} className="border p-4 text-center text-gray-500">
                                        មិនមានទិន្នន័យនិស្សិតនៅឡើយទេ សូមបន្ថែមនិស្សិត
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Student Modal */}
            <StudentModal 
                isOpen={isModalOpen}
                onClose={closeModal}
                studentData={editingStudent}
                classId={classData ? classData.id : null}
            />
        </AppLayout>
    );
}