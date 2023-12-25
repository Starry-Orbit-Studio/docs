namespace ESDN.UnitDoc.Tools.Model;

public sealed record class UnitDocSource
{
    public Dictionary<string, Dictionary<string, string>>? Csf { get; set; }
    public UnitData[]? Units { get; set; }
    public Dictionary<string, string>? Indexes { get; set; }
}