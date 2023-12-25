using System.Text.Json.Serialization;

namespace ESDN.UnitDoc.Tools.Model;

public sealed record class UnitData : IBaseOnable
{
    public UnitData(string id, string type)
    {
        UnitId = id.ToUpperInvariant();
        UnitType = type;
        ESDNUri = $"{type.Replace("Types", string.Empty)}/{UnitId}.html";
    }

    /// <summary>
    /// 单位ID
    /// </summary>
    public string UnitId { get; }
    /// <summary>
    /// 注册表类型
    /// </summary>
    public string UnitType { get; }
    /// <summary>
    /// 文档相对路径
    /// </summary>
    public string ESDNUri { get; }
    /// <summary>
    /// 隐藏单位
    /// </summary>
    public bool ESDNHidden { get; set; }

    /// <summary>
    /// 通用建造前提
    /// </summary>
    public string[]? GenericPrerequisites { get; set; }
    /// <summary>
    /// 分类
    /// </summary>
    public string? Category { get; set; }
    public string? BaseOn { get; set; }
    [INIKey("CameoPCX")]
    [INIKey("SidebarImage")]
    [INIKey("SidebarPCX")]
    public string? Cameo { get; set; }
    [INIKey("AltCameoPCX")]
    public string? AltCameo { get; set; }
    [JsonIgnore]
    public string? Image { get; set; }
    [JsonIgnore]
    public int AIBasePlanningSide { get; set; }
    [JsonIgnore]
    public int TechLevel { get; set; }
    public string? UIName { get; set; }
    public string? UIDescription { get; set; }
    public int? Cost { get; set; }
    public int? Power { get; set; }
    public int? Strength { get; set; }
    public string? Armor { get; set; }
    public string[]? Prerequisite { get; set; }
    public string[]? Weapons { get; set; }
    public string[]? EliteWeapons { get; set; }
    public string? Primary { get; set; }
    public string? ElitePrimary { get; set; }
    public string? Secondary { get; set; }
    public string? EliteSecondary { get; set; }
    public bool? OpportunityFire { get; set; }
    public bool? DetectDisguise { get; set; }
    public float? BuildTimeMultiplier { get; set; }
    public int? CrushLevel { get; set; }
    public bool? OmniCrusher { get; set; }
    public int? BuildLimit { get; set; }
    public bool? Cloakable { get; set; }
    public bool? Deployer { get; set; }
    public bool? Occupier { get; set; }
    public bool? SelfHealing { get; set; }
    public bool? ImmuneToEMP { get; set; }
    public bool? ImmuneToVeins { get; set; }
    public bool? ImmuneToPsionics { get; set; }
    public bool? ImmuneToRadiation { get; set; }
    public bool? ImmuneToPoison { get; set; }
    public int? Ammo { get; set; }
    public string? DeploysInto { get; set; }
    public string? UndeploysInto { get; set; }
    public bool? Cloneable { get; set; }
    public bool? Bunkerable { get; set; }
    public bool? Trainable { get; set; }
    public bool? Crushable { get; set; }
    public bool? IsPowered { get; set; }
    public float? RechargeTime { get; set; }

    // 武器
    public float? Damage { get; set; }
    public float? ROF { get; set; }
    public float? Range { get; set; }
    public float? Burst { get; set; }
    [INIKey("Burst.Delays")]
    public float? BurstDelays { get; set; }
    /// <summary>
    /// 弹头
    /// </summary>
    public string? Warhead { get; set; }

    // 弹头
    [JsonIgnore]
    public Verses? Verses { get; set; }
    public Dictionary<string, float>? DamageModifiers { get; set; }
    public float CellSpread { get; set; }
    public bool? AffectsAllies { get; set; }
    public bool? AffectsEnemies { get; set; }
    public bool? AffectsOwner { get; set; }
}
