using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace emlak.ViewModel
{
    public class UyeModel
    {
        public int UyeId { get; set; }
        public string KullaniciAdi { get; set; }
        public string Email { get; set; }
        public string Sifre { get; set; }
        public string AdSoyad { get; set; }
        public string Foto { get; set; }
        public string UyeAdmin { get; set; }
    }
}