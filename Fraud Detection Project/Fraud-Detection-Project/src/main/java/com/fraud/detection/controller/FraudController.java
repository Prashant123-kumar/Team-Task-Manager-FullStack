package com.fraud.detection.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fraud.detection.model.TransactionRequest;
import com.fraud.detection.model.FraudResponse;
import com.fraud.detection.services.KafkaProducerService;
import com.fraud.detection.service.FraudService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fraud")
public class FraudController {

    @Autowired
    private KafkaProducerService kafkaProducerService;

    @Autowired
    private FraudService fraudService;

    // 🔹 Kafka Pipeline (REAL-TIME)
    @PostMapping("/check")
    public String checkFraud(@RequestBody TransactionRequest request) {

        if (request.getTransactionAmt() <= 0) {
            return "Invalid Transaction Amount ❌";
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            String message = mapper.writeValueAsString(request);

            kafkaProducerService.sendMessage(message);

            return "Transaction sent to Kafka 🚀";

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    // 🔹 Direct ML API
    @PostMapping("/predict")
    public FraudResponse predict(@RequestBody TransactionRequest request) {
        return fraudService.checkFraud(request);
    }
}

//STEP 1: Make MODEL SMART (Highest Priority)
//
//Right now:
//
//
//
//fraud_probability ≈ always LOW
//
//
//
//👉 This kills your project value
//
//
//
//Do this:
//
//
//
//Add feature engineering
//
//transaction frequency
//
//
//
//avg amount per user
//
//
//
//velocity (transactions/sec)
//
//
//
//Use:
//
//XGBoost / LightGBM
//
//
//
//Balance data properly (SMOTE etc.)
//
//👉 Goal:
//
//
//
//LOW / MEDIUM / HIGH realistically trigger ho
//
//
//
//🥈 STEP 2: REAL ALERT SYSTEM 🔔
//
//Right now UI alert is fake (only frontend)
//
//
//
//Add:
//
//
//
//Email alerts (SMTP / Gmail API)
//
//
//
//Telegram bot alerts (BEST option)
//
//
//
//Sound + flashing UI (already partially done)
//
//👉 Example:
//
//
//
//HIGH fraud → instant Telegram alert
//
//
//
//🥉 STEP 3: DATABASE (CRITICAL)
//
//Right now:
//
//
//
//        👉 Data disappears on restart ❌
//
//Add:
//
//
//
//PostgreSQL / MongoDB
//
//Store:
//
//
//
//
//
//transactions
//
//
//
//fraud results
//
//
//
//user activity
//
//👉 This is MUST for real system
//
//🏅 STEP 4: AUTH SYSTEM 🔐
//
//Add:
//
//
//
//
//
//Login / Signup
//
//
//
//JWT authentication
//
//
//
//Role-based access
//
//👉 This converts project → product
//
//🏅 STEP 5: SHAP EXPLAINABILITY 🧠
//
//You already loaded SHAP earlier — now use it
//
//Show in dashboard:
//
//
//
//Why transaction flagged?
//
//        → high amount
//
//→ unusual card usage
//
//→ time anomaly
//
//
//
//👉 THIS is FAANG-level feature
//
//🏅 STEP 6: DEPLOYMENT ☁️
//
//Right now:
//
//
//
//localhost = 0 value in resume
//
//
//
//Deploy:
//
//
//
//
//
//FastAPI → Render / AWS EC2
//
//
//
//Kafka → Confluent Cloud / Docker
//
//
//
//Streamlit → Streamlit Cloud
//
//👉 Add:
//
//
//
//Live URL in resume
//
//
//
//🏅 STEP 7: DOCKERIZE 🐳
//
//Make:
//
//
//
//docker-compose:
//
//        - kafka
//
//- zookeeper
//
//- redis
//
//- fastapi
//
//- streamlit
//
//
//
//hme ye achieve krna hai now start with step 1