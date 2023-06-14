using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace emlak.ViewModel
{
    public class YorumModel
    {
        public int YorumId { get; set; }
        public string YorumIcerik { get; set; }
        public int UyeId { get; set; }
        public int IlanId { get; set; }
        public System.DateTime Tarih { get; set; }
        public string KullaniciAdi { get; set; }
        public string IlanBaslik { get; set; }
    }
}