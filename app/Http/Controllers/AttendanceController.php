<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\ClassModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    // Show all students
    public function index()
    {
        $attendances = Attendance::with('class')->get();
        
        return Inertia::render('students', [
            'attendances' => $attendances,
            'class' => null,
        ]);
    }
    
    public function classStudents($classId)
    {
        // Find the class
        $class = ClassModel::findOrFail($classId);
        
        // Get attendances for this class - ensure proper type casting
        $attendances = Attendance::where('class_id', (int)$classId)->get();
        
        // Log for debugging
        \Log::info('Class ID: ' . $classId . ' (Type: ' . gettype($classId) . ')');
        \Log::info('SQL Query: ' . Attendance::where('class_id', (int)$classId)->toSql());
        \Log::info('Found ' . $attendances->count() . ' attendance records');
        
        // Format class data to match what your React component expects
        $classData = [
            'id' => $class->id,
            'className' => $class->name,
            'subjectName' => $class->subject_name ?? '',
            'room_number' => $class->room_number ?? '',
            'years' => $class->years ?? date('Y')
        ];
        
        return Inertia::render('Students/Index', [
            'attendances' => $attendances->toArray(), // Convert to array for consistency
            'class' => $classData
        ]);
    }
    
    private function validateAndPrepareData(Request $request)
    {
        $validated = $request->validate([
            'class_id' => 'required|exists:classes,id',
            'student_name' => 'required|string|max:255',
            'week1' => 'nullable|integer',
            'week2' => 'nullable|integer',
            'week3' => 'nullable|integer',
            'week4' => 'nullable|integer',
            'week5' => 'nullable|integer',
            'week6' => 'nullable|integer',
            'week7' => 'nullable|integer',
        ]);
        
        // Convert null values to 0
        foreach (['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7'] as $week) {
            $validated[$week] = $validated[$week] ?? 0;
        }
        
        // Calculate the total
        $validated['total'] = array_sum([
            $validated['week1'],
            $validated['week2'],
            $validated['week3'],
            $validated['week4'],
            $validated['week5'],
            $validated['week6'],
            $validated['week7']
        ]);
        
        return $validated;
    }
    
    public function store(Request $request)
    {
        $validated = $this->validateAndPrepareData($request);
        
        Attendance::create($validated);
        
        return redirect()->back()->with('success', 'Student attendance created successfully');
    }
    
    public function update(Request $request, $id)
    {
        $validated = $this->validateAndPrepareData($request);
        
        $attendance = Attendance::findOrFail($id);
        $attendance->update($validated);
        
        return redirect()->back()->with('success', 'Attendance updated successfully!');
    }
    
    public function destroy($id)
    {
        $attendance = Attendance::findOrFail($id);
        $attendance->delete();
        
        return redirect()->back()->with('success', 'Attendance record deleted successfully');
    }
}