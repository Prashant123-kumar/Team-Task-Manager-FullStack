package com.fraud.detection.model;

public class FraudResponse {

    private double fraud_probability;
    private String risk_level;

    public double getFraud_probability() {
        return fraud_probability;
    }

    public void setFraud_probability(double fraud_probability) {
        this.fraud_probability = fraud_probability;
    }

    public String getRisk_level() {
        return risk_level;
    }

    public void setRisk_level(String risk_level) {
        this.risk_level = risk_level;
    }
}