function calculateRiskLevel(attendance, marks) {
    if (attendance < 60 || marks < 40) {
        return "high";
    }

    if ((attendance >= 60 && attendance < 70) ||
        (marks >= 40 && marks < 50)) {
        return "medium";
    }

    return "low";
}

function calculateRiskScore(attendance, marks) {
    let score = 0;

    if (attendance < 60) score += 50;
    else if (attendance < 70) score += 25;

    if (marks < 40) score += 50;
    else if (marks < 50) score += 25;

    return Math.min(score, 100);
}

module.exports = {
    calculateRiskLevel,
    calculateRiskScore
};
