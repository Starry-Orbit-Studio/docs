using System.Diagnostics.CodeAnalysis;
using System.Text.Json;

using ESDN.UnitDoc.Tools.Model;

using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Shimakaze.Sdk.Graphic;
using Shimakaze.Sdk.Graphic.Pal;
using Shimakaze.Sdk.Graphic.Shp;
using Shimakaze.Sdk.Ini.Ares;
using Shimakaze.Sdk.Pcx;

using SixLabors.ImageSharp;
using System.Linq;

namespace ESDN.UnitDoc.Tools;

public sealed class UnitDocGenerator
{
    private readonly JsonSerializerOptions _jsonSerializerOptions;
    private readonly UnitDocGeneratorOptions _unitDocGeneratorOptions;
    private readonly ILogger? _logger;

    private readonly Dictionary<string, string> _csf;
    private readonly AresIniDocument _rules;
    private readonly AresIniDocument _art;
    private readonly UnitDocSource _source;
    private readonly PcxDecoder _pcxDecoder = new();
    private readonly ShapeDecoder? _shpDecoder;

    public UnitDocGenerator(
        IOptions<UnitDocGeneratorOptions> unitDocGeneratorOptions,
        IOptions<JsonSerializerOptions> jsonSerializerOptions,
        ILogger<UnitDocGenerator>? logger = default)
    {
        _jsonSerializerOptions = jsonSerializerOptions.Value;
        _unitDocGeneratorOptions = unitDocGeneratorOptions.Value;
        _logger = logger;

        // Loading CSF Files
        _csf = CSFUtils.LoadCsf(_unitDocGeneratorOptions.CsfReaderFactory, _unitDocGeneratorOptions.CsfFiles).Result;
        // Loading Rules INI Files
        _rules = IniUtils.ReadIni(_unitDocGeneratorOptions.RulesFile);
        // Loading Art INI Files
        _art = IniUtils.ReadIni(_unitDocGeneratorOptions.ArtFile);

        string pal = Path.Combine(_unitDocGeneratorOptions.SourcePreviewFolder, "cameo.pal");
        if (File.Exists(pal))
        {
            using Stream stream = File.OpenRead(pal);
            using PaletteReader reader = new(stream);
            _shpDecoder = new(reader.Read());
        }

        _source = new();
    }
    public async Task RunAsync()
    {
        BuildSource();

        string[] iconFiles = Directory.GetFiles(_unitDocGeneratorOptions.SourcePreviewFolder);

        await Task.WhenAll(_source.Units!.SelectMany(unit =>
        {
            List<Task> tasks = [];
            if (!string.IsNullOrEmpty(unit.Cameo))
                tasks.Add(BuildPreview(unit.Cameo, iconFiles).ContinueWith(_ =>
                {
                    if (!unit.Cameo.EndsWith(".webp"))
                        unit.Cameo += ".webp";
                }));
            if (!string.IsNullOrEmpty(unit.AltCameo))
                tasks.Add(BuildPreview(unit.AltCameo, iconFiles).ContinueWith(_ =>
                {
                    if (!unit.AltCameo.EndsWith(".webp"))
                        unit.AltCameo += ".webp";
                }));
            return tasks;
        }));

        await using FileStream fs = File.Create(_unitDocGeneratorOptions.TargetJSONFile);

        await JsonSerializer.SerializeAsync(fs, _source, _jsonSerializerOptions).ConfigureAwait(false);


    }

    private async Task BuildPreview(string name, string[] iconFiles)
    {
        await Task.Yield();

        string? file = iconFiles
             .FirstOrDefault(file => string.Equals(name, Path.GetFileNameWithoutExtension(file), StringComparison.OrdinalIgnoreCase));

        if (file is null)
            return;

        await using MemoryStream ms = new();
        await using Stream stream = File.OpenRead(file);
        IDecoder? decoder = Path.GetExtension(file).ToLowerInvariant() switch
        {
            ".shp" when _shpDecoder is not null => _shpDecoder,
            ".pcx" => _pcxDecoder,
            _ => default,
        };
        if (decoder?.Decode(stream).RootFrame is IImageFrame data)
        {
            data.WriteTo<Shimakaze.Sdk.Graphic.Pixel.Rgb24>(ms);
            using Image image = Image.LoadPixelData<SixLabors.ImageSharp.PixelFormats.Rgb24>(ms.ToArray(), data.Width, data.Height);
            await image.SaveAsWebpAsync(Path.Combine(_unitDocGeneratorOptions.TargetIconFolder, name + ".webp"));
        }
    }

    private void BuildSource()
    {
        LoadRules();
        BuildArt();

        // 后处理
        foreach (var unit in _source.Units!)
        {
            if (!string.IsNullOrEmpty(unit.Cameo))
            {
                if (unit.Cameo.EndsWith(".pcx", StringComparison.OrdinalIgnoreCase))
                    unit.Cameo = unit.Cameo[..^4];

                unit.Cameo = unit.Cameo.ToUpperInvariant();
            }
            if (!string.IsNullOrEmpty(unit.AltCameo))
            {
                if (unit.AltCameo.EndsWith(".pcx", StringComparison.OrdinalIgnoreCase))
                    unit.AltCameo = unit.AltCameo[..^4];

                unit.AltCameo = unit.AltCameo.ToUpperInvariant();
            }
        }

        // 计算伤害修正比
        var armorTypes = _rules["ArmorTypes"]
            .ToDictionary(
                i => i.Key.ToUpperInvariant().Trim(),
                i => i.Value.ToUpperInvariant().Trim());
        _source
            .Units
            !.Where(i => i.Verses is not null)
            .ToList()
            .ForEach(i =>
        {
            i.DamageModifiers = i.Verses!.ToDictionary();
            foreach (var armor in armorTypes)
            {
                if (!float.TryParse(armor.Value, out float value))
                {
                    // 百分比
                    if (armor.Value.EndsWith('%'))
                        value = float.Parse(armor.Value[..^1]) / 100;
                    if (!i.DamageModifiers.TryGetValue(armor.Value, out value))
                        continue;
                }

                i.DamageModifiers[armor.Key] = value;
            }
        });

        BuildCsf();
        // 组织生成目录页
        _source.Indexes = _source
            .Units!
            .GroupBy(i => i.UnitType)
            .ToDictionary(
                i => i.Key.Replace("Types", string.Empty),
                i => string.Join(' ', i.Where(i => !i.ESDNHidden).Select(i => $"<UnitButton unit=\"{i.UnitId}\" />")));

        // 组织侧边栏
    }

    private void LoadRules()
    {
        // 读取规则文件
        // 读取通用建造前提
        Dictionary<string, string[]> genericPrerequisites = _rules["GenericPrerequisites"]
            .Select(x => (x.Key, Values: x.Value.Split(',').Select(i => i.Trim().ToUpperInvariant()).Where(i => !string.IsNullOrEmpty(i)).ToArray()))
            .ToDictionary(i => i.Key, i => i.Values);

        // 所有的被注册的单位
        Dictionary<string, UnitData> map = _unitDocGeneratorOptions
            .UnitRegistryList
            .SelectMany(registry => _rules[registry].Values.Select(i => (Type: registry, Id: i.ToUpperInvariant())))
            .DistinctBy(i => i.Id)
            .Select(i =>
            {
                if (_rules.TryGetSection(i.Id, out var section))
                {
                    return IniSectionUtils.IniKeyBind(section, new UnitData(i.Id, i.Type), _logger);
                }
                else
                {
                    _logger?.LogWarning("在规则文件中找不到[{type}]中注册的单位[{id}]", i.Type, i.Id);
                    return default;
                }
            })
            .Where(i => i is not null)
            .Cast<UnitData>()
            .ToDictionary(i => i.UnitId);

        while (LoadWeapons(map))
        {

        }

        // 过滤的单位
        string[] units = map.Values
            .Where(i =>
            {
                if (_unitDocGeneratorOptions.HiddenTechLevels.Contains(i.TechLevel)) // 根据隐藏单位的科技等级过滤
                    return true;
                //if (_unitDocGeneratorOptions.AllowAIBasePlanningSide.Contains(i.AIBasePlanningSide) // 根据AIBasePlanningSide过滤
                //    && _unitDocGeneratorOptions.AllowTechLevels.Contains(i.TechLevel)) // 根据科技等级过滤
                //    return true;
                if (_unitDocGeneratorOptions.AllowTechLevels.Contains(i.TechLevel)) // 根据科技等级过滤
                    return true;
                if (_unitDocGeneratorOptions.AllowUnitRegistryList.Contains(i.UnitType)) // 根据特殊注册节过滤
                    return true;

                return false;
            })
            .Select(i => i.UnitId)
            .ToArray();

        // 被依赖的单位
        string[] dependencies = units
            .Select(i => map[i])
            .SelectMany(i => (i.Prerequisite ?? []) // 建造前提
                .Append(i.DeploysInto) // 部署变形
                .Append(i.UndeploysInto) // 反部署变形
                .Concat(i.Weapons ?? []) // 武器
                .Concat(i.EliteWeapons ?? []) // 武器
                .Append(i.Primary) // 武器
                .Append(i.ElitePrimary) // 武器
                .Append(i.Secondary) // 武器
                .Append(i.EliteSecondary) // 武器
                .Append(i.Warhead) // 弹头
            )
            .Concat(genericPrerequisites.Values.SelectMany(i => i)) // 通用建造前提
            .Where(i => !string.IsNullOrEmpty(i))
            .Cast<string>()
            .Select(i => i.ToUpperInvariant())
            .Distinct()
            .Where(i => !genericPrerequisites.ContainsKey(i))
            .ToArray();

        _source.Units = units
            .Concat(dependencies)
            .Where(i =>
            {
                if (!map.ContainsKey(i))
                {
                    _logger?.LogWarning("未能找到单位[{id}]，请确认是否被添加到注册节中。", i);
                    return false;
                }
                return true;
            })
            .Select(i => map[i])
            .Select(unit =>
            {
                // 后处理
                unit.UIName = unit.UIName?.ToUpperInvariant();
                unit.UIDescription = unit.UIDescription?.ToUpperInvariant();

                unit.Armor = unit.Armor?.ToUpperInvariant();
                unit.DeploysInto = unit.DeploysInto?.ToUpperInvariant();
                unit.UndeploysInto = unit.UndeploysInto?.ToUpperInvariant();

                unit.Primary = unit.Primary?.ToUpperInvariant();
                unit.ElitePrimary = unit.ElitePrimary?.ToUpperInvariant();
                unit.Secondary = unit.Secondary?.ToUpperInvariant();
                unit.EliteSecondary = unit.EliteSecondary?.ToUpperInvariant();
                unit.Weapons = unit.Weapons?.Select(x => x.ToUpperInvariant()).ToArray();
                unit.EliteWeapons = unit.EliteWeapons?.Select(x => x.ToUpperInvariant()).ToArray();

                unit.Warhead = unit.Warhead?.ToUpperInvariant();

                unit.Prerequisite = unit.Prerequisite?.Select(x => x.ToUpperInvariant()).ToArray();
                unit.ESDNHidden = _unitDocGeneratorOptions.HiddenTechLevels.Contains(unit.TechLevel);
                if (unit.ESDNHidden)
                    _logger?.LogInformation("单位[{id}]被标记为隐藏", unit.UnitId);

                return unit;
            })
            .Concat(genericPrerequisites.Select(i => new UnitData(i.Key, "GenericPrerequisites")
            {
                GenericPrerequisites = i.Value,
            }))
            .ToArray();
    }

    private bool LoadWeapons(Dictionary<string, UnitData> map)
    {
        bool hasNew = false;
        // 加载武器
        map
            .Values
            .SelectMany(i => (i.Weapons ?? []) // 武器
                .Concat(i.EliteWeapons ?? []) // 武器
                .Append(i.Primary) // 武器
                .Append(i.ElitePrimary) // 武器
                .Append(i.Secondary) // 武器
                .Append(i.EliteSecondary) // 武器
            )
            .Where(i => !string.IsNullOrEmpty(i))
            .Cast<string>()
            .Select(i => i.ToUpperInvariant())
            .Distinct()
            .ToList()
            .ForEach(weaponId =>
            {
                if (_rules.TryGetSection(weaponId, out var section))
                {
                    if (!map.TryGetValue(weaponId, out var weapon))
                    {
                        hasNew = true;
                        map[weaponId] = weapon = new(weaponId, "WeaponTypes");
                    }

                    IniSectionUtils.IniKeyBind(section, weapon, _logger);
                }
                else
                {
                    _logger?.LogWarning("在规则文件中找不到注册的武器[{id}]", weaponId);
                }
            });

        // 加载弹头
        map
            .Values
            .Select(i => i.Warhead)// 弹头
            .Where(i => !string.IsNullOrEmpty(i))
            .Cast<string>()
            .Select(i => i.ToUpperInvariant())
            .Distinct()
            .ToList()
            .ForEach(warheadId =>
            {
                if (_rules.TryGetSection(warheadId, out var section))
                {
                    if (!map.TryGetValue(warheadId, out var warhead))
                    {
                        hasNew = true;
                        map[warheadId] = warhead = new(warheadId, "WarheadTypes");
                    }

                    IniSectionUtils.IniKeyBind(section, warhead, _logger);
                }
                else
                {
                    _logger?.LogWarning("在规则文件中找不到注册的弹头[{id}]", warheadId);
                }
            });

        return hasNew;
    }

    private void BuildArt()
    {
        foreach (UnitData unit in _source.Units!.Where(i => !_unitDocGeneratorOptions.AllowUnitRegistryList.Contains(i.UnitType)))
        {
            string sectionName = unit.Image ?? unit.UnitId;
            if (!_art.TryGetSection(sectionName, out AresIniSection? section))
            {
                _logger?.LogWarning("在美术文件中找不到节[{sectionName}]，但它是被[{unitId}]需要的。", sectionName, unit.UnitId);
                continue;
            }

            IniSectionUtils.IniKeyBind(section, unit, _logger);
        }
    }

    private void BuildCsf()
    {
        // 初始化本地化CSF
        _source.Csf ??= new(StringComparer.OrdinalIgnoreCase);
        if (!_source.Csf.TryGetValue(_unitDocGeneratorOptions.CsfLocale, out var lang))
            lang = _source.Csf[_unitDocGeneratorOptions.CsfLocale] = [];

        foreach (UnitData item in _source.Units ?? [])
        {
            LoadCsf(lang, item.UIName);
            LoadCsf(lang, item.UIDescription);
        }
    }

    private void LoadCsf(in Dictionary<string, string> lang, in string? key)
    {
        if (string.IsNullOrEmpty(key))
            return;
        else if (_csf.TryGetValue(key, out string? value))
            lang[key.ToUpperInvariant()] = value;
        else
            _logger?.LogWarning("在 CSF 中找不到标签 {key}", key);
    }
}