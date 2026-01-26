<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateContactRequest;
use App\Services\AdminService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function __construct(
        private AdminService $adminService
    ) {}

    public function contactsIndex(Request $request): JsonResponse
    {
        $contacts = $this->adminService->getContacts(
            $request->query('status'),
            $request->query('category'),
            $request->query('keyword')
        );

        return response()->json($contacts);
    }

    public function contactsShow(int $id): JsonResponse
    {
        $contact = $this->adminService->getContactById($id);

        return response()->json($contact);
    }

    public function contactsUpdate(UpdateContactRequest $request, int $id): JsonResponse
    {
        $contact = $this->adminService->updateContact($id, $request->validated());

        return response()->json($contact);
    }
}
