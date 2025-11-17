<template>
    <div>
        <header class="p-6 border-b border-gray-700">
            <h1>Assistência à Saúde</h1>
            <p>Hospitais e leitos disponíveis por município.</p>
        </header>
    <AsyncData :url="`${apiUrl}/assistencia-a-saude/hospitais-e-leitos`" v-slot="{ dadosOrdenados, isReady }">
      <div v-if="isReady">
        <UTable :data="dadosOrdenados" :columns="columns" :getRowId="row => row.id"/>
      </div>
      <div v-else>Carregando...</div>
    </AsyncData>
    </div>
</template>

<script setup lang="ts">
import type { HospitalLeitos } from '~/dto/hospitaisLeitos.vue';
import type { ColumnDef } from '@tanstack/vue-table';
import { apiUrl } from '~/environment/endpointApi.vue';
import { h } from 'vue'

    const columns: ColumnDef<HospitalLeitos>[] = [
        {
            header: 'Nome do Hospital',
            accessorKey: 'nome',
        },
        {
            header: 'Município',
            accessorKey: 'municipio',
        },
        {
            header: 'UF',
            accessorKey: 'uf',
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center'
                }
            }
        },
        {
            header: 'Total de Leitos',
            accessorKey: 'totalLeitos',
            meta: {
                class: {
                    th: 'text-center',
                    td: 'text-center'
                }
            },
            cell: ({ row }) => {
            const total = Number(row.getValue('totalLeitos') ?? 0)
            const colorHexMap = {
                low: '#ef4444', // red-500
                medium: '#eab308', // yellow-500
                high: '#16a34a' // green-500
            } as const;
            const status = total <= 20 ? 'low' : total >= 50 ? 'high' : 'medium';
            const colorHex = colorHexMap[status];
            return h(
                'span',
                {
                    style: { color: colorHex }
                },
                String(total)
            )
            }
        }
    ]

</script>