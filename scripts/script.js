window.onload = function() {
    // Fetch IPv4 Address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(ipv4Data => {
            const ipv4Address = ipv4Data.ip;
            document.getElementById('ipv4-address').innerText = ipv4Address;

            // Fetch IPv6 Address
            fetch('https://api64.ipify.org?format=json')
                .then(response => response.json())
                .then(ipv6Data => {
                    const ipv6Address = ipv6Data.ip;
                    document.getElementById('ipv6-address').innerText = ipv6Address;

                    // Fetch Location Data
                    fetch(`https://ipapi.co/${ipv4Address}/json/`)
                        .then(response => response.json())
                        .then(locationData => {
                            const locationString = `${locationData.city}, ${locationData.region}, ${locationData.country_name}`;
                            document.getElementById('location').innerText = locationString;

                            // Fetch ISP Data
                            const ispInfo = locationData.org;
                            document.getElementById('isp').innerText = ispInfo;

                            // Show Map with User's Location
                            initMap(locationData.latitude, locationData.longitude);
                        })
                        .catch(error => {
                            console.error('Error fetching location data:', error);
                        });
                })
                .catch(error => {
                    console.error('Error fetching IPv6 address:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching IPv4 address:', error);
        });
};


// Initialize Map
function initMap(latitude, longitude) {
    const map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Your Location').openPopup();
}

// Toggle Dark Mode
function toggleDarkMode() {
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Toggle dark mode class on body
    body.classList.toggle('dark-mode');

    // Toggle visibility of sun and moon icons
    sunIcon.style.display = sunIcon.style.display === 'none' ? 'block' : 'none';
    moonIcon.style.display = moonIcon.style.display === 'none' ? 'block' : 'none';
}

// cookies to remember dark mode
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    const cookieString = cname + '=' + cvalue + ';' + expires + ';path=/;SameSite=Lax';
    document.cookie = cookieString;
}