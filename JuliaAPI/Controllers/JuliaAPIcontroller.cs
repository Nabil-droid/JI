using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
// using System.Drawing; 
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JuliaAPI.Models;
using JuliaInteropNamespace; 

namespace JuliaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JuliaAPIcontroller : ControllerBase
    {
        private readonly JuliaContext _context;
          
        public static bool contextReady = false ;

        public JuliaAPIcontroller(JuliaContext context)
        {
            _context = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Jscripts>>> GetJscripts()
        {
            return await _context.Jscripts.ToListAsync();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Jscripts>> GetJscripts(long id)
        {
            var jscripts = await _context.Jscripts.FindAsync(id);

            if (jscripts == null)
            {
                return NotFound();
            }
            // JuliaInterop.run_julia_command("println(\" julia runs ! \")") ; 
            return jscripts;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJscripts(long id, Jscripts jscripts)
        {
            if (id != jscripts.Id)
            {
                return BadRequest();
            }

            _context.Entry(jscripts).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JscriptsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Jscripts>> PostJscripts(Jscripts jscripts)
        {
            _context.Jscripts.Add(jscripts);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetJscripts", new { id = jscripts.Id }, jscripts);
            return CreatedAtAction(nameof(GetJscripts), new { id = jscripts.Id }, jscripts);
                // return CreatedAtAction(nameof(GetJscripts), new { id = Jscripts.Id }, Jscripts);

        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJscripts(long id)
        {
            var jscripts = await _context.Jscripts.FindAsync(id);
            if (jscripts == null)
            {
                return NotFound();
            }

            _context.Jscripts.Remove(jscripts);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // // New function to process a string and return an image
        // private Image ProcessString(string input)
        // {
        //     // Your processing logic here (currently not needed for reading an existing image)
        //     // ...

        //     // Read the existing image named "new.png" from the project directory
        //     string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "new.png");

        //     if (System.IO.File.Exists(imagePath))
        //     {
        //         return Image.FromFile(imagePath);
        //     }
        //     else
        //     {
        //         throw new FileNotFoundException("Image file not found.");
        //     }
        // }
        // New function to process a string and return an image

        // // New HTTP endpoint to expose the function
        // [HttpPost("runString")]
        // public IActionResult runString ([FromBody] string input)
        // {
        //     try
        //     {
        //         // Call the processing function
        //         Image resultImage = ProcessString(input);

        //         // Convert the image to bytes
        //         using (MemoryStream stream = new MemoryStream())
        //         {
        //             resultImage.Save(stream, System.Drawing.Imaging.ImageFormat.Png);
        //             byte[] imageBytes = stream.ToArray();

        //             // Return the image bytes in the response
        //             return File(imageBytes, "image/png");
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         // Handle any exceptions and return an error response
        //         return BadRequest(new { message = ex.Message });
        //     }
        // }

    // New HTTP endpoint to expose the function
    [HttpPost("runString")]
    public IActionResult RunString([FromBody] string input)
    {
        try
        {

            Console.WriteLine("this is the input I got : " + input) ; 
            // Call the processing function
            string prefix = "using OptimalControl; using Plots;\n\n";
            // string prefix = "using Plots;\n\n";
            string suffix = "\nsol = solve(ocp);\nplot(sol);\nsavefig(\"new.png\");\n";
            // string suffix = "\nsavefig(\"new.png\");";

            string Finput = prefix + input + suffix;
            // string[] lines = Finput.Split('\n', '\r');
            string[] lines = [prefix , input , suffix ];
            int c = 1 ; 
            // Console.WriteLine(contextReady) ; 

            // if (!contextReady) {
                JuliaInterop.init_julia();
            //     contextReady = true ; 
            // }
            // okay seg fault happens either because A :  there is a pointer that isnt managed by garbage collection taking too much memory  
            // or B : because I'm trying to access a pointer that is thrown away by garbage collection long ago 
            foreach (string line in lines)
            {
                // Console.WriteLine(line) ;
                // Console.WriteLine(c) ;
                Console.WriteLine($"Now executing line number {c}: {line}");
                c = c+1 ; 
                JuliaInterop.run_julia_command(line);
            }

            // JuliaInterop.notify_julia_exit() ; // this is the cleanup function , hna n7ettoha ? 

            Image resultImage = ProcessString(Finput);

            // Convert the image to bytes
            using (MemoryStream stream = new MemoryStream())
            {
                resultImage.SaveAsPng(stream);
                byte[] imageBytes = stream.ToArray();

                // Return the image bytes in the response
                Console.WriteLine("the julia is probabely cleaned up...") ; 
                JuliaInterop.notify_julia_exit() ; 
                return File(imageBytes, "image/png");
            }
        }
        catch (Exception ex)
        {
            // Handle any exceptions and return an error response
            return BadRequest(new { message = ex.Message });
        }
    }

    // Modified function to process a string and return an image
    public static Image ProcessString(string input)
    {
        // Your processing logic here (if needed)

        // Read the existing image named "new.png" from the project directory
        // string imagePath = Path.Combine(AppContext.BaseDirectory, "new.png");
        string imagePath = "new.png";

        if (System.IO.File.Exists(imagePath))
        {
            using (var imageStream = System.IO.File.OpenRead(imagePath))
            {
                return Image.Load(imageStream);
            }
        }
        else
        {
            throw new FileNotFoundException("Image file not found.");
        }
    }


        private bool JscriptsExists(long id)
        {
            return _context.Jscripts.Any(e => e.Id == id);
        }
    }
}
