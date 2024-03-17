using System;

namespace JuliaAPI.Controllers
{
    public class RunJulia {
        string? name ; 
        int? id ; 
        string? fullscript ; 



        // what would this method return ? normally it would run the code , and return an image ? 
        // for now let's leave it as void 
        static void Main(){
            RunByFullScript("How realistic is this shit ?") ; 
        }


        public static void RunByFullScript(string Fscript) {

            string test = string.Format(@"using OptimalControl
                        @def ocp begin
                        {0}
                        end
                        sol = solve(ocp)
                        plot(sol)
                        " , Fscript); 

            // so far , so good the function does what it's told. kayn PROB DE TABULATION ms je sais pas wach Julia 
            // is sensitive to that or not. 

            


        }


        // it needs to run a script based on its ID in the database
        public void RunByID(string Fscript) {

        }
        
        // it needs to run a script based on its stored name in the database
        public void RunByName(string Fscript) {

        }





    }
}