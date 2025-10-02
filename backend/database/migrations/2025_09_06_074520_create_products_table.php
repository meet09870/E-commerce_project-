<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->double('price',10,2);
            $table->double('compare_price', 10, 2)->nullable();
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->string('image')->nullable();

            // Define foreign keys correctly
            $table->foreignId('categories_id')->constrained()->onDelete('cascade');
            $table->foreignId('brands_id')->nullable()->constrained()->onDelete('cascade');

            $table->integer('qty')->nullable();
            $table->string('sku');
            $table->string('barcode')->nullable();
            $table->integer('status')->default(1);
            $table->enum('is_featured', ['yes', 'no'])->default('no');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
