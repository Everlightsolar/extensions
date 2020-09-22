using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EverlightSync.BusinessLogic
{
    public class Logger
    {
        public static void Log(string message)
        {
            using(var db = new EverlightDbEntities())
            {
                var log = new Log
                {
                    Message = message,
                    Date = DateTime.UtcNow
                };
                db.Logs.Add(log);
                db.SaveChanges();
            }
        }
    }
}