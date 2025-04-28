<?php

namespace App\Http\Controllers;

use App\Models\ClassModel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('classes', [
            'classes' => ClassModel::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('classes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'className' => 'required|string|max:255',
            'subjectName' => 'required|string|max:255',
            'room_number' => 'required|string|max:10',
            'years' => 'required|integer'
        ]);

        ClassModel::create($validated);

        return redirect()->route('classes.index')->with('success', 'Class created successfully.');
    }

    /**
 * Display the specified resource.
 */
public function show(string $id)
{
    // Change this line from:
    // return Inertia::render('classes/students', [

    // To this:
    return Inertia::render('students', [
        'class' => ClassModel::findOrFail($id),
        'attendances' => [] // You'll need to fetch attendances here
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('classes/Edit', [
            'class' => ClassModel::findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'className' => 'sometimes|string|max:255',
            'subjectName' => 'sometimes|string|max:255',
            'room_number' => 'sometimes|string|max:10',
            'years' => 'sometimes|integer'
        ]);

        $class = ClassModel::findOrFail($id);
        $class->update($validated);

        return redirect()->route('classes.index')->with('success', 'Class updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $class = ClassModel::findOrFail($id);
        $class->delete();

        return redirect()->route('classes.index')->with('success', 'Class deleted successfully.');
    }
}