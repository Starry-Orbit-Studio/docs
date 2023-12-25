using System.ComponentModel.DataAnnotations;

using Sharprompt;

using Shimakaze.Sdk.Csf;
using Shimakaze.Sdk.Csf.Json;
using Shimakaze.Sdk.Csf.Xml;
using Shimakaze.Sdk.Csf.Yaml;

namespace ESDN.UnitDoc.Tools;

public sealed record class UnitDocGeneratorOptions
{
    private string _workspaceFolder = string.Empty;
    private string _sourcePreviewFolder = string.Empty;
    private string _targetFolder = string.Empty;
    private string _targetIconFolder = string.Empty;
    private IEnumerable<string> _unitRegistryList = [];

    [BindIgnore]
    public bool Quiet { get; set; }

    [BindIgnore]
    public string CsfLocale { get; set; } = "zh-CN";

    [BindIgnore]
    public CsfFormat CsfFormat { get; set; } = CsfFormat.YamlV1;

    [BindIgnore]
    public string CsfSearchPattern { get; set; } = "*.csf.yaml";

    [BindIgnore]
    public string RulesFileName { get; set; } = "ruleses.ini";

    [BindIgnore]
    public string ArtFileName { get; set; } = "artes.ini";

    [BindIgnore]
    public string UnitDocSourceFileName { get; set; } = "units.json";

    [BindIgnore]
    public int[] AllowAIBasePlanningSide { get; set; } = [];
    [BindIgnore]
    public string[] AllowUnitRegistryList { get; set; } = [];

    [BindIgnore]
    public int[] AllowTechLevels { get; set; } = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1313100613, -1313100613];

    [BindIgnore]
    public int[] HiddenTechLevels { get; set; } = [-1313100613];

    [BindIgnore]
    public IEnumerable<string> UnitRegistryList
    {
        get => _unitRegistryList;
        set => _unitRegistryList = value.Distinct();
    }

    [Display(Name = $"请输入存放 INI 和 CSF 的文件夹路径", Prompt = "Extreme Starry", Order = 1)]
    [Required]
    public string WorkspaceFolder
    {
        get => _workspaceFolder;
        set => _workspaceFolder = value.Trim('"');
    }
    [Display(Name = $"请输入存放 PCX 或 SHP/PAL 的文件夹路径", Prompt = "Extreme Starry", Order = 1)]
    [Required]
    public string SourcePreviewFolder
    {
        get => _sourcePreviewFolder;
        set => _sourcePreviewFolder = value.Trim('"');
    }
    [Display(Name = "请输入 ESDN 文件夹路径（保存输出内容的地方）", Prompt = "ESDN", Order = 2)]
    [Required]
    public string TargetFolder
    {
        get => _targetFolder;
        set => _targetFolder = value.Trim('"');
    }
    [Display(Name = "请输入 ESDN/public 文件夹路径（保存输出图标的地方）", Prompt = "ESDN/public", Order = 2)]
    [Required]
    public string TargetIconFolder
    {
        get => _targetIconFolder;
        set => _targetIconFolder = value.Trim('"');
    }

    [BindIgnore]
    public string RulesFile => Path.Combine(WorkspaceFolder, RulesFileName);

    [BindIgnore]
    public string ArtFile => Path.Combine(WorkspaceFolder, ArtFileName);

    [BindIgnore]
    public string[] CsfFiles => Directory.GetFiles(WorkspaceFolder, CsfSearchPattern);

    [BindIgnore]
    public string TargetJSONFile => Path.Combine(TargetFolder, UnitDocSourceFileName);

    [BindIgnore]
    public Func<Stream, ICsfReader> CsfReaderFactory => CsfFormat switch
    {
        CsfFormat.Csf => (fs) => new CsfReader(fs),
        CsfFormat.YamlV1 => (fs) => new CsfYamlV1Reader(new StreamReader(fs)),
        CsfFormat.JsonV1 => (fs) => new CsfJsonV1Reader(fs),
        CsfFormat.JsonV2 => (fs) => new CsfJsonV2Reader(fs),
        CsfFormat.XmlV1 => (fs) => new CsfXmlV1Reader(new StreamReader(fs)),
        _ => throw new NotSupportedException(),
    };
}