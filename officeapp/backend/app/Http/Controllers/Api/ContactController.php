<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends ApiController
{
    public function __construct(
        private ContactService $contactService
    ) {}

    /**
     * GET /api/contacts（auth必須）
     */
    public function index(Request $request): JsonResponse
    {
        $contacts = $this->contactService->getContacts(
            status: $request->query('status'),
            category: $request->query('category'),
            keyword: $request->query('keyword')
        );

        return $this->ok($contacts);
    }

    /**
     * GET /api/contacts/{id}（auth必須）
     */
    public function show(int $id): JsonResponse
    {
        $contact = Contact::findOrFail($id);

        return $this->ok($contact);
    }

    /**
     * POST /api/contacts（公開）
     */
    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = $this->contactService->createContact($request->validated());

        return $this->created($contact);
    }

    /**
     * PUT /api/contacts/{id}（auth必須）
     */
    public function update(UpdateContactRequest $request, int $id): JsonResponse
    {
        $contact = $this->contactService->updateContact(
            $id,
            $request->validated()
        );

        return $this->ok($contact);
    }

    /**
     * DELETE /api/contacts/{id}（auth必須）
     */
    public function destroy(int $id): JsonResponse
    {
        Contact::findOrFail($id)->delete();

        return $this->noContent();
    }
}
