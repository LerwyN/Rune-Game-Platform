using Microsoft.AspNetCore.Mvc;

namespace RUNE.Controllers
{
    public class NewsController : Controller
    {
        // GET: NewsController
        public ActionResult Index()
        {
            return View();
        }

    }
}
