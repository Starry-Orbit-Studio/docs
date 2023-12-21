<template>
  <div v-if="visible && unitData">
    <h3
      v-text="i18n('extraInfo', unitData.unitType, locale.lang)"
      id="extraInfo" />
    <ul>
      <li
        v-if="unitData?.opportunityFire"
        v-text="
          i18n('opportunityFire', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.detectDisguise"
        v-text="
          i18n('detectDisguise', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.buildTimeMultiplier"
        v-text="
          i18n(
            'buildTimeMultiplier',
            unitData.unitType,
            locale.lang,
            unitData,
            data => (typeof data === 'number' ? `${data * 100}%` : `${data}`),
          )
        " />
      <li
        v-if="unitData?.crushLevel"
        v-text="i18n('crushLevel', unitData.unitType, locale.lang, unitData)" />
      <li
        v-if="unitData?.omniCrusher"
        v-text="
          i18n('omniCrusher', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.buildLimit"
        v-text="i18n('buildLimit', unitData.unitType, locale.lang, unitData)" />
      <li
        v-if="unitData?.cloakable"
        v-text="i18n('cloakable', unitData.unitType, locale.lang, unitData)" />
      <li
        v-if="unitData?.deployer"
        v-text="i18n('deployer', unitData.unitType, locale.lang, unitData)" />
      <li v-if="unitData?.deploysInto">
        <div class="flex flex-row items-center">
          <span
            v-text="
              i18n(
                'deploysInto',
                unitData.unitType,
                locale.lang,
                unitData,
                data => '',
              )
            " />
          <UnitButton :unit="unitData.deploysInto" />
        </div>
      </li>
      <li
        v-if="unitData?.occupier"
        v-text="i18n('occupier', unitData.unitType, locale.lang, unitData)" />
      <li
        v-if="unitData?.selfHealing"
        v-text="
          i18n('selfHealing', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.immuneToEMP"
        v-text="
          i18n('immuneToEMP', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.immuneToVeins"
        v-text="
          i18n('immuneToVeins', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.immuneToPsionics"
        v-text="
          i18n('immuneToPsionics', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.immuneToRadiation"
        v-text="
          i18n('immuneToRadiation', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.immuneToPoison"
        v-text="
          i18n('immuneToPoison', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.ammo"
        v-text="i18n('ammo', unitData.unitType, locale.lang, unitData)" />
      <li
        v-if="unitData?.rechargeTime"
        v-text="
          i18n('rechargeTime', unitData.unitType, locale.lang, unitData)
        " />
      <li
        v-if="unitData?.cloneable"
        v-text="i18n('cloneable', unitData.unitType, locale.lang, unitData)" />
      <li
        v-if="unitData?.bunkerable"
        v-text="i18n('bunkerable', unitData.unitType, locale.lang, unitData)" />
      <li
        v-if="unitData?.trainable"
        v-text="i18n('trainable', unitData.unitType, locale.lang, unitData)" />
      <li
        v-if="unitData?.crushable"
        v-text="i18n('crushable', unitData.unitType, locale.lang, unitData)" />
      <li
        v-if="unitData?.isPowered"
        v-text="i18n('isPowered', unitData.unitType, locale.lang, unitData)" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useSiteLocaleData } from '@vuepress/client'
import { computed } from 'vue'
import { UnitId } from '../../types'
import common from '../common'
import UnitButton from './UnitButton.vue'

const data = __ESDNUnitDoc

const { i18n } = common()
const locale = useSiteLocaleData()
const props = defineProps<{
  unit: UnitId
}>()

const unitData = computed(() => data.units.find(i => i.unitId === props.unit))

const visible = computed(
  () =>
    unitData.value?.opportunityFire ||
    unitData.value?.detectDisguise ||
    unitData.value?.buildTimeMultiplier ||
    unitData.value?.crushLevel ||
    unitData.value?.omniCrusher ||
    unitData.value?.buildLimit ||
    unitData.value?.cloakable ||
    unitData.value?.deployer ||
    unitData.value?.deploysInto ||
    unitData.value?.occupier ||
    unitData.value?.selfHealing ||
    unitData.value?.immuneToEMP ||
    unitData.value?.immuneToVeins ||
    unitData.value?.immuneToPsionics ||
    unitData.value?.immuneToRadiation ||
    unitData.value?.immuneToPoison ||
    unitData.value?.ammo ||
    unitData.value?.rechargeTime ||
    unitData.value?.cloneable ||
    unitData.value?.bunkerable ||
    unitData.value?.trainable ||
    unitData.value?.crushable ||
    unitData.value?.isPowered,
)
</script>

<style lang="scss">
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.items-center {
  align-items: center;
}
</style>
