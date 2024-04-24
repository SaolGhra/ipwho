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
    const body = document.body;
    const isDarkMode = getCookie('darkMode') === 'true';

    // Apply dark mode preference from cookie
    if (isDarkMode) {
        body.classList.add('dark-mode');
        document.getElementById('sun-icon').style.display = 'none';
        document.getElementById('moon-icon').style.display = 'block';
    }
};

// Initialize Map
function initMap(latitude, longitude) {
    const map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Your Location').openPopup();
}

// Function to toggle dark mode
function toggleDarkMode() {
    const body = document.body;
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Toggle dark mode class on body
    body.classList.toggle('dark-mode');

    // Toggle visibility of sun and moon icons
    sunIcon.style.display = sunIcon.style.display === 'none' ? 'block' : 'none';
    moonIcon.style.display = moonIcon.style.display === 'none' ? 'block' : 'none';

    // Set dark mode preference in cookie
    const isDarkMode = body.classList.contains('dark-mode');
    setCookie('darkMode', isDarkMode ? 'true' : 'false', 365);
}

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString();
}

// Function to get a cookie value by name
function getCookie(name) {
    const keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}
