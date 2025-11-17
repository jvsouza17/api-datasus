import type { HospitalLeitos } from '~/dto/hospitaisLeitos.vue'

function toNumber(value: unknown): number {
  if (value == null || value === '') return 0
  if (typeof value === 'number') return value
  const n = Number(String(value).replace(/[^0-9\-\.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

function pick<T = any>(obj: Record<string, any>, ...keys: string[]): T | undefined {
  for (const k of keys) {
    if (k in obj && obj[k] !== undefined) return obj[k]
  }
  return undefined
}

/**
 * Converte um objeto bruto (payload da API) para a tipagem interna HospitalLeitos
 */
export function mapHospital(raw: Record<string, any>): HospitalLeitos {
  // Build stable id: prefer codigo_ibge when available, otherwise slug of uf+municipio+nome
  const codigoIbge = pick(raw, 'codigo_ibge_do_municipio', 'codigoIbgeMunicipio')
  const ufVal = String(pick(raw, 'unidade_da_federacao_onde_fica_o_hospital', 'UF', 'uf') ?? '')
  const municipioVal = String(pick(raw, 'nome_do_municipio_onde_fica_o_hospital', 'nome_municipio', 'municipio') ?? '')
  const nomeVal = String(pick(raw, 'nome_do_hospital', 'nome_hospital', 'nome') ?? '')

  const makeId = () => {
    if (codigoIbge) return String(codigoIbge)
    const slug = `${ufVal}-${municipioVal}-${nomeVal}`.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-]/g, '')
    return slug.slice(0, 80)
  }

  return {
    id: makeId(),
    regiao: String(pick(raw, 'nome_da_regiao_do_brasil_onde_fica_o_hospital', 'regiao', 'regiao_do_hospital') ?? ''),
    // normalize UF to uppercase
    uf: String((pick(raw, 'unidade_da_federacao_onde_fica_o_hospital', 'UF', 'uf') ?? '')).toUpperCase(),
    municipio: String(pick(raw, 'nome_do_municipio_onde_fica_o_hospital', 'nome_municipio', 'municipio') ?? ''),
  motivoDesabilitacao: pick(raw, 'motivo_da_desabilitacao_do_hospital,_caso_esteja_desabilitado', 'motivo_desabilitacao_hospital', 'motivoDesabilitacao') ?? null,
  nome: String(pick(raw, 'nome_do_hospital', 'nome_hospital', 'nome') ?? ''),
  razaoSocial: String(pick(raw, 'nome_da_razao_social_do_hospital', 'nome_razao_social', 'nome_razao_social_do_hospital', 'razaoSocial') ?? ''),
  tipoGestao: String(pick(raw, 'tipo_da_gestao_do_hospital', 'tipo_da_gestao', 'tipoGestao') ?? ''),
  codigoTipoUnidade: String(pick(raw, 'codigo_do_tipo_da_unidade', 'codigo_tipo_unidade', 'codigoTipoUnidade') ?? ''),
  tipoUnidade: String(pick(raw, 'descricao_do_tipo_da_unidade', 'tipo_unidade', 'tipoUnidade', 'descricao_tipo_unidade') ?? ''),
  naturezaJuridica: String(pick(raw, 'natureza_juridica_do_hospital', 'natureza_juridica', 'naturezaJuridica') ?? ''),
  descricaoNaturezaJuridica: String(pick(raw, 'descricao_da_natureza_juridica_do_hosptial', 'descricao_da_natureza_juridica_do_hospital', 'descricao_da_natureza_juridica_do_hospital', 'descricaoNaturezaJuridica') ?? ''),
  endereco: String(pick(raw, 'enderco_do_hospital', 'endereco_do_hospital', 'endereco') ?? ''),
  numeroEndereco: String(pick(raw, 'numero_do_endereco_do_hospital', 'numero_do_endereco_do_hospital', 'numeroEndereco') ?? ''),
  complementoEndereco: pick(raw, 'complemento_do_endereco_do_hospital', 'complementoEndereco') ?? null,
  bairro: String(pick(raw, 'nome_do_bairro_do_endereco_do_hosptial', 'nome_do_bairro_do_endereco_do_hospital', 'bairro') ?? ''),
  cep: String(pick(raw, 'numero_do_cep_do_hospital', 'numero_do_cep_do_hospital', 'cep') ?? ''),
  totalLeitos: toNumber(pick(raw, 'quantidade_total_de_leitos_do_hosptial', 'quantidade_total_de_leitos_do_hospital', 'quantidade_total_de_leitos') ?? 0),
  totalLeitosSUS: toNumber(pick(raw, 'quantidade_total_de_leitos_sus_do_hosptial', 'quantidade_total_de_leitos_sus_do_hospital') ?? 0),
  leitosUti: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_do_hosptial', 'qtd_leitos_de_uti_do_hospital', 'qtd_leitos_de_uti_do_hospital', 'leitosUti') ?? 0),
  leitosUtiSUS: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_sus_do_hosptial', 'quantidade_de_leitos_de_uti_sus_do_hospital') ?? 0),
  leitosUtiAdulto: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_adulto_do_hosptial', 'quantidade_de_leitos_de_uti_adulto_do_hospital') ?? 0),
  leitosUtiSUSAdulto: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_sus_adulto_do_hosptial', 'quantidade_de_leitos_de_uti_sus_adulto_do_hospital') ?? 0),
  leitosUtiPediatrico: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_pediatrico_do_hosptial', 'quantidade_de_leitos_de_uti_pediatrico_do_hospital') ?? 0),
  leitosUtiSUSPediatrico: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_sus_pediatrico_do_hosptial', 'quantidade_de_leitos_de_uti_sus_pediatrico_do_hospital') ?? 0),
  leitosUtiNeonatal: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_neonatal_do_hosptial', 'quantidade_de_leitos_de_uti_neonatal_do_hospital') ?? 0),
  leitosUtiSUSNeonatal: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_sus_neonatal_do_hosptial', 'quantidade_de_leitos_de_uti_sus_neonatal_do_hospital') ?? 0),
  leitosUtiQueimado: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_queimado_do_hosptial', 'quantidade_de_leitos_de_uti_queimado_do_hospital') ?? 0),
  leitosUtiSUSQueimado: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_sus_queimado_do_hosptial', 'quantidade_de_leitos_de_uti_sus_queimado_do_hospital') ?? 0),
  leitosUtiCoronariana: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_coronariana_do_hosptial', 'quantidade_de_leitos_de_uti_coronariana_do_hospital') ?? 0),
  leitosUtiSUSCoronariana: toNumber(pick(raw, 'quantidade_de_leitos_de_uti_sus_coronariana_do_hosptial', 'quantidade_de_leitos_de_uti_sus_coronariana_do_hospital') ?? 0),
    codigoIbgeMunicipio: pick(raw, 'codigo_ibge_do_municipio', 'codigoIbgeMunicipio') ?? null
  }
}

/**
 * Converte um array de items brutos para a tipagem interna
 */
export function mapHospitals(rawArray: any[]): HospitalLeitos[] {
  if (!Array.isArray(rawArray)) return []
  return rawArray.map(mapHospital)
}

export default { mapHospital, mapHospitals }
