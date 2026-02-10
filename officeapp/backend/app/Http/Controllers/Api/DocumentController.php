<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use App\Services\DocumentService;
use Illuminate\Http\Request;

class DocumentController extends ApiController
{
    private DocumentService $documentService;

    public function __construct(DocumentService $documentService)
    {
        $this->documentService = $documentService;
    }

    /**
     * GET /api/documents
     * 自分の書類一覧
     */
    public function index(Request $request)
    {
        $user = $this->currentUser($request);
        $docs = $this->documentService->listMine((int)$user->id);

        return response()->json($docs);
    }

    /**
     * POST /api/documents
     * 下書き作成
     */
    public function store(Request $request)
    {
        $user = $this->currentUser($request);

        $validated = $request->validate([
            'type'          => ['required', 'string'],
            'title'         => ['required', 'string'],
            'document_data' => ['required', 'array'],
        ]);

        $doc = $this->documentService->createDraft(
            (int)$user->id,
            $validated['type'],
            $validated['title'],
            $validated['document_data']
        );

        return response()->json($doc, 201);
    }

    /**
     * GET /api/documents/{document}
     * 自分の書類詳細
     */
    public function show(Request $request, Document $document)
    {
        $user = $this->currentUser($request);

        if ((int)$document->user_id !== (int)$user->id) {
            abort(403, 'Forbidden');
        }

        return response()->json($document);
    }

    /**
     * PUT /api/documents/{document}
     * 下書き更新（submittedは更新不可）
     */
    public function update(Request $request, Document $document)
    {
        $user = $this->currentUser($request);

        $validated = $request->validate([
            'type'          => ['sometimes', 'string'],
            'title'         => ['sometimes', 'string'],
            'document_data' => ['sometimes', 'array'],
        ]);

        $doc = $this->documentService->updateDraft($document, (int)$user->id, $validated);

        return response()->json($doc);
    }

    /**
     * POST /api/documents/{document}/submit
     * 申請（提出）
     */
    public function submit(Request $request, Document $document)
    {
        $user = $this->currentUser($request);

        $doc = $this->documentService->submit($document, (int)$user->id);

        return response()->json($doc);
    }

    /**
     * GET /api/documents/{document}/pdf
     * PDFダウンロード（submittedのみ）
     */
    public function pdf(Request $request, Document $document)
    {
        $user = $this->currentUser($request);

        return $this->documentService->buildPdfDownloadResponse($document, (int)$user->id);
    }
}
