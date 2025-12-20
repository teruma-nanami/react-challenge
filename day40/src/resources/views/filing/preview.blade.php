@extends('layouts.app')

@section('content')
  @php
    /**
     * プロトタイプ用ダミーデータ
     */
    $summary =
        $summary ??
        (object) [
            'total_revenue' => 250000,
            'total_expense' => 98000,
            'profit' => 152000,
        ];

    $deductions =
        $deductions ??
        (object) [
            'salary_income' => 3500000,
            'salary_withholding_tax' => 120000,
            'social_insurance_ded' => 250000,
            'life_insurance_gen' => 40000,
            'life_insurance_med' => 20000,
            'life_insurance_annuity' => 30000,
            'medical_expense_ded' => 50000,
            'furusato_tax_ded' => 30000,
            'dependency_deduction_count' => 1,
            'has_spouse' => true,
        ];
  @endphp


  <div class="container py-4">

    <h3 class="fw-bold mb-4">確定申告書プレビュー</h3>

    <p class="text-muted">
      PDF に出力される内容の確認ページです。入力内容に誤りがないかをご確認ください。
    </p>


    {{-- ▼▼ 収支（事業所得） ▼▼ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">収支内訳書（事業所得）</div>
      <div class="card-body">

        <table class="table align-middle">
          <tbody>
            <tr>
              <th class="w-50">収入金額</th>
              <td class="text-end fw-bold">{{ number_format($summary->total_revenue) }} 円</td>
            </tr>

            <tr>
              <th>必要経費</th>
              <td class="text-end fw-bold">{{ number_format($summary->total_expense) }} 円</td>
            </tr>

            <tr>
              <th>所得金額（収入 − 経費）</th>
              <td class="text-end fw-bold">{{ number_format($summary->profit) }} 円</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>



    {{-- ▼▼ 控除一覧 ▼▼ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">適用控除</div>
      <div class="card-body">

        <table class="table align-middle">

          <tbody>
            <tr>
              <th class="w-50">給与所得</th>
              <td class="text-end">{{ number_format($deductions->salary_income) }} 円</td>
            </tr>
            <tr>
              <th>源泉徴収税額</th>
              <td class="text-end">{{ number_format($deductions->salary_withholding_tax) }} 円</td>
            </tr>
            <tr>
              <th>社会保険料控除</th>
              <td class="text-end">{{ number_format($deductions->social_insurance_ded) }} 円</td>
            </tr>
            <tr>
              <th>生命保険料控除（一般）</th>
              <td class="text-end">{{ number_format($deductions->life_insurance_gen) }} 円</td>
            </tr>
            <tr>
              <th>生命保険料控除（介護医療）</th>
              <td class="text-end">{{ number_format($deductions->life_insurance_med) }} 円</td>
            </tr>
            <tr>
              <th>生命保険料控除（個人年金）</th>
              <td class="text-end">{{ number_format($deductions->life_insurance_annuity) }} 円</td>
            </tr>
            <tr>
              <th>医療費控除</th>
              <td class="text-end">{{ number_format($deductions->medical_expense_ded) }} 円</td>
            </tr>
            <tr>
              <th>寄附金控除（ふるさと納税）</th>
              <td class="text-end">{{ number_format($deductions->furusato_tax_ded) }} 円</td>
            </tr>
            <tr>
              <th>扶養人数</th>
              <td class="text-end">{{ $deductions->dependency_deduction_count }} 人</td>
            </tr>
            <tr>
              <th>配偶者控除</th>
              <td class="text-end">
                {{ $deductions->has_spouse ? '適用あり' : 'なし' }}
              </td>
            </tr>
          </tbody>

        </table>

      </div>
    </div>



    {{-- ▼▼ PDF ダウンロードボタン ▼▼ --}}
    <div class="d-flex gap-2 mt-4">
      <a href="{{ route('filing.pdf_download') }}" class="btn btn-primary px-4">
        PDF をダウンロード
      </a>

      <a href="{{ route('filing.entries_summary') }}" class="btn btn-outline-secondary">
        仕訳データ一覧に戻る
      </a>
    </div>

  </div>
@endsection
