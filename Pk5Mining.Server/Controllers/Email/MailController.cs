using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pk5Mining.Server.Services.Email;
using Pk5Mining.Server.Services.Email.Agro_Mail;

namespace Pk5Mining.Server.Controllers.Email
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailService _mailService;
        private readonly IAgroMailService _agroMailService;

        public MailController(IMailService mailService, IAgroMailService agroMailService)
        {
            _mailService = mailService;
            _agroMailService = agroMailService;
        }

        [HttpPost]
        [Route("SendHTMLMail")]
        public bool SendHTMLMail(MailData htmlMailData)
        {
            return _mailService.SendHTMLMail(htmlMailData);
        }

        [HttpPost]
        [Route("SendMail")]
        public bool SendMail(MailData mailData)
        {
            return _mailService.SendMail(mailData);
        }
        [HttpPost]
        [Route("SendHTMLMailAgro")]
        public bool SendHTMLMailAgro(MailData htmlMailData)
        {
            return _agroMailService.SendHTMLMail(htmlMailData);
        }

        [HttpPost]
        [Route("SendMailAgro")]
        public bool SendMailAgro(MailData mailData)
        {
            return _agroMailService.SendMail(mailData);
        }
    }
}
