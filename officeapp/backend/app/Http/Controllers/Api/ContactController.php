<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function __construct(
        private ContactService $contactService
    ) {}

    private function ok(mixed $data, string $message = 'OK', int $status = 200): JsonResponse
    {
        return response()->json([
            'data' => $data,
            'message' => $message,
        ], $status);
    }

    public function index(Request $request): JsonResponse
    {
        $contacts = $this->contactService->getContacts(
            status: $request->query('status'),
            category: $request->query('category'),
            keyword: $request->query('keyword')
        );

        return $this->ok($contacts);
    }

    public function show(int $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);

        return $this->ok($contact);
    }

    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = $this->contactService->createContact($request->validated());

        return $this->ok($contact, 'Created', 201);
    }

    public function update(UpdateContactRequest $request, int $id): JsonResponse
    {
        $contact = $this->contactService->updateContact(
            $id,
            $request->validated()
        );

        return $this->ok($contact);
    }

    public function destroy(int $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);
        $contact->delete();

        return response()->json(null, 204);
    }
}