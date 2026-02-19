const RiskCalculator = require('../ml-engine/riskCalculator');

exports.evaluateRisk = (req, res) => {
    const { attendance, marks } = req.query;

    if (attendance === undefined || marks === undefined) {
        return res.status(400).json({ error: "attendance and marks required" });
    }

    const att = parseFloat(attendance);
    const mk = parseFloat(marks);

    const riskLevel = RiskCalculator.calculateRiskLevel(att, mk);
    const riskScore = RiskCalculator.calculateRiskScore(att, mk);

    res.json({
        attendance: att,
        marks: mk,
        riskLevel,
        riskScore
    });
};
