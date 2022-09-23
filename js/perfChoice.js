const perfChoice = function(deviceData) {
    var options = {};
    if (deviceData.type === "mobile") {
        if (deviceData.cores > 2 && deviceData.cores < 4) {
            options = {
                "type": "mobile",
                "cores": deviceData.cores,
                "performance": "medium"
            };
        } else if (deviceData.cores < 2) {
            options = {
                "type": "mobile",
                "cores": deviceData.cores,
                "performance": "low"
            };
        } else {
            options = {
                "type": "mobile",
                "cores": deviceData.cores,
                "performance": "high"
            };
        }
    } else if (deviceData.type === "tablet") {
        if (deviceData.cores > 2 && deviceData.cores < 4) {
            options = {
                "type": "tablet",
                "cores": deviceData.cores,
                "performance": "medium"
            };
        } else if (deviceData.cores < 2) {
            options = {
                "type": "tablet",
                "cores": deviceData.cores,
                "performance": "low"
            };
        } else {
            options = {
                "type": "tablet",
                "cores": deviceData.cores,
                "performance": "high"
            };
        }
    } else if (deviceData.type === "desktop") {
        if (deviceData.cores > 2 && deviceData.cores < 4) {
            options = {
                "type": "desktop",
                "cores": deviceData.cores,
                "performance": "medium"
            };
        } else if (deviceData.cores < 2) {
            options = {
                "type": "desktop",
                "cores": deviceData.cores,
                "performance": "low"
            };
        } else {
            options = {
                "type": "desktop",
                "cores": deviceData.cores,
                "performance": "high"
            };
        }
    } else if (deviceData.type === "large-desktop") {
        if (deviceData.cores > 2 && deviceData.cores < 4) {
            options = {
                "type": "large-desktop",
                "cores": deviceData.cores,
                "performance": "medium"
            };
        } else if (deviceData.cores < 2) {
            options = {
                "type": "large-desktop",
                "cores": deviceData.cores,
                "performance": "low"
            };
        } else {
            options = {
                "type": "large-desktop",
                "cores": deviceData.cores,
                "performance": "high"
            };
        }
    }
    return options;
}

export default perfChoice