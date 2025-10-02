<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\CheckAdmin;
use App\Http\Middleware\CheckUser;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
  ->withMiddleware(function (Middleware $middleware) {
    // Global middleware
    $middleware->append(\Illuminate\Foundation\Http\Middleware\CheckForMaintenanceMode::class);
 

    // Named middleware
    $middleware->alias([
        'CheckAdminRole' => \App\Http\Middleware\CheckAdmin::class,
        'CheckUserRole' => \App\Http\Middleware\CheckUser::class,
        'block.mobile' => \App\Http\Middleware\BlockMobileAccess::class,
    ]);
})
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
