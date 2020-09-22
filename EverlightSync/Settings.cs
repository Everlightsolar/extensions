using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EverlightSync
{
    public static class Settings
    {
#if !DEBUG
        public static string Url => "https://everlightsolar.my.salesforce.com/";
        public static string MosaicUrl => "https://everlightsolar.financing.joinmosaic.com/api/v1/";
        public static string Mosaic => "49ab3c46b19646d12338b05f9763444583eea91e123569dd7935901803f1419bcb9b90e17ddc515e7d73be56d92b3fe79912f6c3f1e30de1ba034879e181e37a";
        public static string Login => "https://login.salesforce.com";
        public static string Email => "casey@everlightsolar.com";
#elif DEBUG
        public static string Url => "https://everlightsolar--joshcle.my.salesforce.com/";
        public static string MosaicUrl => "https://everlight.demo.solarmosaic.com/api/v1/";
        public static string Mosaic => "070690f7480b73cfed88358060d012595432d659db4c9cba049085803b8aea5bc077b6a340cb5a1298fbe575c9010243590beacae5cef0a63f24f21050677651";
        public static string Login => "https://test.salesforce.com";
        public static string Email => "casey@everlightsolar.com.joshcle";
#endif

    }
}