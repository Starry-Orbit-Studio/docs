<template>
  <div v-if="unitData" class="unit-detail">
    <table>
      <thead>
        <tr>
          <th colspan="255">
            {{ i18n('typeName', unitData.unitType, locale.lang, unitData) }}
            :
            {{ csf(unitData.uiName, locale.lang) || unitData.unitId }}
          </th>
        </tr>
        <tr v-if="unitData.cameo || unitData.altCameo">
          <th v-text="i18n('icon', unitData.unitType, locale.lang, unitData)" />
          <td colspan="255">
            <div class="unit-detail-icon" :class="{ elite: unitData.altCameo }">
              <UnitIcon :unit="unit" alt="普通" />
              <UnitIcon
                v-if="unitData.altCameo"
                :unit="unit"
                alt="精英"
                elite />
            </div>
          </td>
        </tr>
        <TRHelper
          :data="{
            [i18n('description', unitData.unitType, locale.lang, unitData)]:
              csf(unitData.uiDescription, locale.lang),
          }" />
      </thead>
      <tbody>
        <TRHelper
          :data="{
            [i18n('cost', unitData.unitType, locale.lang, unitData)]:
              unitData.cost,
            [i18n('power', unitData.unitType, locale.lang, unitData)]:
              unitData.power,
          }" />
        <TRHelper
          :data="{
            [i18n('strength', unitData.unitType, locale.lang, unitData)]:
              unitData.strength,
            [i18n('armor', unitData.unitType, locale.lang, unitData)]:
              unitData.armor,
          }" />
        <TRHelper
          :data="{
            [i18n('primary', unitData.unitType, locale.lang, unitData)]:
              unitData.primary,
            [i18n('elitePrimary', unitData.unitType, locale.lang, unitData)]:
              unitData.elitePrimary,
          }"
          button />
        <TRHelper
          :data="{
            [i18n('secondary', unitData.unitType, locale.lang, unitData)]:
              unitData.secondary,
            [i18n('eliteSecondary', unitData.unitType, locale.lang, unitData)]:
              unitData.eliteSecondary,
          }"
          button />
        <tr v-if="unitData.prerequisite?.length">
          <th v-text="i18n('prerequisite', unitData.unitType, locale.lang)" />
          <td colspan="255">
            <div class="flex flex-row gap-2 justify-center">
              <UnitButton
                v-for="(unit, index) in unitData.prerequisite"
                :key="index"
                :unit="unit" />
            </div>
          </td>
        </tr>
        <TRHelper
          :data="{
            [i18n('damage', unitData.unitType, locale.lang, unitData)]:
              unitData.damage,
            [i18n('rof', unitData.unitType, locale.lang, unitData)]:
              unitData.rof,
            [i18n('range', unitData.unitType, locale.lang, unitData)]:
              unitData.range,
            [i18n('burst', unitData.unitType, locale.lang, unitData)]:
              unitData.burst,
            [i18n('burstDelays', unitData.unitType, locale.lang, unitData)]:
              unitData.burstDelays,
          }" />
        <TRHelper
          :data="{
            [i18n('warhead', unitData.unitType, locale.lang, unitData)]:
              unitData.warhead,
          }"
          button />
        <TRHelper
          :data="{
            [i18n('cellSpread', unitData.unitType, locale.lang, unitData)]:
              unitData.cellSpread,
            [i18n('affectsAllies', unitData.unitType, locale.lang, unitData)]:
              unitData.affectsAllies,
            [i18n('affectsEnemies', unitData.unitType, locale.lang, unitData)]:
              unitData.affectsEnemies,
            [i18n('affectsOwner', unitData.unitType, locale.lang, unitData)]:
              unitData.affectsOwner,
          }" />
      </tbody>
    </table>
    <details v-if="unitData.damageModifiers">
      <summary
        v-text="
          i18n('damageModifiers', unitData.unitType, locale.lang, unitData)
        " />

      <table>
        <tr v-for="(value, key) in unitData.damageModifiers" :key="key">
          <th v-text="key" />
          <td v-text="value" />
        </tr>
      </table>
    </details>
  </div>
</template>

<script lang="ts" setup>
import { computed, h } from 'vue'
import common from '../common'
import UnitButton from './UnitButton.vue'
import UnitIcon from './UnitIcon.vue'
import TRHelper from './_TRHelper.vue'
import { UnitId } from '../../types'
import { useSiteLocaleData } from '@vuepress/client'

const data = __ESDNUnitDoc

const { i18n, csf } = common()
const locale = useSiteLocaleData()
const props = defineProps<{
  unit: UnitId
}>()

const unitData = computed(() => data.units.find(i => i.unitId === props.unit))
</script>

<style lang="scss">
.unit-detail {
  table {
    .unit-detail-icon {
      display: grid;
      grid-template-columns: 1fr;

      &.elite {
        grid-template-columns: 1fr 1fr;
      }

      & > * {
        margin: auto;
      }
    }

    .gap-2 {
      gap: 0.5rem;
    }

    .flex {
      display: flex;
    }
    .flex-row {
      flex-direction: row;
    }
    .justify-center {
      justify-content: center;
    }
    .items-center {
      align-items: center;
    }
  }
}
</style>
