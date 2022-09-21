const device = () => {
    var deviceData = { "type": "unknown", "cores": 0 };
    var deviceViewResolution = window.innerWidth;
    let concurrency = navigator.hardwareConcurrency;

    if (deviceViewResolution < 768) {
        deviceData.type = "mobile";
    } else if (deviceViewResolution < 992) {
        deviceData.type = "tablet";
    } else if (deviceViewResolution < 1200) {
        deviceData.type = "desktop";
    } else {
        deviceData.type = "large-desktop";
    }

    deviceData.cores = concurrency;

    return deviceData;
}

export default device;