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
        $query = $this->contactService->baseQuery();
        $query = $this->contactService->applyFilters(
            $query,
            $request->query('status'),
            $request->query('category'),
            $request->query('keyword')
        );

        $contacts = $query
            ->orderByDesc('created_at')
            ->paginate(20);

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
        $contact = $this->contactService->createContact(
            $request->validated()
        );

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
}
