using Shimakaze.Sdk.Ini.Ares;
namespace ESDN.UnitDoc.Tools;

internal static class IniUtils
{
    private static AresIniDocument Bind(in string path, in AresIniDocument result)
    {
        using var fs = File.OpenText(path);
        using AresIniTokenReader reader = new(fs);
        using AresIniDocumentBinder binder = new(reader);
        return binder.Bind(result);
    }

    public static AresIniDocument ReadIni(in string path)
    {
        AresIniDocument result = Bind(path, new(StringComparer.OrdinalIgnoreCase));
        if (result.TryGetSection("#include", out var includes) && Path.GetDirectoryName(path) is string basePath)
        {
            foreach (var item in includes.Values)
                result = Bind(Path.Combine(basePath, item), result);
        }

        return result;
    }
}