
using System.Collections.Frozen;
using System.Reflection;

using ESDN.UnitDoc.Tools.Model;

using Microsoft.Extensions.Logging;

using Shimakaze.Sdk.Ini.Ares;

namespace ESDN.UnitDoc.Tools;

internal static class IniSectionUtils
{
    private static readonly Dictionary<Type, ISet<PropertyInfo>> ReflectionCache = [];

    public static T IniKeyBind<T>(AresIniSection section, T obj, ILogger? logger = default)
        where T : notnull, IBaseOnable
    {
        if (!ReflectionCache.TryGetValue(typeof(T), out var properties))
            properties = ReflectionCache[typeof(T)] = typeof(T).GetProperties().ToFrozenSet();

        if (string.IsNullOrEmpty(section.BaseName))
            obj.BaseOn = section.BaseName;

        foreach (PropertyInfo property in properties)
        {
            foreach (string name in property
                .GetCustomAttributes<INIKeyAttribute>()
                .Where(i => !string.IsNullOrEmpty(i.Name))
                .Select(i => i.Name)
                .Append(property.Name)
                .Reverse())
            {
                if (!section.TryGetValue(name, out string? value))
                    continue;
                if (!SetValue(obj, property, value))
                    logger?.LogWarning("配置节 [{section}] 的属性 \"{key}\" 的值 \"{value}\" 不是一个有效的值。", section.Name, name, value);
            }
        }
        return obj;
    }

    private static bool SetValue(object instance, PropertyInfo property, string value)
    {
        switch (0)
        {
            case 0 when property.PropertyType == typeof(string):
                property.SetValue(instance, value);
                break;
            case 0 when property.PropertyType == typeof(string[]) && !string.IsNullOrEmpty(value):
                property.SetValue(instance, value.Split(',').Select(i => i.Trim()).ToArray());
                break;
            case 0 when property.PropertyType == typeof(int):
            case 0 when property.PropertyType == typeof(int?):
                if (!int.TryParse(value, out int i))
                    return false;
                property.SetValue(instance, i);
                break;
            case 0 when property.PropertyType == typeof(float):
            case 0 when property.PropertyType == typeof(float?):
                if (!float.TryParse(value, out float f))
                    return false;
                property.SetValue(instance, f);
                break;
            case 0 when property.PropertyType == typeof(double):
            case 0 when property.PropertyType == typeof(double?):
                if (!double.TryParse(value, out double d))
                    return false;
                property.SetValue(instance, d);
                break;
            case 0 when property.PropertyType == typeof(bool):
            case 0 when property.PropertyType == typeof(bool?):
                property.SetValue(instance, ParseBoolean(value));
                break;
            case 0 when property.PropertyType == typeof(Verses):
                try
                {
                    property.SetValue(instance, new Verses(value));
                }
                catch
                {
                    return false;
                }
                break;
        }
        return true;
    }

    private static bool ParseBoolean(string str) => str[0] switch
    {
        'T' or 't' or 'Y' or 'y' or '1' => true,
        'F' or 'f' or 'N' or 'n' or '0' => false,
        _ => !string.IsNullOrWhiteSpace(str)
    };
}