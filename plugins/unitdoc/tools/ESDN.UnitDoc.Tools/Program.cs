
using System.Text.Json;

using ESDN.UnitDoc.Tools;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

using Sharprompt;

// 初始化配置
IConfiguration config = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
#if DEBUG
    .AddJsonFile("appsettings.Development.json")
#endif
    .AddEnvironmentVariables()
    .AddCommandLine(args)
    .Build();

// 初始化服务容器
ServiceCollection services = new();
services.AddLogging(builder => builder.AddConsole());

// 生成器配置
services
    .AddOptions<UnitDocGeneratorOptions>()
    .Configure(options =>
    {
        config.Bind(nameof(UnitDocGeneratorOptions), options);
        if (!options.Quiet)
            Prompt.Bind(options);
    })
    .Validate(options =>
    {
        if (!File.Exists(options.RulesFile))
            return false;

        if (!File.Exists(options.ArtFile))
            return false;

        if (options.CsfFiles is { Length: 0 })
            return false;

        return true;
    });

services
    .AddOptions<JsonSerializerOptions>()
    .Configure(options =>
    {
        config.Bind(nameof(JsonSerializerOptions), options);
        options.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping;
        options.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

services.AddSingleton<UnitDocGenerator>();
IServiceProvider provider = services.BuildServiceProvider();
await provider.GetRequiredService<UnitDocGenerator>().RunAsync().ConfigureAwait(false);