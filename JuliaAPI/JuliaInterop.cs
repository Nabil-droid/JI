using System;
using System.Runtime.InteropServices;

namespace JuliaInteropNamespace
{
public class JuliaInterop
{
    // Adjust the library name and path accordingly
    const string JuliaLibrary = "./mylibrary.so";

    [DllImport(JuliaLibrary, CallingConvention = CallingConvention.Cdecl)]
    public static extern void init_julia();

    [DllImport(JuliaLibrary, CallingConvention = CallingConvention.Cdecl)]
    public static extern void run_julia_command(string command);

    [DllImport(JuliaLibrary, CallingConvention = CallingConvention.Cdecl)]
    public static extern void notify_julia_exit();

    public static void RunJuliaCommands()
    {
        // Load the shared library
        // init_julia();

//         string cSharpCode = @"using Plots;
// f(x) = sin(x);
// plot(f, 0, 3*pi);
// savefig(""new.png"");";
        string cSharpCode = @"using OptimalControl
using Plots

@def ocp begin
    t ∈ [ 0, 1 ], time
    x ∈ R², state
    u ∈ R, control
    x(0) == [ -1, 0 ]
    x(1) == [ 0, 0 ]
    ẋ(t) == [ x₂(t), u(t) ]
    ∫( 0.5u(t)^2 ) → min
end
sol = solve(ocp)
plot(sol)
savefig(""new.png"")
";


        // Run Julia commands
        // run_julia_command("x = sqrt(2)");
        // run_julia_command("println(x)");
        // run_julia_command("println(\" I did it again  :)\")");

        // string[] lines = cSharpCode.Split('\n', '\r');
        // int c = 1 ; 

        // foreach (string line in lines)
        // {
        //     // Console.WriteLine(line) ;
        //     // Console.WriteLine(c) ;
        //     Console.WriteLine($"Now executing line number {c}: {line}");
        //     c = c+1 ; 
        //     run_julia_command(line);
        // }

        // run_julia_command(cSharpCode) ; 

        // Notify Julia about program termination
        // notify_julia_exit();
    }
}
}
    
