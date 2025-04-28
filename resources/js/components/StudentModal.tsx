import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

type WeekKey = 'week1' | 'week2' | 'week3' | 'week4' | 'week5' | 'week6' | 'week7';

export default function StudentModal({ isOpen, onClose, studentData, classId }:any) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        class_id: classId,
        student_name: '',
        week1: '',
        week2: '',
        week3: '',
        week4: '',
        week5: '',
        week6: '',
        week7: '',
        total: 0
    });

    // Set form data when editing an existing student
    useEffect(() => {
        if (studentData) {
            setData({
                class_id: classId,
                student_name: studentData.student_name || '',
                week1: studentData.week1 || '',
                week2: studentData.week2 || '',
                week3: studentData.week3 || '',
                week4: studentData.week4 || '',
                week5: studentData.week5 || '',
                week6: studentData.week6 || '',
                week7: studentData.week7 || '',
                total: studentData.total || calculateTotal(studentData)
            });
        } else {
            reset();
            setData('class_id', classId);
        }
    }, [studentData, classId]);

    // Calculate total attendance
    const calculateTotal = (values:any) => {
        const weeks = [
            values.week1 || 0,
            values.week2 || 0,
            values.week3 || 0,
            values.week4 || 0,
            values.week5 || 0,
            values.week6 || 0,
            values.week7 || 0
        ];
        return weeks.reduce((sum, val) => sum + Number(val), 0);
    };

    // Update total when week values change
    useEffect(() => {
        setData('total', calculateTotal(data));
    }, [data.week1, data.week2, data.week3, data.week4, data.week5, data.week6, data.week7]);

    const handleSubmit = (e:any) => {
        e.preventDefault();
        
        if (studentData) {
            // Update existing student
            put(route('students.update', studentData.id), {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            // Create new student
            post(route('students.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {studentData ? 'កែប្រែព័ត៌មាននិស្សិត' : 'បន្ថែមនិស្សិតថ្មី'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ឈ្មោះនិស្សិត
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.student_name}
                            onChange={(e) => setData('student_name', e.target.value)}
                        />
                        {errors.student_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.student_name}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7].map((week) => {
                            const weekKey = `week${week}` as WeekKey;
                            
                            return (
                                <div key={week}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        សប្តាហ៍ទី{week}
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={data[weekKey]}
                                        onChange={(e) => setData(weekKey, e.target.value)}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            សរុប
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                            value={data.total}
                            readOnly
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            បោះបង់
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {processing ? 'កំពុងដំណើរការ...' : studentData ? 'រក្សាទុក' : 'បន្ថែម'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}