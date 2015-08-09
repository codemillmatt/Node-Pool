using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


public class Startup
{
    Dictionary<string, string> _theDeep;
    public Startup()
    {
        _theDeep = new Dictionary<string, string>()
        {
            { "Crocodile Cove", "50 Feet" },
            { "Barracuda Bay", "20 Feet" },
            { "Hammerhead Harbor", "5000 Feet" },
            { "Penguin Port", "5 Feet" }
        };

    }

    public async Task<object> Invoke(object input)
    {
        object howDeep = "";

        await Task.Run(() =>
            {
                if (_theDeep.ContainsKey(input.ToString()))
                {
                    howDeep = _theDeep[input.ToString()];
                }
                else
                {
                    howDeep = "1 Foot";
                }
            }
        );

        return howDeep;
    }
}

