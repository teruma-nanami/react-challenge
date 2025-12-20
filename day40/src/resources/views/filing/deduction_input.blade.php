@extends('layouts.app')

@section('content')
  @php
    /**
     * ------------------------------------------------------------
     * プロトタイプ用ダミーデータ（表示専用）
     * 本番では Controller から $deductions を渡します
     * ------------------------------------------------------------
     */
    if (!isset($deductions)) {
        $deductions = (object) [
            'salary_income' => 0,
            'salary_withholding_tax' => 0,
            'social_insurance_ded' => 0,
            'life_insurance_gen' => 0,
            'life_insurance_med' => 0,
            'life_insurance_annuity' => 0,
            'medical_expense_ded' => 0,
            'furusato_tax_ded' => 0,
            'dependency_deduction_count' => 0,
            'has_spouse' => false,
        ];
    }
  @endphp


  <div class="container py-4">

    <h3 class="fw-bold mb-4">控除の入力</h3>

    <p class="text-muted mb-3">
      厳選徴収票や控除証明書をもとに、申告に必要な控除額を入力してください。
      ※ プロトタイプ版のため、このページは保存を行いません。
    </p>


    {{-- ▼▼ 給与所得（厳選徴収票） ▼▼ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">給与所得（厳選徴収票）</div>
      <div class="card-body">

        <div class="mb-3">
          <label class="form-label fw-semibold">給与所得</label>
          <input type="number" name="salary_income" class="form-control" value="{{ $deductions->salary_income }}"
            placeholder="例：3,500,000">
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">源泉徴収税額</label>
          <input type="number" name="salary_withholding_tax" class="form-control"
            value="{{ $deductions->salary_withholding_tax }}" placeholder="例：120,000">
        </div>

      </div>
    </div>



    {{-- ▼▼ 社会保険料控除 ▼▼ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">社会保険料控除</div>
      <div class="card-body">

        <div class="mb-3">
          <label class="form-label fw-semibold">社会保険料（国民年金含む）</label>
          <input type="number" name="social_insurance_ded" class="form-control"
            value="{{ $deductions->social_insurance_ded }}" placeholder="例：250,000">
        </div>

      </div>
    </div>



    {{-- ▼▼ 生命保険料控除（3区分） ▼▼ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">生命保険料控除（3区分）</div>
      <div class="card-body">

        <div class="mb-3">
          <label class="form-label fw-semibold">一般生命保険料</label>
          <input type="number" name="life_insurance_gen" class="form-control"
            value="{{ $deductions->life_insurance_gen }}">
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">介護医療保険料</label>
          <input type="number" name="life_insurance_med" class="form-control"
            value="{{ $deductions->life_insurance_med }}">
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">個人年金保険料</label>
          <input type="number" name="life_insurance_annuity" class="form-control"
            value="{{ $deductions->life_insurance_annuity }}">
        </div>

      </div>
    </div>



    {{-- ▼▼ 医療費控除 ▼▼ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">医療費控除</div>
      <div class="card-body">

        <div class="mb-3">
          <label class="form-label fw-semibold">医療費控除額</label>
          <input type="number" name="medical_expense_ded" class="form-control"
            value="{{ $deductions->medical_expense_ded }}">
        </div>

      </div>
    </div>



    {{-- ▼▼ 寄附金控除（ふるさと納税） ▼▼ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">寄附金控除（ふるさと納税）</div>
      <div class="card-body">

        <div class="mb-3">
          <label class="form-label fw-semibold">ふるさと納税額</label>
          <input type="number" name="furusato_tax_ded" class="form-control" value="{{ $deductions->furusato_tax_ded }}">
        </div>

      </div>
    </div>



    {{-- ▼▼ 扶養控除 ▼▼ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">扶養控除</div>
      <div class="card-body">

        <div class="mb-3">
          <label class="form-label fw-semibold">扶養人数</label>
          <input type="number" name="dependency_deduction_count" class="form-control"
            value="{{ $deductions->dependency_deduction_count }}" min="0">
        </div>

      </div>
    </div>



    {{-- ▼▼ 配偶者控除 ▼▼ --}}
    <div class="card mb-4">
      <div class="card-header fw-semibold">配偶者控除</div>
      <div class="card-body">

        <div class="form-check mb-2">
          <input type="checkbox" class="form-check-input" id="has_spouse" name="has_spouse" value="1"
            @checked($deductions->has_spouse)>
          <label for="has_spouse" class="form-check-label">
            配偶者がいます
          </label>
        </div>

        <p class="text-muted small">
          ※ 配偶者控除の細かい判定は後続の計算ロジックで自動処理されます。
        </p>

      </div>
    </div>



    {{-- ▼▼ 保存ボタン（非機能） ▼▼ --}}
    <button type="button" class="btn btn-success" disabled>
      保存（プロトタイプでは無効）
    </button>

    <a href="{{ route('filing.annual_summary') }}" class="btn btn-outline-secondary ms-2">
      年間損益に戻る
    </a>

  </div>
@endsection
