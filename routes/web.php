<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Auth routes
Route::get('/', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');


// Protected routes requiring authentication
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Classes
    Route::get('/classes', [ClassController::class, 'index'])->name('classes.index');
    Route::post('/classes', [ClassController::class, 'store'])->name('classes.store');
    Route::get('/classes/{id}', [ClassController::class, 'show'])->name('classes.show');
    Route::put('/classes/{id}', [ClassController::class, 'update'])->name('classes.update');
    Route::delete('/classes/{id}', [ClassController::class, 'destroy'])->name('classes.destroy');

    // Students (Attendances)
    Route::get('/students', [AttendanceController::class, 'index'])->name('students.index');
    Route::get('/classes/{classId}/students', [AttendanceController::class, 'classStudents'])->name('classes.students');
    Route::post('/students', [AttendanceController::class, 'store'])->name('students.store');
    Route::put('/students/{id}', [AttendanceController::class, 'update'])->name('students.update');
    Route::delete('/students/{id}', [AttendanceController::class, 'destroy'])->name('students.destroy');
    
    // Attendance System
    Route::get('/attendance', [AttendanceController::class, 'showAttendanceForm'])->name('attendance.form');
    Route::get('/attendance/classes', [AttendanceController::class, 'getClasses'])->name('attendance.classes');
    Route::get('/attendance/subjects/{classId}', [AttendanceController::class, 'getSubjects'])->name('attendance.subjects');
    Route::get('/attendance/sections/{subjectId}', [AttendanceController::class, 'getSections'])->name('attendance.sections');
    Route::get('/attendance/record/{classId}/{subjectId}/{sectionId?}', [AttendanceController::class, 'recordForm'])->name('attendance.record');
    Route::post('/attendance/save', [AttendanceController::class, 'saveAttendance'])->name('attendance.save');
    Route::get('/attendance/reports', [AttendanceController::class, 'reports'])->name('attendance.reports');
});

// Include other route files
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';