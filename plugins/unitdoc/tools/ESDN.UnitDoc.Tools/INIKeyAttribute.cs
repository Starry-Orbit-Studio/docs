namespace ESDN.UnitDoc.Tools;
[AttributeUsage(AttributeTargets.Property, Inherited = true, AllowMultiple = true)]
internal sealed class INIKeyAttribute(string name) : Attribute
{
    public string Name => name;
}