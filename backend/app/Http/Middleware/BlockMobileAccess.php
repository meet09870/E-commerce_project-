<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Jenssegers\Agent\Agent;

class BlockMobileAccess
{
    public function handle(Request $request, Closure $next)
    {
        $agent = new Agent();

        // Exclude admin login route
        if ($request->is('admin/login')) {
            return $next($request);
        }

        // Block mobile & tablet
        if ($agent->isMobile() || $agent->isTablet()) {
            abort(403, '🚫 The admin dashboard is not accessible from mobile.');
        }

        return $next($request);
    }
}
