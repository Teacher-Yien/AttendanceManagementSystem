import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function ClassModal({ isOpen, onClose, classData }:any) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        className: '',
        subjectName: '',
        room_number: '',
        years: '',
        class_id: ''  // Added class_id field
    });

    // Set form data when editing an existing class
    useEffect(() => {
        if (classData) {
            setData({
                className: classData.className || '',
                subjectName: classData.subjectName || '',
                room_number: classData.room_number || '',
                years: classData.years || '',
                class_id: classData.id || ''  // Set class_id from the existing class id
            });
        } else {
            reset();
        }
    }, [classData]);

    const handleSubmit = (e:any) => {
        e.preventDefault();
        
        if (classData) {
            // Update existing class
            put(route('classes.update', classData.id), {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                },
            });
        } else {
            // Create new class
            post(route('classes.store'), {
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
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        {classData ? 'កែប្រែថ្នាក់' : 'បន្ថែមថ្នាក់ថ្មី'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Hidden field for class_id when updating */}
                    {classData && (
                        <input
                            type="hidden"
                            name="class_id"
                            value={data.class_id}
                        />
                    )}
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ឈ្មោះថ្នាក់
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.className}
                            onChange={(e) => setData('className', e.target.value)}
                        />
                        {errors.className && (
                            <p className="text-red-500 text-sm mt-1">{errors.className}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            មុខវិជ្ជា
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.subjectName}
                            onChange={(e) => setData('subjectName', e.target.value)}
                        />
                        {errors.subjectName && (
                            <p className="text-red-500 text-sm mt-1">{errors.subjectName}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            លេខបន្ទប់
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.room_number}
                            onChange={(e) => setData('room_number', e.target.value)}
                        />
                        {errors.room_number && (
                            <p className="text-red-500 text-sm mt-1">{errors.room_number}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ឆ្នាំសិក្សា
                        </label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={data.years}
                            onChange={(e) => setData('years', e.target.value)}
                        />
                        {errors.years && (
                            <p className="text-red-500 text-sm mt-1">{errors.years}</p>
                        )}
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
                            {processing ? 'កំពុងដំណើរការ...' : classData ? 'រក្សាទុក' : 'បន្ថែម'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}