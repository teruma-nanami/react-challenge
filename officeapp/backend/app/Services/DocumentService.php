<?php

namespace App\Services;

use App\Models\Document;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class DocumentService
{
    /**
     * staff: 自分の書類一覧
     */
    public function listMine(int $userId): Collection
    {
        return Document::query()
            ->where('user_id', $userId)
            ->orderByDesc('updated_at')
            ->get();
    }

    /**
     * staff: 下書き作成
     */
    public function createDraft(int $userId, string $type, string $title, array $documentData): Document
    {
        if (trim($type) === '') {
            abort(422, 'type is required');
        }
        if (trim($title) === '') {
            abort(422, 'title is required');
        }

        return Document::create([
            'user_id'        => $userId,
            'type'           => $type,
            'title'          => $title,
            'status'         => 'draft',
            'document_data'  => $documentData,
            'submitted_at'   => null,
        ]);
    }

    /**
     * staff: 下書き更新（submitted は更新不可）
     */
    public function updateDraft(Document $doc, int $userId, array $attrs): Document
    {
        $this->assertOwned($doc, $userId);

        if ($doc->status !== 'draft') {
            abort(409, 'Submitted document cannot be updated');
        }

        $update = [];

        if (array_key_exists('type', $attrs)) {
            $type = (string)$attrs['type'];
            if (trim($type) === '') abort(422, 'type is required');
            $update['type'] = $type;
        }

        if (array_key_exists('title', $attrs)) {
            $title = (string)$attrs['title'];
            if (trim($title) === '') abort(422, 'title is required');
            $update['title'] = $title;
        }

        if (array_key_exists('document_data', $attrs)) {
            if (!is_array($attrs['document_data'])) abort(422, 'document_data must be an array');
            $update['document_data'] = $attrs['document_data'];
        }

        if ($update === []) {
            return $doc;
        }

        $doc->update($update);
        return $doc->refresh();
    }

    /**
     * staff: 申請（提出）＝ submitted へ
     */
    public function submit(Document $doc, int $userId): Document
    {
        $this->assertOwned($doc, $userId);

        if ($doc->status !== 'draft') {
            abort(409, 'Only draft documents can be submitted');
        }

        return DB::transaction(function () use ($doc) {
            $doc->status = 'submitted';
            $doc->submitted_at = CarbonImmutable::now(); // DBはUTC運用のままでOK
            $doc->save();

            return $doc->refresh();
        });
    }

    /**
     * staff: PDF生成（提出済みのみ）
     * 戻り値は "PDFバイナリ"（Controllerで download/stream に使う）
     */
    public function buildPdfBinary(Document $doc, int $userId): string
    {
        $this->assertOwned($doc, $userId);

        if ($doc->status !== 'submitted') {
            abort(409, 'Only submitted documents can be exported as PDF');
        }

        if (!class_exists(\Barryvdh\DomPDF\Facade\Pdf::class)) {
            abort(500, 'PDF library is not installed (barryvdh/laravel-dompdf)');
        }

        $html = $this->renderHtml($doc);

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadHTML($html)
            ->setPaper('A4', 'portrait');

        return $pdf->output();
    }

    /**
     * staff: PDFダウンロード用 Response（Serviceで返す版）
     * ※Controllerで使うなら buildPdfBinary() でもOK
     */
    public function buildPdfDownloadResponse(Document $doc, int $userId): Response
    {
        $binary = $this->buildPdfBinary($doc, $userId);

        $safeTitle = preg_replace('/[^\w\-]+/u', '_', $doc->title) ?: 'document';
        $filename = $safeTitle . '.pdf';

        return response($binary, 200, [
            'Content-Type'        => 'application/pdf',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    /**
     * 共通：本人のドキュメントか
     */
    private function assertOwned(Document $doc, int $userId): void
    {
        if ((int)$doc->user_id !== (int)$userId) {
            abort(403, 'Forbidden');
        }
    }

    /**
     * まずは「汎用PDF」で出す（最小実装）
     * document_data は JSON を見やすく整形して出力する。
     */
    private function renderHtml(Document $doc): string
    {
        $submittedAt = $doc->submitted_at ? $doc->submitted_at->toDateTimeString() : '';
        $prettyJson = json_encode($doc->document_data ?? [], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        $title = htmlspecialchars($doc->title, ENT_QUOTES, 'UTF-8');
        $type  = htmlspecialchars($doc->type, ENT_QUOTES, 'UTF-8');
        $submittedAtEsc = htmlspecialchars($submittedAt, ENT_QUOTES, 'UTF-8');

        return <<<HTML
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<style>
  body { font-family: DejaVu Sans, sans-serif; font-size: 12px; }
  h1 { font-size: 18px; margin: 0 0 8px 0; }
  .meta { margin: 0 0 12px 0; color: #333; }
  .meta div { margin: 2px 0; }
  pre { background: #f6f6f6; padding: 10px; border: 1px solid #ddd; white-space: pre-wrap; }
</style>
</head>
<body>
  <h1>{$title}</h1>
  <div class="meta">
    <div>type: {$type}</div>
    <div>submitted_at: {$submittedAtEsc}</div>
  </div>
  <pre>{$prettyJson}</pre>
</body>
</html>
HTML;
    }
}
