import type { LocaleConfig } from 'vuepress'

/** 单位ID */
export type SafeUnitId = Uppercase<string>
/** Csf标签 */
export type SafeCsfLabel = Uppercase<string>
/** 单位ID */
export type UnitId = string
/** Csf标签 */
export type CsfLabel = string
/** 图片文件名 */
export type ImageFileName = `${Lowercase<string>}.webp`
/** 包含CSF数据的对象 */
export type UnitCsfData = Pick<UnitData, 'uiName' | 'uiDescription'>
/** 包含建造前提的对象 */
export type UnitPrerequisite = Required<Pick<UnitData, 'prerequisite'>>

/** 单位数据 */
export interface UnitData {
  // ========== 通用 ==========
  unitId: UnitId
  /** 注册表类型 */
  unitType: string
  /** 文档路径 */
  esdnUri: string
  /** 隐藏单位 */
  esdnHidden?: boolean
  /** 继承单位 */
  baseOn?: string
  // ========== 单位 ==========
  /** 图标 */
  cameo?: ImageFileName
  /** 精英图标 */
  altCameo?: ImageFileName
  /** CSF 单位名 */
  uiName?: CsfLabel
  /** CSF 单位介绍 */
  uiDescription?: CsfLabel
  /** 游戏内类型 */
  category?: string
  /** 价格 */
  cost?: number
  /** 电力 */
  power?: number
  /** 生命值 */
  strength?: number
  /** 装甲 */
  armor?: UnitId
  /** 建造前提 */
  prerequisite?: UnitId[]
  /** 多武器 */
  weapons?: (UnitId | null)[]
  /** 精英多武器 */
  eliteWeapons?: (UnitId | null)[]
  /** 主武器 */
  primary?: UnitId
  /** 精英主武器 */
  elitePrimary?: UnitId
  /** 副武器 */
  secondary?: UnitId
  /** 精英副武器 */
  eliteSecondary?: UnitId
  /** 移动开火 */
  opportunityFire?: boolean
  /** 探测隐形 */
  detectDisguise?: boolean
  /** 建造时间系数 */
  buildTimeMultiplier?: number
  /** 碾压等级 */
  crushLevel?: number
  /** 高级碾压 */
  omniCrusher?: boolean
  /** 建造限制 */
  buildLimit?: number
  /** 隐形 */
  cloakable?: boolean
  /** 可部署 */
  deployer?: boolean
  /** 可进驻建筑 */
  occupier?: boolean
  /** 自愈 */
  selfHealing?: boolean
  /** 免疫EMP */
  immuneToEMP?: boolean
  /** 免疫病毒 */
  immuneToVeins?: boolean
  /** 免疫混乱 */
  immuneToPsionics?: boolean
  /** 免疫辐射 */
  immuneToRadiation?: boolean
  /** 免疫精神控制 */
  immuneToPoison?: boolean
  /** 弹药数量 */
  ammo?: number
  /** 可部署成为 */
  deploysInto?: UnitId
  /** 不可克隆 */
  cloneable?: boolean
  /** 不可进入战斗碉堡 */
  bunkerable?: boolean
  /** 不可升级 */
  trainable?: boolean
  /** 不可被碾压 */
  crushable?: boolean
  /** 需要使用电力 */
  isPowered?: boolean
  /** 重新补给时间 */
  rechargeTime?: number
  // ========== 武器 ==========
  /** 伤害 */
  damage?: number
  /** 射速 */
  rof?: number
  /** 射程 */
  range?: number
  /** 连发数 */
  burst?: number
  /** 连发间隔 */
  burstDelays?: number
  /** 弹头 */
  warhead?: string
  // ========== 弹头 ==========
  /** 伤害修正 */
  damageModifiers?: Record<UnitId, number>
  /** 伤害单位 */
  cellSpread?: number
  /** 是否影响友军 */
  affectsAllies?: boolean
  /** 是否影响敌军 */
  affectsEnemies?: boolean
  /** 是否影响自己 */
  affectsOwner?: boolean

  // ========== 全局建造前提 ==========
  /** 全局建造前提 */
  genericPrerequisites?: string[]
}

/** 单位文档数据源 */
export interface UnitDocSource {
  csf: LocaleConfig<Record<CsfLabel, string>>
  units: UnitData[]
  indexes: Record<string, string>
}

/** 文档生成器配置 */
export interface UnitDocOptions {
  /** 单位文档前缀 */
  prefix: `${string}/`
}
