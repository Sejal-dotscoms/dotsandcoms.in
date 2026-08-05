using Dotsandcoms_in.Server.DTOs;
using Dotsandcoms_in.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dotsandcoms_in.Server.Controllers
{
    [ApiController]
    [Route("api/blogs")]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogService _blogs;
        public BlogsController(IBlogService blogs) => _blogs = blogs;

        private string ClientIp =>
            HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";

        // GET /api/blogs?page=1&pageSize=10&search=keyword
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] int    page     = 1,
            [FromQuery] int    pageSize = 10,
            [FromQuery] string? search  = null)
        {
            try
            {
                var result = await _blogs.GetAllAsync(page, pageSize, search);
                return Ok(new { success = true, data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        // GET /api/blogs/5
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var blog = await _blogs.GetByIdAsync(id);
                if (blog is null)
                    return NotFound(new { success = false, message = "Blog not found." });
                return Ok(new { success = true, data = blog });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        // POST /api/blogs
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBlogDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { success = false, errors = ModelState });

            try
            {
                var created = await _blogs.CreateAsync(dto, ClientIp);
                return CreatedAtAction(nameof(GetById),
                    new { id = created.Id },
                    new { success = true, data = created });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        // PUT /api/blogs/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateBlogDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { success = false, errors = ModelState });

            try
            {
                var updated = await _blogs.UpdateAsync(id, dto, ClientIp);
                if (updated is null)
                    return NotFound(new { success = false, message = "Blog not found." });
                    
                return Ok(new { success = true, data = updated });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { success = false, message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { success = false, message = ex.Message });
            }
        }

        // GET /api/blogs/public
        [HttpGet("public")]
        public async Task<IActionResult> GetPublicList()
        {
            var items = await _blogs.GetPublicListAsync();
            return Ok(new { success = true, data = items });
        }

        // GET /api/blogs/public/5
        [HttpGet("public/{id:int}")]
        public async Task<IActionResult> GetPublicById(int id)
        {
            var blog = await _blogs.GetPublicByIdAsync(id);
            if (blog is null)
                return NotFound(new { success = false, message = "Blog not found." });
            return Ok(new { success = true, data = blog });
        }

        // GET /api/blogs/public/slug/my-blog-url
        [HttpGet("public/slug/{slug}")]
        public async Task<IActionResult> GetPublicBySlug(string slug)
        {
            if (string.IsNullOrWhiteSpace(slug))
                return BadRequest(new { success = false, message = "Slug is required." });

            var blog = await _blogs.GetPublicBySlugAsync(slug);
            if (blog is null)
                return NotFound(new { success = false, message = "Blog not found." });
            return Ok(new { success = true, data = blog });
        }

        // GET /api/blogs/check-title?title=xxx&excludeId=5
        [HttpGet("check-title")]
        public async Task<IActionResult> CheckTitle(
            [FromQuery] string title,
            [FromQuery] int? excludeId = null)
        {
            if (string.IsNullOrWhiteSpace(title))
                return BadRequest(new { success = false, message = "Title is required." });

            var exists = await _blogs.TitleExistsAsync(title, excludeId);
            return Ok(new { success = true, exists });
        }

        // GET /api/blogs/check-browser-url?url=xxx&excludeId=5
        [HttpGet("check-browser-url")]
        public async Task<IActionResult> CheckBrowserUrl(
            [FromQuery] string url,
            [FromQuery] int? excludeId = null)
        {
            if (string.IsNullOrWhiteSpace(url))
                return BadRequest(new { success = false, message = "URL is required." });

            var exists = await _blogs.BrowserUrlExistsAsync(url, excludeId);
            return Ok(new { success = true, exists });
        }

        // DELETE /api/blogs/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _blogs.DeleteAsync(id);
            if (!deleted)
                return NotFound(new { success = false, message = "Blog not found." });

            return Ok(new { success = true, message = "Blog deleted." });
        }
    }
}
