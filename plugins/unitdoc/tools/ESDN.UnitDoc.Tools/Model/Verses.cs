namespace ESDN.UnitDoc.Tools.Model;

public sealed record class Verses
{
    public Verses(string value)
    {
        string[] strings = value.Split(',');
        if (strings.Length is not 11)
            throw new ArgumentException("Verses 的值不是 11 个");

        None = ParsePercentage(strings[0]);
        Flak = ParsePercentage(strings[1]);
        Plate = ParsePercentage(strings[2]);
        Light = ParsePercentage(strings[3]);
        Medium = ParsePercentage(strings[4]);
        Heavy = ParsePercentage(strings[5]);
        Wood = ParsePercentage(strings[6]);
        Steel = ParsePercentage(strings[7]);
        Concrete = ParsePercentage(strings[8]);
        Special1 = ParsePercentage(strings[9]);
        Special2 = ParsePercentage(strings[10]);
    }

    private static float ParsePercentage(string v)
    {
        if (!v.EndsWith('%'))
        {
            //throw new ArgumentException($"{v}不是一个百分数");
            return float.Parse(v);
        }
        return float.Parse(v[..^1]) / 100;
    }

    public Dictionary<string, float> ToDictionary() => new()
    {
        ["NONE"] = None,
        ["FLAK"] = Flak,
        ["PLATE"] = Plate,
        ["LIGHT"] = Light,
        ["MEDIUM"] = Medium,
        ["HEAVY"] = Heavy,
        ["WOOD"] = Wood,
        ["STEEL"] = Steel,
        ["CONCRETE"] = Concrete,
        ["SPECIAL_1"] = Special1,
        ["SPECIAL_2"] = Special2,
    };

    public float None { get; set; }
    public float Flak { get; set; }
    public float Plate { get; set; }
    public float Light { get; set; }
    public float Medium { get; set; }
    public float Heavy { get; set; }
    public float Wood { get; set; }
    public float Steel { get; set; }
    public float Concrete { get; set; }
    public float Special1 { get; set; }
    public float Special2 { get; set; }
}