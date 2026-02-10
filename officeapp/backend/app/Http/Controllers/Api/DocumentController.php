<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Services\DocumentService;
use Illuminate\Http\Request;

class DocumentController extends Controller
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
        $userId = (int) $request->user()->id;

        $docs = $this->documentService->listMine($userId);

        return response()->json($docs);
    }

    /**
     * POST /api/documents
     * 下書き作成
     */
    public function store(Request $request)
    {
        $userId = (int) $request->user()->id;

        $validated = $request->validate([
            'type'          => ['required', 'string'],
            'title'         => ['required', 'string'],
            'document_data' => ['required', 'array'],
        ]);

        $doc = $this->documentService->createDraft(
            $userId,
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
        $userId = (int) $request->user()->id;

        // 所有チェックは Service 側と揃えるため、PDF生成と同じルールに寄せる
        // show は submitted/draft どちらも見えてOK
        if ((int)$document->user_id !== $userId) {
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
        $userId = (int) $request->user()->id;

        $validated = $request->validate([
            'type'          => ['sometimes', 'string'],
            'title'         => ['sometimes', 'string'],
            'document_data' => ['sometimes', 'array'],
        ]);

        $doc = $this->documentService->updateDraft($document, $userId, $validated);

        return response()->json($doc);
    }

    /**
     * POST /api/documents/{document}/submit
     * 申請（提出）
     */
    public function submit(Request $request, Document $document)
    {
        $userId = (int) $request->user()->id;

        $doc = $this->documentService->submit($document, $userId);

        return response()->json($doc);
    }

    /**
     * GET /api/documents/{document}/pdf
     * PDFダウンロード（submittedのみ）
     */
    public function pdf(Request $request, Document $document)
    {
        $userId = (int) $request->user()->id;

        return $this->documentService->buildPdfDownloadResponse($document, $userId);
    }
}
