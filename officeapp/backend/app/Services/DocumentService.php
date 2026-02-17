<?php

namespace App\Services;

use App\Models\Document;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

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
     * staff: 自分の書類詳細（所有者チェック込み）
     */
    public function getMine(Document $doc, int $userId): Document
    {
        $this->assertOwned($doc, $userId);
        return $doc;
    }

    /**
     * staff: 下書き作成
     * ※入力の必須チェックはController(FormRequest)に寄せる前提なので、ここでは最低限の正規化だけ
     */
    public function createDraft(int $userId, string $type, string $title, array $documentData): Document
    {
        return Document::create([
            'user_id'       => $userId,
            'type'          => trim($type),
            'title'         => trim($title),
            'status'        => 'draft',
            'document_data' => $documentData,
            'submitted_at'  => null,
        ]);
    }

    /**
     * staff: 申請（提出）＝ submitted へ
     */
    public function submit(Document $doc, int $userId): Document
    {
        $this->assertOwned($doc, $userId);

        // statusの整合性は業務ルールなので、ここは残す（バリデーションでは防げない領域）
        if ($doc->status !== 'draft') {
            throw new \DomainException('Only draft documents can be submitted');
        }

        return DB::transaction(function () use ($doc) {
            $doc->status = 'submitted';
            $doc->submitted_at = CarbonImmutable::now();
            $doc->save();

            return $doc->refresh();
        });
    }

    /**
     * 共通：本人のドキュメントか
     */
    private function assertOwned(Document $doc, int $userId): void
    {
        if ((int) $doc->user_id !== (int) $userId) {
            throw new \DomainException('Forbidden');
        }
    }
}
