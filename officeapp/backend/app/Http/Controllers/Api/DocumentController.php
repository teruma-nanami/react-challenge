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
        $docs = $this->documentService->listMine((int) $user->id);

        return response()->json($docs);
    }

    /**
     * POST /api/documents
     * 下書き作成
     * ※バリデーションは次フェーズでFormRequest化する前提でOK
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
            (int) $user->id,
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

        $doc = $this->documentService->getMine($document, (int) $user->id);

        return response()->json($doc);
    }

    /**
     * POST /api/documents/{document}/submit
     * 申請（提出）
     */
    public function submit(Request $request, Document $document)
    {
        $user = $this->currentUser($request);

        $doc = $this->documentService->submit($document, (int) $user->id);

        return response()->json($doc);
    }

    /**
     * GET /api/documents/{document}/pdf
     * PDFダウンロード（submittedのみ）
     * ※PDFは後回し方針なので、現状は未実装でもOK
     */
    public function pdf(Request $request, Document $document)
    {
        $user = $this->currentUser($request);

        // まだPDF実装しないなら、一旦 501 を返して明示するのが事故りにくい
        abort(501, 'PDF is not implemented yet');

        // PDFを実装する段階になったら、ここでServiceに委譲する
        // return $this->documentService->buildPdfDownloadResponse($document, (int) $user->id);
    }
}
