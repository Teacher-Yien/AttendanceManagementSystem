import { useState, useEffect } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Attendance',
        href: '/attendance',
    },
];

export default function Attendance() {
    const [classes, setClasses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Load classes when component mounts
        fetchClasses();
    }, []);

    useEffect(() => {
        // When class is selected, fetch subjects
        if (selectedClass) {
            fetchSubjects(selectedClass);
        } else {
            setSubjects([]);
            setSelectedSubject(null);
        }
    }, [selectedClass]);

    useEffect(() => {
        // When subject is selected, fetch sections
        if (selectedSubject) {
            fetchSections(selectedSubject);
        } else {
            setSections([]);
            setSelectedSection(null);
        }
    }, [selectedSubject]);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/attendance/classes');
            setClasses(response.data);
        } catch (error) {
            console.error('Error fetching classes:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSubjects = async (classId:any) => {
        try {
            setLoading(true);
            const response = await axios.get(`/attendance/subjects/${classId}`);
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSections = async (subjectId:any) => {
        try {
            setLoading(true);
            const response = await axios.get(`/attendance/sections/${subjectId}`);
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectClass = (classId:any) => {
        setSelectedClass(classId);
        setSelectedSubject(null);
        setSelectedSection(null);
    };

    const handleSelectSubject = (subjectId:any) => {
        setSelectedSubject(subjectId);
        setSelectedSection(null);
    };

    const handleSelectSection = (sectionId:any) => {
        setSelectedSection(sectionId);
    };

    const handleStart = () => {
        if (!selectedClass || !selectedSubject) {
            alert('Please select both class and subject');
            return;
        }

        const url = selectedSection
            ? `/attendance/record/${selectedClass}/${selectedSubject}/${selectedSection}`
            : `/attendance/record/${selectedClass}/${selectedSubject}`;
            
        router.get(url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attendance" />
            
            <div className="relative h-96 w-full overflow-hidden rounded-lg">
                {/* Background overlay with tinted classroom image */}
                <div className="absolute inset-0 bg-gradient-to-b from-brown-800/80 to-brown-900/80">
                    <PlaceholderPattern className="h-full w-full" />
                </div>
                
                {/* Content centered on the page */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    {/* Logo and header */}
                    <div className="flex flex-col items-center space-y-6">
                        <div className="flex items-center justify-center">
                            <div className="bg-white p-3 rounded-lg">
                                <div className="flex items-center text-brown-900">
                                    <div className="mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="8" r="4" />
                                            <path d="M20 21a8 8 0 1 0-16 0" />
                                        </svg>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="4" y1="6" x2="20" y2="6" />
                                            <line x1="4" y1="12" x2="20" y2="12" />
                                            <line x1="4" y1="18" x2="20" y2="18" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Khmer Text Header */}
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-2">ចូលវត្តមានសិស្ស</h1>
                            <p className="text-sm mb-6">សូមជ្រើសរើសថ្នាក់រៀននិងមុខវិជ្ជាដែលអ្នកត្រូវការកត់ត្រាវត្តមាន</p>
                        </div>
                        
                        {/* Selection Buttons */}
                        <div className="flex gap-2 mt-6">
                            {/* Class Selection Button */}
                            <div className="relative">
                                <button 
                                    onClick={() => document.getElementById('classDropdown').classList.toggle('hidden')}
                                    className="bg-gray-100 text-gray-800 px-4 py-2 rounded flex items-center"
                                >
                                    <span>ជ្រើសរើសថ្នាក់</span>
                                    <span className="ml-2">{'>'}</span>
                                </button>
                                <div id="classDropdown" className="hidden absolute z-10 mt-1 bg-white rounded shadow-lg w-full max-h-48 overflow-y-auto">
                                    {classes.map(cls => (
                                        <div 
                                            key={cls.id} 
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                handleSelectClass(cls.id);
                                                document.getElementById('classDropdown').classList.add('hidden');
                                            }}
                                        >
                                            {cls.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Subject Selection Button */}
                            <div className="relative">
                                <button 
                                    onClick={() => {
                                        if (selectedClass) document.getElementById('subjectDropdown').classList.toggle('hidden');
                                    }}
                                    className={`px-4 py-2 rounded flex items-center ${selectedClass ? 'bg-gray-100 text-gray-800' : 'bg-gray-300 text-gray-500'}`}
                                    disabled={!selectedClass}
                                >
                                    <span>ជ្រើសរើសមុខវិជ្ជា</span>
                                    <span className="ml-2">{'>'}</span>
                                </button>
                                <div id="subjectDropdown" className="hidden absolute z-10 mt-1 bg-white rounded shadow-lg w-full max-h-48 overflow-y-auto">
                                    {subjects.map(subject => (
                                        <div 
                                            key={subject.id} 
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                handleSelectSubject(subject.id);
                                                document.getElementById('subjectDropdown').classList.add('hidden');
                                            }}
                                        >
                                            {subject.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Section Selection Button */}
                            <div className="relative">
                                <button 
                                    onClick={() => {
                                        if (selectedSubject) document.getElementById('sectionDropdown').classList.toggle('hidden');
                                    }}
                                    className={`px-4 py-2 rounded flex items-center ${selectedSubject ? 'bg-gray-100 text-gray-800' : 'bg-gray-300 text-gray-500'}`}
                                    disabled={!selectedSubject}
                                >
                                    <span>ជ្រើសរើសផ្នែក</span>
                                    <span className="ml-2">{'>'}</span>
                                </button>
                                <div id="sectionDropdown" className="hidden absolute z-10 mt-1 bg-white rounded shadow-lg w-full max-h-48 overflow-y-auto">
                                    {sections.map(section => (
                                        <div 
                                            key={section.id} 
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                handleSelectSection(section.id);
                                                document.getElementById('sectionDropdown').classList.add('hidden');
                                            }}
                                        >
                                            {section.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Start Button */}
                            <button 
                                onClick={handleStart}
                                className={`px-4 py-2 rounded ${selectedClass && selectedSubject ? 'bg-yellow-400 text-gray-800' : 'bg-gray-300 text-gray-500'}`}
                                disabled={!selectedClass || !selectedSubject}
                            >
                                <span>ចាប់ផ្តើម</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}