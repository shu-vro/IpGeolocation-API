const input = document.getElementById("input"),
    search = document.getElementById("search"),
    search_info = document.getElementById("search_info"),
    goto_location = document.getElementById("goto_location"),
    ip = document.getElementById("ip"),
    host = document.getElementById("host"),
    continent_name = document.getElementById("continent_name"),
    country_name = document.getElementById("country_name"),
    country_capital = document.getElementById("country_capital"),
    state_prov = document.getElementById("state_prov"),
    district = document.getElementById("district"),
    city = document.getElementById("city"),
    zipcode = document.getElementById("zipcode"),
    latitude = document.getElementById("latitude"),
    longitude = document.getElementById("longitude"),
    calling_code = document.getElementById("calling_code"),
    country_tld = document.getElementById("country_tld"),
    languages = document.getElementById("languages"),
    country_flag = document.getElementById("country_flag"),
    geoname_id = document.getElementById("geoname_id"),
    isp = document.getElementById("isp"),
    organization = document.getElementById("organization"),
    asn = document.getElementById("asn"),
    currency_name = document.getElementById("currency_name"),
    currency_Code = document.getElementById("currency_Code"),
    currency_symbol = document.getElementById("currency_symbol"),
    time_zone_name = document.getElementById("time_zone_name"),
    time_zone_time = document.getElementById("time_zone_time"),
    time_zone_current_time_unix = document.getElementById(
        "time_zone_current_time_unix"
    ),
    browser_name = document.getElementById("browser_name"),
    browser_type = document.getElementById("browser_type"),
    browser_version = document.getElementById("browser_version"),
    device_name = document.getElementById("device_name"),
    device_type = document.getElementById("device_type"),
    device_brand = document.getElementById("device_brand"),
    device_CPU = document.getElementById("device_CPU"),
    engine_name = document.getElementById("engine_name"),
    engine_type = document.getElementById("engine_type"),
    engine_version = document.getElementById("engine_version"),
    os_name = document.getElementById("os_name"),
    os_type = document.getElementById("os_type"),
    os_version = document.getElementById("os_version");

const api_key = "";     // Paste your api key here.
if(api_key == "") {
    alert("Insert API key at the api_key variable in main.js");
}

function getInfo() {
    let link_1, link_2, link_3;
    if (input.value) {
        link_1 = `https://api.ipgeolocation.io/ipgeo?apiKey=${api_key}&ip=${input.value}`;
    } else {
        link_1 = `https://api.ipgeolocation.io/ipgeo?apiKey=${api_key}`;
    }
    const ip_info = fetch(link_1)
        .then((results) => results.json())
        .then((data) => {
            console.log(data);
            ip.textContent = data.ip;
            input.value = data.ip;
            host.textContent = data.hostname;
            continent_name.textContent = data.continent_name;
            country_name.textContent = data.country_name;
            country_capital.textContent = data.country_capital;
            state_prov.textContent = data.state_prov;
            district.textContent = data.district;
            city.textContent = data.city;
            zipcode.textContent = data.zipcode;
            latitude.textContent = data.latitude;
            longitude.textContent = data.longitude;

            goto_location.setAttribute(
                "href",
                `https://www.google.com.bd/maps/@${data.latitude},${data.longitude},251m/data=!3m1!1e3`
            );

            calling_code.textContent = data.calling_code;
            country_tld.textContent = data.country_tld;
            languages.textContent = data.languages;
            country_flag.src = data.country_flag;
            geoname_id.textContent = data.geoname_id;
            isp.textContent = data.isp;
            organization.textContent = data.organization;
            asn.textContent = data.asn;
            currency_name.textContent = data.currency.name;
            currency_code.textContent = data.currency.code;
            currency_symbol.textContent = data.currency.symbol;
            time_zone_name.textContent = data.time_zone.name;
            time_zone_time.textContent = data.time_zone.current_time;
            time_zone_current_time_unix.textContent =
                data.time_zone.current_time_unix;
        });

    if (input.value) {
        link_2 = `https://api.ipgeolocation.io/user-agent?apiKey=${api_key}&ip=${input.value}`;
    } else {
        link_2 = `https://api.ipgeolocation.io/user-agent?apiKey=${api_key}`;
    }
    const agent_info = fetch(link_2)
        .then((results) => results.json())
        .then((data) => {
            console.log(data);
            browser_name.textContent = data.name;
            browser_type.textContent = data.type;
            browser_version.textContent = data.version;
            device_name.textContent = data.device.name;
            device_type.textContent = data.device.type;
            device_brand.textContent = data.device.brand;
            device_CPU.textContent = data.device.CPU;
            engine_name.textContent = data.engine.name;
            engine_type.textContent = data.engine.type;
            engine_version.textContent = data.engine.version;
            os_name.textContent = data.operatingSystem.name;
            os_type.textContent = data.operatingSystem.type;
            os_version.textContent = data.operatingSystem.version;
        });
}

getInfo();
search.addEventListener("click", getInfo);

document.querySelectorAll("table").forEach((table) => {
    table.addEventListener("click", () => {
        if (search_info.style.display == "block") {
            search_info.style.display = "none";
        } else {
            search_info.style.display = "block";
            search_info.focus();
        }
    });
});

search_info.addEventListener("input", (e) => {
    let search_value = search_info.value.toUpperCase();
    let fields = document.querySelectorAll("table tr.fields");
    for (let i = 0; i < fields.length; i++) {
        let field = fields[i].querySelectorAll("td")[0];
        if (field.innerHTML.toUpperCase().indexOf(search_value) > -1) {
            fields[i].style.display = "table-row";
        } else {
            fields[i].style.display = "none";
        }
    }
});
