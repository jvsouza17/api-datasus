<script setup lang="ts">
/**
 * Tipagem limpa para uso interno na aplicação.
 * Os nomes aqui estão em camelCase e mais curtos que os campos originais da API.
 */
export interface HospitalLeitos {
    regiao: string
    uf: string
    municipio: string
    motivoDesabilitacao?: string | null
    nome: string
    razaoSocial: string
    tipoGestao: string
    codigoTipoUnidade: string
    tipoUnidade: string
    naturezaJuridica: string
    descricaoNaturezaJuridica: string
    endereco: string
    numeroEndereco: string
    complementoEndereco?: string | null
    bairro: string
    cep: string
    totalLeitos: number
    totalLeitosSUS: number
    leitosUti: number
    leitosUtiSUS: number
    leitosUtiAdulto: number
    leitosUtiSUSAdulto: number
    leitosUtiPediatrico: number
    leitosUtiSUSPediatrico: number
    leitosUtiNeonatal: number
    leitosUtiSUSNeonatal: number
    leitosUtiQueimado: number
    leitosUtiSUSQueimado: number
    leitosUtiCoronariana: number
    leitosUtiSUSCoronariana: number
    codigoIbgeMunicipio?: string | null
}

// Observação: se você consumir o payload da API diretamente, crie um mapper que converta
// os campos da API (snake_case / nomes longos) para esta interface limpa (camelCase).
</script>