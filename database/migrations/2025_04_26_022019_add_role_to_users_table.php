<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRoleToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add role column if it doesn't already exist
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role')->default('user')->after('full_name');
            }
            
            // Add security question and answer columns if they don't exist
            if (!Schema::hasColumn('users', 'security_question')) {
                $table->string('security_question')->nullable()->after('role');
            }
            
            if (!Schema::hasColumn('users', 'security_answer')) {
                $table->string('security_answer')->nullable()->after('security_question');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove columns if they exist
            if (Schema::hasColumn('users', 'role')) {
                $table->dropColumn('role');
            }
            
            if (Schema::hasColumn('users', 'security_question')) {
                $table->dropColumn('security_question');
            }
            
            if (Schema::hasColumn('users', 'security_answer')) {
                $table->dropColumn('security_answer');
            }
        });
    }
}