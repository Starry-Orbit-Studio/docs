using Shimakaze.Sdk.Csf;

namespace ESDN.UnitDoc.Tools;

internal static class CSFUtils
{
    private static async Task LoadCsf<TCsfReader>(Dictionary<string, string> csf, TCsfReader reader)
        where TCsfReader : ICsfReader
    {
        CsfDocument doc = await reader.ReadAsync().ConfigureAwait(false);
        foreach (CsfData item in doc.Data)
            csf[item.LabelName.ToUpperInvariant()] = item.Values[0].Value;
    }

    private static async Task LoadCsf<TCsfReader>(Dictionary<string, string> csf, string path, Func<Stream, TCsfReader> factory)
        where TCsfReader : ICsfReader
    {
        await using FileStream fs = File.OpenRead(path);
        TCsfReader? reader = default;
        try
        {
            reader = factory(fs);
            await LoadCsf(csf, reader).ConfigureAwait(false);
        }
        finally
        {
            if (reader is IDisposable disposable)
                disposable.Dispose();
        }
    }

    public static async Task<Dictionary<string, string>> LoadCsf<TCsfReader>(Func<Stream, TCsfReader> factory, params string[] paths)
        where TCsfReader : ICsfReader
    {
        Dictionary<string, string> csf = new(StringComparer.OrdinalIgnoreCase);
        foreach (string path in paths)
            await LoadCsf(csf, path, factory).ConfigureAwait(false);

        return csf;
    }
}